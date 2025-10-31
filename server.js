const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos
// No Vercel, quando rodando de api/index.js, __dirname é api/, então sobe um nível
const rootDir = process.env.VERCEL 
    ? path.resolve(__dirname, '..')
    : __dirname;

// Tentar múltiplos caminhos
app.use(express.static(rootDir));
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.static(process.cwd()));

// Rota principal
app.get('/', (req, res) => {
    const indexPath = path.join(rootDir, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            // Tentar caminho alternativo
            const altPath = path.join(process.cwd(), 'index.html');
            res.sendFile(altPath);
        }
    });
});

// Admin
app.get('/admin.html', (req, res) => {
    const adminPath = path.join(rootDir, 'admin.html');
    res.sendFile(adminPath, (err) => {
        if (err) {
            const altPath = path.join(process.cwd(), 'admin.html');
            res.sendFile(altPath);
        }
    });
});

// Arquivos estáticos
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(rootDir, 'styles.css'), (err) => {
        if (err) res.sendFile(path.join(process.cwd(), 'styles.css'));
    });
});

app.get('/admin.css', (req, res) => {
    res.sendFile(path.join(rootDir, 'admin.css'), (err) => {
        if (err) res.sendFile(path.join(process.cwd(), 'admin.css'));
    });
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'script.js'), (err) => {
        if (err) res.sendFile(path.join(process.cwd(), 'script.js'));
    });
});

app.get('/admin.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'admin.js'), (err) => {
        if (err) res.sendFile(path.join(process.cwd(), 'admin.js'));
    });
});

// Inicializar banco de dados
// No Vercel, usar /tmp para escritas, senão usar diretório atual
const dbPath = process.env.VERCEL 
    ? path.join('/tmp', 'database.db') 
    : path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

