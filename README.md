# Unique Importados - Landing Page e Backend

Sistema completo de landing page para venda de produtos Apple (iPhone, AirPods, Apple Watch) com backend para gerenciamento de clientes e pedidos.

## 🚀 Funcionalidades

### Frontend
- Landing page responsiva e moderna
- Seção de produtos com preços e especificações
- Formulário de pedidos com dropdown de produtos
- Seleção de método de pagamento
- Design estilo Apple
- Animações e transições suaves

### Painel Administrativo
- Dashboard com estatísticas em tempo real
- Visualização de todos os clientes cadastrados
- Visualização de todos os pedidos
- Filtros por status e busca de pedidos
- Detalhes completos de cada pedido (cliente, produto, método de pagamento)
- Atualização de status dos pedidos
- Estatísticas detalhadas:
  - Pedidos por status
  - Métodos de pagamento mais usados
  - Produtos mais vendidos
  - Total de vendas e clientes

### Backend
- API REST completa
- Cadastro de clientes
- Criação e gerenciamento de pedidos
- Banco de dados SQLite
- Estatísticas de vendas
- Sistema de status de pedidos
- Registro de método de pagamento

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos

1. **Instalar dependências:**
```bash
npm install
```

2. **Iniciar o servidor:**
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

3. **Acessar a aplicação:**
- Frontend: http://localhost:3000
- Painel Administrativo: http://localhost:3000/admin.html
- API: http://localhost:3000/api

## 📁 Estrutura do Projeto

```
├── index.html          # Página principal (landing page)
├── styles.css          # Estilos da landing page
├── script.js           # JavaScript frontend
├── admin.html          # Painel administrativo
├── admin.css           # Estilos do painel admin
├── admin.js            # JavaScript do painel admin
├── server.js           # Servidor backend
├── package.json        # Dependências
├── database.db         # Banco de dados SQLite (criado automaticamente)
└── README.md           # Este arquivo
```

## 🔌 API Endpoints

### Clientes

- `GET /api/clientes` - Listar todos os clientes
- `GET /api/clientes/:id` - Buscar cliente por ID
- `GET /api/clientes/email/:email` - Buscar cliente por email
- `POST /api/clientes` - Criar novo cliente
- `PUT /api/clientes/:id` - Atualizar cliente

### Pedidos

- `GET /api/pedidos` - Listar todos os pedidos
- `GET /api/pedidos/:id` - Buscar pedido por ID
- `GET /api/pedidos/cliente/:clienteId` - Buscar pedidos por cliente
- `POST /api/pedidos` - Criar novo pedido
- `PUT /api/pedidos/:id/status` - Atualizar status do pedido
- `DELETE /api/pedidos/:id` - Deletar pedido

### Estatísticas

- `GET /api/estatisticas` - Estatísticas gerais (clientes, pedidos, vendas)

## 📝 Exemplo de Uso da API

### Criar Pedido

```javascript
POST /api/pedidos
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua Exemplo, 123 - São Paulo, SP",
  "produto": "iPhone 15 Pro Max",
  "preco": 10999,
  "metodo_pagamento": "PIX",
  "mensagem": "Entregar durante a manhã"
}
```

### Buscar Pedidos

```javascript
GET /api/pedidos
```

### Atualizar Status do Pedido

```javascript
PUT /api/pedidos/1/status
Content-Type: application/json

{
  "status": "confirmado"
}
```

Status disponíveis: `pendente`, `confirmado`, `enviado`, `entregue`, `cancelado`

### Métodos de Pagamento

- PIX
- Cartão de Crédito
- Cartão de Débito
- Boleto
- Transferência Bancária

## 📊 Painel Administrativo

Acesse `http://localhost:3000/admin.html` para gerenciar:

- **Pedidos**: Visualize todos os pedidos, filtre por status, veja detalhes completos e altere o status
- **Clientes**: Veja todos os clientes cadastrados e quantos pedidos cada um fez
- **Estatísticas**: Dashboard com métricas de vendas, métodos de pagamento e produtos mais vendidos

O painel atualiza automaticamente a cada 30 segundos e pode ser atualizado manualmente com o botão de refresh.

## 🗄️ Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução. As tabelas são:

### Tabela `clientes`
- id (INTEGER PRIMARY KEY)
- nome (TEXT)
- email (TEXT UNIQUE)
- telefone (TEXT)
- endereco (TEXT)
- created_at (DATETIME)

### Tabela `pedidos`
- id (INTEGER PRIMARY KEY)
- cliente_id (INTEGER FOREIGN KEY)
- produto (TEXT)
- preco (REAL)
- mensagem (TEXT)
- metodo_pagamento (TEXT)
- status (TEXT DEFAULT 'pendente')
- created_at (DATETIME)

## 🔧 Configuração

Criar arquivo `.env` (opcional) para configurar a porta:

```
PORT=3000
```

## 📱 Produtos Disponíveis

- iPhone 15 Pro Max - R$ 10.999
- AirPods Pro (2ª Geração) - R$ 1.999
- Apple Watch Series 9 - R$ 3.999

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Banco de Dados**: SQLite3
- **Estilo**: CSS moderno com variáveis CSS

## 📄 Licença

© 2025 Unique Importados.

