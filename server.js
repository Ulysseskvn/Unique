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
// No Vercel, quando rodando direto do server.js, __dirname já é a raiz
const rootDir = __dirname;

// Tentar múltiplos caminhos
app.use(express.static(rootDir));
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.static(process.cwd()));

// Servir produtos.js e mais-vendidos.js
app.get('/produtos.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'produtos.js'), (err) => {
        if (err) res.sendFile(path.join(process.cwd(), 'produtos.js'));
    });
});

app.get('/mais-vendidos.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'mais-vendidos.js'), (err) => {
        if (err) res.sendFile(path.join(process.cwd(), 'mais-vendidos.js'));
    });
});

app.get('/carrinho.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'carrinho.js'), (err) => {
        if (err) res.sendFile(path.join(process.cwd(), 'carrinho.js'));
    });
});

app.get('/auth.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'auth.js'), (err) => {
        if (err) res.sendFile(path.join(process.cwd(), 'auth.js'));
    });
});

// Rotas principais
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

app.get('/catalogo.html', (req, res) => {
    const catalogoPath = path.join(rootDir, 'catalogo.html');
    res.sendFile(catalogoPath, (err) => {
        if (err) {
            const altPath = path.join(process.cwd(), 'catalogo.html');
            res.sendFile(altPath);
        }
    });
});

app.get('/carrinho.html', (req, res) => {
    const carrinhoPath = path.join(rootDir, 'carrinho.html');
    res.sendFile(carrinhoPath, (err) => {
        if (err) {
            const altPath = path.join(process.cwd(), 'carrinho.html');
            res.sendFile(altPath);
        }
    });
});

app.get('/login.html', (req, res) => {
    const loginPath = path.join(rootDir, 'login.html');
    res.sendFile(loginPath, (err) => {
        if (err) {
            const altPath = path.join(process.cwd(), 'login.html');
            res.sendFile(altPath);
        }
    });
});