// Criar tabelas
db.serialize(() => {
    // Tabela de clientes
    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            telefone TEXT NOT NULL,
            endereco TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela de pedidos
    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER NOT NULL,
            produto TEXT NOT NULL,
            preco REAL NOT NULL,
            mensagem TEXT,
            metodo_pagamento TEXT,
            status TEXT DEFAULT 'pendente',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        )
    `);
    
    // Adicionar coluna metodo_pagamento se não existir (para bancos já criados)
    db.run(`
        ALTER TABLE pedidos ADD COLUMN metodo_pagamento TEXT
    `, (err) => {
        // Ignorar erro se coluna já existir
    });
});

// ============ ROTAS DE CLIENTES ============

// Listar todos os clientes
app.get('/api/clientes', (req, res) => {
    db.all('SELECT * FROM clientes ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Buscar cliente por ID
app.get('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(row);
    });
});

// Buscar cliente por email
app.get('/api/clientes/email/:email', (req, res) => {
    const { email } = req.params;
    db.get('SELECT * FROM clientes WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row || null);
    });
});

// Criar novo cliente
app.post('/api/clientes', (req, res) => {
    const { nome, email, telefone, endereco } = req.body;

    if (!nome || !email || !telefone || !endereco) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificar se email já existe
    db.get('SELECT id FROM clientes WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            // Cliente já existe, retornar ID existente
            return res.status(200).json({ 
                id: row.id, 
                message: 'Cliente já cadastrado',
                existing: true 
            });
        }

        // Criar novo cliente
        db.run(
            'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)',
            [nome, email, telefone, endereco],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({
                    id: this.lastID,
                    nome,
                    email,
                    telefone,
                    endereco,
                    message: 'Cliente cadastrado com sucesso',
                    existing: false
                });
            }
        );
    });
});

// Atualizar cliente
app.put('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;

    db.run(
        'UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?',
        [nome, email, telefone, endereco, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            res.json({ message: 'Cliente atualizado com sucesso' });
        }
    );
});

// ============ ROTAS DE PEDIDOS ============

// Listar todos os pedidos
app.get('/api/pedidos', (req, res) => {
    db.all(`
        SELECT 
            p.*,
            c.nome as cliente_nome,
            c.email as cliente_email,
            c.telefone as cliente_telefone,
            c.endereco as cliente_endereco
        FROM pedidos p
        JOIN clientes c ON p.cliente_id = c.id
        ORDER BY p.created_at DESC
    `, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Buscar pedido por ID
app.get('/api/pedidos/:id', (req, res) => {
    const { id } = req.params;
    db.get(`
        SELECT 
            p.*,
            c.nome as cliente_nome,
            c.email as cliente_email,
            c.telefone as cliente_telefone,
            c.endereco as cliente_endereco
        FROM pedidos p
        JOIN clientes c ON p.cliente_id = c.id
        WHERE p.id = ?
    `, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        res.json(row);
    });
});

// Buscar pedidos por cliente
app.get('/api/pedidos/cliente/:clienteId', (req, res) => {
    const { clienteId } = req.params;
    db.all(`
        SELECT 
            p.*,
            c.nome as cliente_nome,
            c.email as cliente_email,
            c.telefone as cliente_telefone,
            c.endereco as cliente_endereco
        FROM pedidos p
        JOIN clientes c ON p.cliente_id = c.id
        WHERE p.cliente_id = ?
        ORDER BY p.created_at DESC
    `, [clienteId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Criar novo pedido
app.post('/api/pedidos', (req, res) => {
    const { nome, email, telefone, endereco, produto, preco, mensagem, metodo_pagamento } = req.body;

    if (!nome || !email || !telefone || !endereco || !produto || !preco) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Verificar ou criar cliente
    db.get('SELECT id FROM clientes WHERE email = ?', [email], (err, clienteRow) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        let clienteId;

        if (clienteRow) {
            // Cliente existe, usar ID existente
            clienteId = clienteRow.id;
            
            // Atualizar dados do cliente caso tenham mudado
            db.run(
                'UPDATE clientes SET nome = ?, telefone = ?, endereco = ? WHERE id = ?',
                [nome, telefone, endereco, clienteId],
                (err) => {
                    if (err) console.error('Erro ao atualizar cliente:', err);
                }
            );
        } else {
            // Criar novo cliente
            db.run(
                'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)',
                [nome, email, telefone, endereco],
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    clienteId = this.lastID;
                    
                    // Criar pedido
                    criarPedido(clienteId, produto, preco, mensagem, metodo_pagamento, res);
                }
            );
            return;
        }

        // Criar pedido
        criarPedido(clienteId, produto, preco, mensagem, metodo_pagamento, res);
    });
});

function criarPedido(clienteId, produto, preco, mensagem, metodo_pagamento, res) {
    db.run(
        'INSERT INTO pedidos (cliente_id, produto, preco, mensagem, metodo_pagamento) VALUES (?, ?, ?, ?, ?)',
        [clienteId, produto, preco, mensagem || null, metodo_pagamento || null],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                id: this.lastID,
                cliente_id: clienteId,
                produto,
                preco,
                mensagem: mensagem || null,
                metodo_pagamento: metodo_pagamento || null,
                status: 'pendente',
                message: 'Pedido criado com sucesso'
            });
        }
    );
}

// Atualizar status do pedido
app.put('/api/pedidos/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const statusValidos = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'];
    if (!statusValidos.includes(status)) {
        return res.status(400).json({ error: 'Status inválido' });
    }

    db.run(
        'UPDATE pedidos SET status = ? WHERE id = ?',
        [status, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Pedido não encontrado' });
            }
            res.json({ message: 'Status atualizado com sucesso', status });
        }
    );
});

// Deletar pedido
app.delete('/api/pedidos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM pedidos WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        res.json({ message: 'Pedido deletado com sucesso' });
    });
});

// ============ ESTATÍSTICAS ============

// Estatísticas gerais
app.get('/api/estatisticas', (req, res) => {
    const stats = {};

    // Total de clientes
    db.get('SELECT COUNT(*) as total FROM clientes', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.totalClientes = row.total;

        // Total de pedidos
        db.get('SELECT COUNT(*) as total FROM pedidos', (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.totalPedidos = row.total;

            // Total vendido
            db.get('SELECT SUM(preco) as total FROM pedidos', (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.totalVendido = row.total || 0;

                // Pedidos por status
                db.all(`
                    SELECT status, COUNT(*) as quantidade 
                    FROM pedidos 
                    GROUP BY status
                `, (err, rows) => {
                    if (err) return res.status(500).json({ error: err.message });
                    stats.pedidosPorStatus = rows;
                    
                    // Estatísticas de métodos de pagamento
                    db.all(`
                        SELECT metodo_pagamento, COUNT(*) as quantidade 
                        FROM pedidos 
                        WHERE metodo_pagamento IS NOT NULL
                        GROUP BY metodo_pagamento
                    `, (err, rows) => {
                        if (err) return res.status(500).json({ error: err.message });
                        stats.metodosPagamento = rows;
                        
                        // Produtos mais vendidos
                        db.all(`
                            SELECT produto, COUNT(*) as quantidade,
                                   SUM(preco) as total_vendido
                            FROM pedidos 
                            GROUP BY produto
                            ORDER BY quantidade DESC
                        `, (err, rows) => {
                            if (err) return res.status(500).json({ error: err.message });
                            stats.produtosMaisVendidos = rows;
                            res.json(stats);
                        });
                    });
                });
            });
        });
    });
});

// Exportar app para Vercel (serverless)
module.exports = app;

// Iniciar servidor apenas em ambiente local
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📱 API disponível em http://localhost:${PORT}/api`);
        console.log(`🌐 Aplicação disponível em http://localhost:${PORT}`);
    });
}

// Fechar banco ao encerrar aplicação
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('🔌 Conexão com banco de dados fechada.');
        process.exit(0);
    });
});

