// URL da API - detecta automaticamente se está em produção ou desenvolvimento
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : window.location.origin + '/api';

let todosPedidos = [];
let todosClientes = [];
let pedidoAtual = null;

// Carregar dados ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    // Atualizar a cada 30 segundos
    setInterval(carregarDados, 30000);
});

// Carregar todos os dados
async function carregarDados() {
    try {
        await Promise.all([
            carregarPedidos(),
            carregarClientes(),
            carregarEstatisticas()
        ]);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar dados. Verifique se o servidor está rodando.');
    }
}

// Carregar pedidos
async function carregarPedidos() {
    try {
        const response = await fetch(`${API_URL}/pedidos`);
        if (!response.ok) throw new Error('Erro ao carregar pedidos');
        
        todosPedidos = await response.json();
        exibirPedidos(todosPedidos);
        atualizarEstatisticasCards();
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Carregar clientes
async function carregarClientes() {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        if (!response.ok) throw new Error('Erro ao carregar clientes');
        
        todosClientes = await response.json();
        exibirClientes(todosClientes);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Carregar estatísticas
async function carregarEstatisticas() {
    try {
        const response = await fetch(`${API_URL}/estatisticas`);
        if (!response.ok) throw new Error('Erro ao carregar estatísticas');
        
        const stats = await response.json();
        exibirEstatisticas(stats);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Exibir pedidos
function exibirPedidos(pedidos) {
    const container = document.getElementById('listaPedidos');
    
    if (pedidos.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--text-light);">Nenhum pedido encontrado</div>';
        return;
    }
    
    container.innerHTML = pedidos.map(pedido => {
        const dataFormatada = formatarData(pedido.created_at);
        const precoFormatado = formatarMoeda(pedido.preco);
        
        return `
            <div class="pedido-card" onclick="abrirModalPedido(${pedido.id})">
                <div class="pedido-header">
                    <div class="pedido-id">#${pedido.id}</div>
                    <span class="status-badge status-${pedido.status}">${pedido.status}</span>
                </div>
                <div class="pedido-info">
                    <div class="info-item">
                        <span class="info-label">Cliente</span>
                        <span class="info-value">${pedido.cliente_nome}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Produto</span>
                        <span class="info-value">${pedido.produto}</span>
                    </div>
                    ${pedido.modelo ? `
                    <div class="info-item">
                        <span class="info-label">Modelo</span>
                        <span class="info-value">${pedido.modelo}</span>
                    </div>
                    ` : ''}
                    ${pedido.capacidade ? `
                    <div class="info-item">
                        <span class="info-label">Capacidade</span>
                        <span class="info-value">${pedido.capacidade}</span>
                    </div>
                    ` : ''}
                    ${pedido.cor ? `
                    <div class="info-item">
                        <span class="info-label">Cor</span>
                        <span class="info-value">${pedido.cor}</span>
                    </div>
                    ` : ''}
                    <div class="info-item">
                        <span class="info-label">Pagamento</span>
                        <span class="info-value">${pedido.metodo_pagamento || 'Não informado'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Data</span>
                        <span class="info-value">${dataFormatada}</span>
                    </div>
                </div>
                <div class="pedido-valor">${precoFormatado}</div>
            </div>
        `;
    }).join('');
}

// Exibir clientes
function exibirClientes(clientes) {
    const container = document.getElementById('listaClientes');
    
    if (clientes.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--text-light);">Nenhum cliente encontrado</div>';
        return;
    }
    
    // Buscar quantidade de pedidos por cliente
    const pedidosPorCliente = {};
    todosPedidos.forEach(pedido => {
        pedidosPorCliente[pedido.cliente_id] = (pedidosPorCliente[pedido.cliente_id] || 0) + 1;
    });
    
    container.innerHTML = clientes.map(cliente => {
        const dataFormatada = formatarData(cliente.created_at);
        const totalPedidos = pedidosPorCliente[cliente.id] || 0;
        
        return `
            <div class="cliente-card">
                <div class="cliente-header">
                    <div class="cliente-nome">${cliente.nome}</div>
                    <span class="pedidos-count">${totalPedidos} pedido${totalPedidos !== 1 ? 's' : ''}</span>
                </div>
                <div class="cliente-info">
                    <div class="info-item">
                        <span class="info-label">Email</span>
                        <span class="info-value">${cliente.email}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Telefone</span>
                        <span class="info-value">${cliente.telefone}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Endereço</span>
                        <span class="info-value">${cliente.endereco}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Cadastrado em</span>
                        <span class="info-value">${dataFormatada}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Exibir estatísticas
function exibirEstatisticas(stats) {
    // Atualizar cards principais
    document.getElementById('totalClientes').textContent = stats.totalClientes || 0;
    document.getElementById('totalPedidos').textContent = stats.totalPedidos || 0;
    document.getElementById('totalVendido').textContent = formatarMoeda(stats.totalVendido || 0);
    
    const pendentes = stats.pedidosPorStatus?.find(s => s.status === 'pendente')?.quantidade || 0;
    document.getElementById('pedidosPendentes').textContent = pendentes;
    
    // Estatísticas detalhadas
    if (stats.pedidosPorStatus) {
        const statusContainer = document.getElementById('statsStatus');
        statusContainer.innerHTML = stats.pedidosPorStatus.map(item => `
            <div class="stat-item">
                <span class="stat-item-label">${item.status}</span>
                <span class="stat-item-value">${item.quantidade}</span>
            </div>
        `).join('');
    }
    
    // Estatísticas de pagamento
    const metodosPagamento = {};
    todosPedidos.forEach(pedido => {
        const metodo = pedido.metodo_pagamento || 'Não informado';
        metodosPagamento[metodo] = (metodosPagamento[metodo] || 0) + 1;
    });
    
    const pagamentoContainer = document.getElementById('statsPagamento');
    if (Object.keys(metodosPagamento).length > 0) {
        pagamentoContainer.innerHTML = Object.entries(metodosPagamento)
            .sort((a, b) => b[1] - a[1])
            .map(([metodo, quantidade]) => `
                <div class="stat-item">
                    <span class="stat-item-label">${metodo}</span>
                    <span class="stat-item-value">${quantidade}</span>
                </div>
            `).join('');
    } else {
        pagamentoContainer.innerHTML = '<div style="color: var(--text-light);">Nenhum dado disponível</div>';
    }
    
    // Produtos mais vendidos
    const produtosVendidos = {};
    todosPedidos.forEach(pedido => {
        produtosVendidos[pedido.produto] = (produtosVendidos[pedido.produto] || 0) + 1;
    });
    
    const produtosContainer = document.getElementById('statsProdutos');
    if (Object.keys(produtosVendidos).length > 0) {
        produtosContainer.innerHTML = Object.entries(produtosVendidos)
            .sort((a, b) => b[1] - a[1])
            .map(([produto, quantidade]) => `
                <div class="stat-item">
                    <span class="stat-item-label">${produto}</span>
                    <span class="stat-item-value">${quantidade}</span>
                </div>
            `).join('');
    } else {
        produtosContainer.innerHTML = '<div style="color: var(--text-light);">Nenhum dado disponível</div>';
    }
}

// Atualizar estatísticas dos cards principais
function atualizarEstatisticasCards() {
    const pendentes = todosPedidos.filter(p => p.status === 'pendente').length;
    document.getElementById('pedidosPendentes').textContent = pendentes;
    document.getElementById('totalPedidos').textContent = todosPedidos.length;
    document.getElementById('totalClientes').textContent = todosClientes.length;
    
    const totalVendido = todosPedidos.reduce((sum, p) => sum + parseFloat(p.preco || 0), 0);
    document.getElementById('totalVendido').textContent = formatarMoeda(totalVendido);
}

// Filtrar pedidos
function filtrarPedidos() {
    const statusFiltro = document.getElementById('filtroStatus').value.toLowerCase();
    const busca = document.getElementById('buscaPedido').value.toLowerCase();
    
    let pedidosFiltrados = todosPedidos;
    
    if (statusFiltro) {
        pedidosFiltrados = pedidosFiltrados.filter(p => p.status === statusFiltro);
    }
    
    if (busca) {
        pedidosFiltrados = pedidosFiltrados.filter(p => 
            p.id.toString().includes(busca) ||
            p.cliente_nome?.toLowerCase().includes(busca) ||
            p.produto?.toLowerCase().includes(busca) ||
            p.cliente_email?.toLowerCase().includes(busca)
        );
    }
    
    exibirPedidos(pedidosFiltrados);
}

// Filtrar clientes
function filtrarClientes() {
    const busca = document.getElementById('buscaCliente').value.toLowerCase();
    
    if (!busca) {
        exibirClientes(todosClientes);
        return;
    }
    
    const clientesFiltrados = todosClientes.filter(c =>
        c.nome?.toLowerCase().includes(busca) ||
        c.email?.toLowerCase().includes(busca) ||
        c.telefone?.includes(busca)
    );
    
    exibirClientes(clientesFiltrados);
}

// Mostrar aba
function mostrarAba(aba) {
    // Esconder todas as abas
    document.querySelectorAll('.aba').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // Mostrar aba selecionada
    document.getElementById(`aba-${aba}`).classList.add('active');
    
    // Ativar botão correspondente
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((btn, index) => {
        const abas = ['pedidos', 'clientes', 'estatisticas'];
        if (abas[index] === aba) {
            btn.classList.add('active');
        }
    });
    
    // Recarregar dados se necessário
    if (aba === 'estatisticas') {
        exibirEstatisticas({ pedidosPorStatus: [] });
    }
}

// Abrir modal de pedido
async function abrirModalPedido(id) {
    const pedido = todosPedidos.find(p => p.id === id);
    if (!pedido) return;
    
    pedidoAtual = pedido;
    
    document.getElementById('modalPedidoId').textContent = pedido.id;
    document.getElementById('novoStatus').value = pedido.status;
    
    const conteudo = document.getElementById('modalPedidoConteudo');
    conteudo.innerHTML = `
        <div class="info-item" style="margin-bottom: 1rem;">
            <span class="info-label">Status Atual</span>
            <span class="status-badge status-${pedido.status}" style="display: inline-block; margin-top: 0.5rem;">${pedido.status}</span>
        </div>
        <div class="pedido-info">
            <div class="info-item">
                <span class="info-label">Cliente</span>
                <span class="info-value">${pedido.cliente_nome}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${pedido.cliente_email}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Telefone</span>
                <span class="info-value">${pedido.cliente_telefone}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Endereço</span>
                <span class="info-value">${pedido.cliente_endereco}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Produto</span>
                <span class="info-value">${pedido.produto}</span>
            </div>
            ${pedido.modelo ? `
            <div class="info-item">
                <span class="info-label">Modelo</span>
                <span class="info-value">${pedido.modelo}</span>
            </div>
            ` : ''}
            ${pedido.capacidade ? `
            <div class="info-item">
                <span class="info-label">Capacidade</span>
                <span class="info-value">${pedido.capacidade}</span>
            </div>
            ` : ''}
            ${pedido.cor ? `
            <div class="info-item">
                <span class="info-label">Cor</span>
                <span class="info-value">${pedido.cor}</span>
            </div>
            ` : ''}
            <div class="info-item">
                <span class="info-label">Método de Pagamento</span>
                <span class="info-value">${pedido.metodo_pagamento || 'Não informado'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Valor</span>
                <span class="info-value" style="font-size: 1.5rem; color: var(--success-color);">${formatarMoeda(pedido.preco)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Data do Pedido</span>
                <span class="info-value">${formatarData(pedido.created_at)}</span>
            </div>
        </div>
        ${pedido.mensagem ? `
            <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-light); border-radius: 8px;">
                <span class="info-label">Mensagem do Cliente:</span>
                <p style="margin-top: 0.5rem; color: var(--text-dark);">${pedido.mensagem}</p>
            </div>
        ` : ''}
    `;
    
    document.getElementById('modalPedido').classList.add('active');
}

// Fechar modal
function fecharModal() {
    document.getElementById('modalPedido').classList.remove('active');
}

// Atualizar status do pedido
async function atualizarStatus() {
    if (!pedidoAtual) return;
    
    const novoStatus = document.getElementById('novoStatus').value;
    
    try {
        const response = await fetch(`${API_URL}/pedidos/${pedidoAtual.id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: novoStatus })
        });
        
        if (!response.ok) throw new Error('Erro ao atualizar status');
        
        // Atualizar pedido local
        pedidoAtual.status = novoStatus;
        const index = todosPedidos.findIndex(p => p.id === pedidoAtual.id);
        if (index !== -1) {
            todosPedidos[index].status = novoStatus;
        }
        
        // Recarregar exibição
        exibirPedidos(todosPedidos);
        atualizarEstatisticasCards();
        
        alert('Status atualizado com sucesso!');
        fecharModal();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar status do pedido');
    }
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modalPedido');
    if (event.target === modal) {
        fecharModal();
    }
}

// Funções utilitárias
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function formatarData(data) {
    if (!data) return '-';
    const date = new Date(data);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

