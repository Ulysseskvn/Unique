// Sistema de Carrinho de Compras
class Carrinho {
    constructor() {
        this.itens = this.carregarCarrinho();
        this.atualizarContador();
    }
    
    // Carregar carrinho do localStorage
    carregarCarrinho() {
        try {
            const carrinhoSalvo = localStorage.getItem('carrinho');
            return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
        } catch (e) {
            console.error('Erro ao carregar carrinho:', e);
            return [];
        }
    }
    
    // Salvar carrinho no localStorage
    salvarCarrinho() {
        try {
            localStorage.setItem('carrinho', JSON.stringify(this.itens));
            this.atualizarContador();
        } catch (e) {
            console.error('Erro ao salvar carrinho:', e);
        }
    }
    
    // Adicionar item ao carrinho
    adicionarItem(produto) {
        // Verificar se o produto já está no carrinho (mesmo modelo, capacidade e cor)
        const itemExistente = this.itens.findIndex(item => 
            item.modelo === produto.modelo &&
            item.capacidade === produto.capacidade &&
            item.cor === produto.cor &&
            item.categoria === produto.categoria
        );
        
        if (itemExistente >= 0) {
            // Incrementar quantidade
            this.itens[itemExistente].quantidade += 1;
        } else {
            // Adicionar novo item
            this.itens.push({
                ...produto,
                quantidade: 1,
                id: Date.now() + Math.random() // ID único
            });
        }
        
        this.salvarCarrinho();
        this.mostrarNotificacao('Produto adicionado ao carrinho!');
    }
    
    // Remover item do carrinho
    removerItem(id) {
        this.itens = this.itens.filter(item => item.id !== id);
        this.salvarCarrinho();
    }
    
    // Atualizar quantidade de um item
    atualizarQuantidade(id, quantidade) {
        const item = this.itens.find(item => item.id === id);
        if (item) {
            if (quantidade <= 0) {
                this.removerItem(id);
            } else {
                item.quantidade = quantidade;
                this.salvarCarrinho();
            }
        }
    }
    
    // Limpar carrinho
    limpar() {
        this.itens = [];
        this.salvarCarrinho();
    }
    
    // Calcular subtotal (sem desconto/frete)
    calcularSubtotal() {
        return this.itens.reduce((total, item) => {
            return total + (item.preco * item.quantidade);
        }, 0);
    }
    
    // Calcular total (com desconto e frete)
    calcularTotal(desconto = 0, frete = 0) {
        const subtotal = this.calcularSubtotal();
        return subtotal - desconto + frete;
    }
    
    // Obter peso total (estimado - 1kg por item)
    obterPesoTotal() {
        return this.itens.reduce((total, item) => total + item.quantidade, 0);
    }
    
    // Obter quantidade total de itens
    obterQuantidadeTotal() {
        return this.itens.reduce((total, item) => total + item.quantidade, 0);
    }
    
    // Atualizar contador no navbar
    atualizarContador() {
        const contador = document.getElementById('carrinho-contador');
        const contadorMobile = document.getElementById('carrinho-contador-mobile');
        const quantidade = this.obterQuantidadeTotal();
        
        if (contador) {
            if (quantidade > 0) {
                contador.textContent = quantidade;
                contador.style.display = 'flex';
            } else {
                contador.style.display = 'none';
            }
        }
        
        if (contadorMobile) {
            if (quantidade > 0) {
                contadorMobile.textContent = quantidade;
                contadorMobile.style.display = 'flex';
            } else {
                contadorMobile.style.display = 'none';
            }
        }
    }
    
    // Mostrar notificação
    mostrarNotificacao(mensagem) {
        // Criar elemento de notificação
        const notificacao = document.createElement('div');
        notificacao.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #34c759, #30d158);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        // Adicionar animação CSS se não existir
        if (!document.getElementById('carrinho-animacoes')) {
            const style = document.createElement('style');
            style.id = 'carrinho-animacoes';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        notificacao.innerHTML = `
            <span>✓</span>
            <span>${mensagem}</span>
        `;
        
        document.body.appendChild(notificacao);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notificacao.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notificacao.remove(), 300);
        }, 3000);
    }
}

// Instância global do carrinho
const carrinho = new Carrinho();

// Função global para adicionar ao carrinho (chamada pelos botões)
function adicionarAoCarrinho(produto) {
    carrinho.adicionarItem(produto);
}

// Atualizar contador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    carrinho.atualizarContador();
});

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Carrinho;
}