app.get('/area-cliente.html', (req, res) => {
    const areaClientePath = path.join(rootDir, 'area-cliente.html');
    res.sendFile(areaClientePath, (err) => {
        if (err) {
            const altPath = path.join(process.cwd(), 'area-cliente.html');
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
            senha TEXT,
            cep TEXT,
            cidade TEXT,
            estado TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    
    // Tabela de cupons
    db.run(`
        CREATE TABLE IF NOT EXISTS cupons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT NOT NULL UNIQUE,
            tipo TEXT NOT NULL,
            valor REAL NOT NULL,
            valor_minimo REAL DEFAULT 0,
            validade DATE,
            usado INTEGER DEFAULT 0,
            max_usos INTEGER DEFAULT 1,
            ativo INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    
    // Tabela de frete
    db.run(`
        CREATE TABLE IF NOT EXISTS fretes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cep_origem TEXT NOT NULL,
            regiao TEXT NOT NULL,
            valor_base REAL NOT NULL,
            valor_por_kg REAL DEFAULT 0,
            prazo_dias INTEGER DEFAULT 5,
            ativo INTEGER DEFAULT 1
        )
    `);

    // Tabela de pedidos
    db.run(`
        CREATE TABLE IF NOT EXISTS pedidos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER NOT NULL,
            produto TEXT NOT NULL,
            modelo TEXT,
            capacidade TEXT,
            cor TEXT,
            preco REAL NOT NULL,
            desconto REAL DEFAULT 0,
            frete REAL DEFAULT 0,
            total REAL NOT NULL,
            mensagem TEXT,
            metodo_pagamento TEXT,
            status TEXT DEFAULT 'pendente',
            status_pagamento TEXT DEFAULT 'pendente',
            cupom_usado TEXT,
            cep_entrega TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        )
    `);
    
    // Adicionar colunas se não existirem (para bancos já criados)
    db.run(`ALTER TABLE pedidos ADD COLUMN metodo_pagamento TEXT`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN modelo TEXT`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN capacidade TEXT`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN cor TEXT`, (err) => {});
    db.run(`ALTER TABLE clientes ADD COLUMN senha TEXT`, (err) => {});
    db.run(`ALTER TABLE clientes ADD COLUMN cep TEXT`, (err) => {});
    db.run(`ALTER TABLE clientes ADD COLUMN cidade TEXT`, (err) => {});
    db.run(`ALTER TABLE clientes ADD COLUMN estado TEXT`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN desconto REAL DEFAULT 0`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN frete REAL DEFAULT 0`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN total REAL`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN status_pagamento TEXT DEFAULT 'pendente'`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN cupom_usado TEXT`, (err) => {});
    db.run(`ALTER TABLE pedidos ADD COLUMN cep_entrega TEXT`, (err) => {});
});

// ============ ROTAS DE AUTENTICAÇÃO ============
const crypto = require('crypto');

// Função para hash de senha
function hashSenha(senha) {
    return crypto.createHash('sha256').update(senha).digest('hex');
}

// Cadastro
app.post('/api/auth/cadastro', (req, res) => {
    const { nome, email, senha, telefone, endereco, cep, cidade, estado } = req.body;
    
    if (!nome || !email || !senha || !telefone || !endereco) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    
    const senhaHash = hashSenha(senha);
    
    db.run(
        'INSERT INTO clientes (nome, email, telefone, endereco, senha, cep, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, email, telefone, endereco, senhaHash, cep || null, cidade || null, estado || null],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint')) {
                    return res.status(400).json({ error: 'Email já cadastrado' });
                }
                return res.status(500).json({ error: err.message });
            }
            
            res.status(201).json({
                usuario: {
                    id: this.lastID,
                    nome,
                    email,
                    telefone,
                    endereco,
                    cep: cep || null,
                    cidade: cidade || null,
                    estado: estado || null
                },
                message: 'Cadastro realizado com sucesso'
            });
        }
    );
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    const senhaHash = hashSenha(senha);
    
    db.get(
        'SELECT id, nome, email, telefone, endereco, cep, cidade, estado FROM clientes WHERE email = ? AND senha = ?',
        [email, senhaHash],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            if (!row) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }
            
            res.json({
                usuario: row,
                message: 'Login realizado com sucesso'
            });
        }
    );
});

// Obter usuário atual (por email)
app.get('/api/auth/usuario', (req, res) => {
    const email = req.query.email;
    
    if (!email) {
        return res.status(400).json({ error: 'Email é obrigatório' });
    }
    
    db.get(
        'SELECT id, nome, email, telefone, endereco, cep, cidade, estado FROM clientes WHERE email = ?',
        [email],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            if (!row) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            
            res.json(row);
        }
    );
});

// ============ ROTAS DE CUPONS ============

// Validar cupom
app.post('/api/cupons/validar', (req, res) => {
    const { codigo, valor_total } = req.body;
    
    if (!codigo) {
        return res.status(400).json({ error: 'Código do cupom é obrigatório' });
    }
    
    db.get(
        'SELECT * FROM cupons WHERE codigo = ? AND ativo = 1',
        [codigo.toUpperCase()],
        (err, cupom) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            if (!cupom) {
                return res.status(404).json({ error: 'Cupom não encontrado ou inativo' });
            }
            
            // Verificar validade
            if (cupom.validade) {
                const hoje = new Date();
                const validade = new Date(cupom.validade);
                if (hoje > validade) {
                    return res.status(400).json({ error: 'Cupom expirado' });
                }
            }
            
            // Verificar valor mínimo
            if (valor_total && cupom.valor_minimo > valor_total) {
                return res.status(400).json({ 
                    error: `Valor mínimo para este cupom: R$ ${cupom.valor_minimo.toLocaleString('pt-BR')}` 
                });
            }
            
            // Verificar usos máximos
            if (cupom.max_usos && cupom.usado >= cupom.max_usos) {
                return res.status(400).json({ error: 'Cupom esgotado' });
            }
            
            res.json({
                cupom: {
                    codigo: cupom.codigo,
                    tipo: cupom.tipo,
                    valor: cupom.valor,
                    valor_minimo: cupom.valor_minimo
                },
                message: 'Cupom válido'
            });
        }
    );
});

// Criar cupom (admin)
app.post('/api/cupons', (req, res) => {
    const { codigo, tipo, valor, valor_minimo, validade, max_usos } = req.body;
    
    if (!codigo || !tipo || !valor) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    
    db.run(
        'INSERT INTO cupons (codigo, tipo, valor, valor_minimo, validade, max_usos) VALUES (?, ?, ?, ?, ?, ?)',
        [codigo.toUpperCase(), tipo, valor, valor_minimo || 0, validade || null, max_usos || 1],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint')) {
                    return res.status(400).json({ error: 'Código já existe' });
                }
                return res.status(500).json({ error: err.message });
            }
            
            res.status(201).json({ id: this.lastID, message: 'Cupom criado com sucesso' });
        }
    );
});

// ============ ROTAS DE FRETE ============

// Calcular frete
app.post('/api/frete/calcular', (req, res) => {
    const { cep, peso_total } = req.body;
    
    if (!cep) {
        return res.status(400).json({ error: 'CEP é obrigatório' });
    }
    
    // Simplificado: buscar frete por CEP/região
    // Em produção, usar API dos Correios ou similar
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Regiões simplificadas
    let regiao = 'sudeste'; // padrão
    if (cepLimpo.startsWith('01') || cepLimpo.startsWith('02') || cepLimpo.startsWith('03')) {
        regiao = 'sul';
    } else if (cepLimpo.startsWith('20') || cepLimpo.startsWith('21') || cepLimpo.startsWith('22')) {
        regiao = 'nordeste';
    } else if (cepLimpo.startsWith('30') || cepLimpo.startsWith('31') || cepLimpo.startsWith('40')) {
        regiao = 'sudeste';
    } else if (cepLimpo.startsWith('80') || cepLimpo.startsWith('81') || cepLimpo.startsWith('82')) {
        regiao = 'sul';
    }
    
    // Buscar configuração de frete
    db.get(
        'SELECT * FROM fretes WHERE regiao = ? AND ativo = 1 LIMIT 1',
        [regiao],
        (err, frete) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            // Se não encontrar, usar valores padrão
            const valorBase = frete ? frete.valor_base : 15.00;
            const valorPorKg = frete ? frete.valor_por_kg : 2.00;
            const prazoDias = frete ? frete.prazo_dias : 5;
            const peso = peso_total || 1; // padrão 1kg
            
            const valorFrete = valorBase + (valorPorKg * peso);
            
            res.json({
                valor: Math.round(valorFrete * 100) / 100,
                prazo_dias: prazoDias,
                regiao: regiao
            });
        }
    );
});

// Criar/atualizar configuração de frete (admin)
app.post('/api/frete/config', (req, res) => {
    const { cep_origem, regiao, valor_base, valor_por_kg, prazo_dias } = req.body;
    
    if (!regiao || !valor_base) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    
    db.run(
        'INSERT INTO fretes (cep_origem, regiao, valor_base, valor_por_kg, prazo_dias) VALUES (?, ?, ?, ?, ?)',
        [cep_origem || '00000000', regiao, valor_base, valor_por_kg || 0, prazo_dias || 5],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            res.status(201).json({ id: this.lastID, message: 'Configuração de frete criada' });
        }
    );
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
            p.id,
            p.cliente_id,
            p.produto,
            p.modelo,
            p.capacidade,
            p.cor,
            p.preco,
            p.mensagem,
            p.metodo_pagamento,
            p.status,
            p.created_at,
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
            p.id,
            p.cliente_id,
            p.produto,
            p.modelo,
            p.capacidade,
            p.cor,
            p.preco,
            p.mensagem,
            p.metodo_pagamento,
            p.status,
            p.created_at,
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
    const { 
        nome, email, telefone, endereco, produto, modelo, capacidade, cor, 
        preco, desconto, frete, total, mensagem, metodo_pagamento, 
        cupom_usado, cep_entrega, status_pagamento 
    } = req.body;

    if (!nome || !email || !telefone || !endereco || !produto || !preco) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Calcular total se não fornecido
    const precoFinal = total || (preco - (desconto || 0) + (frete || 0));

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
                    criarPedido(clienteId, produto, modelo, capacidade, cor, preco, desconto || 0, frete || 0, precoFinal, mensagem, metodo_pagamento, cupom_usado, cep_entrega, status_pagamento, res);
                }
            );
            return;
        }

        // Criar pedido
        criarPedido(clienteId, produto, modelo, capacidade, cor, preco, desconto || 0, frete || 0, precoFinal, mensagem, metodo_pagamento, cupom_usado, cep_entrega, status_pagamento, res);
    });
});

function criarPedido(clienteId, produto, modelo, capacidade, cor, preco, desconto, frete, total, mensagem, metodo_pagamento, cupom_usado, cep_entrega, status_pagamento, res) {
    db.run(
        'INSERT INTO pedidos (cliente_id, produto, modelo, capacidade, cor, preco, desconto, frete, total, mensagem, metodo_pagamento, cupom_usado, cep_entrega, status_pagamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            clienteId, produto, modelo || null, capacidade || null, cor || null, 
            preco, desconto, frete, total, mensagem || null, 
            metodo_pagamento || null, cupom_usado || null, cep_entrega || null, 
            status_pagamento || 'pendente'
        ],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            // Se usou cupom, incrementar contador de usos
            if (cupom_usado) {
                db.run(
                    'UPDATE cupons SET usado = usado + 1 WHERE codigo = ?',
                    [cupom_usado.toUpperCase()],
                    (err) => {
                        if (err) console.error('Erro ao atualizar cupom:', err);
                    }
                );
            }
            
            res.status(201).json({
                id: this.lastID,
                cliente_id: clienteId,
                produto,
                modelo: modelo || null,
                capacidade: capacidade || null,
                cor: cor || null,
                preco,
                desconto,
                frete,
                total,
                mensagem: mensagem || null,
                metodo_pagamento: metodo_pagamento || null,
                cupom_usado: cupom_usado || null,
                cep_entrega: cep_entrega || null,
                status: 'pendente',
                status_pagamento: status_pagamento || 'pendente',
                message: 'Pedido criado com sucesso'
            });
        }
    );
}

// Obter pedidos do cliente
app.get('/api/pedidos/cliente/:email', (req, res) => {
    const { email } = req.params;
    
    db.all(`
        SELECT p.*, c.nome as cliente_nome 
        FROM pedidos p
        JOIN clientes c ON p.cliente_id = c.id
        WHERE c.email = ?
        ORDER BY p.created_at DESC
    `, [email], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

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

