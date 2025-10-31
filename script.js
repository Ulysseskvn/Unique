// Menu Mobile Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animação de entrada para cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todos os cards
document.querySelectorAll('.feature-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// URL da API - detecta automaticamente se está em produção ou desenvolvimento
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : window.location.origin + '/api';

// Seleção de produto - atualiza o formulário quando clicar no botão
function selectProduct(productName, price, buttonElement) {
    // Scroll suave para o formulário
    setTimeout(() => {
        document.getElementById('contato').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
    
    // Feedback visual no botão clicado
    const button = buttonElement || (window.event ? window.event.target : null);
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }
}

// Funções para gerenciar seleção de produtos com variantes
function atualizarSelecoesProduto() {
    const tipoProduto = document.getElementById('tipoProduto').value;
    const grupoModelo = document.getElementById('grupoModelo');
    const grupoCapacidade = document.getElementById('grupoCapacidade');
    const grupoCor = document.getElementById('grupoCor');
    const grupoPreco = document.getElementById('grupoPreco');
    const modeloSelect = document.getElementById('modeloProduto');
    
    // Limpar seleções anteriores
    modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
    grupoCapacidade.style.display = 'none';
    grupoCor.style.display = 'none';
    grupoPreco.style.display = 'none';
    
    if (!tipoProduto) {
        grupoModelo.style.display = 'none';
        return;
    }
    
    grupoModelo.style.display = 'block';
    
    // Popular modelos baseado no tipo
    let modelosArray = [];
    
    if (tipoProduto === 'iphone') {
        modelosArray = produtosData.iphones.modelos;
    } else if (tipoProduto === 'mac') {
        modelosArray = produtosData.mac.modelos;
    } else if (tipoProduto === 'ipad') {
        modelosArray = produtosData.ipad.modelos;
    } else if (tipoProduto === 'applewatch') {
        modelosArray = produtosData.applewatch.modelos;
    } else if (tipoProduto === 'audio') {
        modelosArray = produtosData.audio.modelos;
    } else if (tipoProduto === 'acessorios') {
        modelosArray = produtosData.acessorios.modelos;
    } else if (tipoProduto === 'ofertas') {
        modelosArray = produtosData.ofertas.modelos;
    }
    
    modelosArray.forEach(modelo => {
        const option = document.createElement('option');
        option.value = modelo;
        option.textContent = modelo;
        modeloSelect.appendChild(option);
    });
}

function atualizarCapacidadeECor() {
    const tipoProduto = document.getElementById('tipoProduto').value;
    const modelo = document.getElementById('modeloProduto').value;
    const grupoCapacidade = document.getElementById('grupoCapacidade');
    const grupoCor = document.getElementById('grupoCor');
    const capacidadeSelect = document.getElementById('capacidadeProduto');
    const corSelect = document.getElementById('corProduto');
    
    // Limpar
    capacidadeSelect.innerHTML = '<option value="">Selecione a capacidade</option>';
    corSelect.innerHTML = '<option value="">Selecione a cor</option>';
    grupoCapacidade.style.display = 'none';
    grupoCor.style.display = 'none';
    
    if (!modelo) return;
    
    // Verificar quais produtos têm capacidade e cor
    const produtosComVariantes = ['iphone', 'mac', 'ipad'];
    
    if (produtosComVariantes.includes(tipoProduto)) {
        // Mostrar capacidade e cor
        grupoCapacidade.style.display = 'block';
        grupoCor.style.display = 'block';
        
        let capacidadesArray = [];
        let coresArray = [];
        
        if (tipoProduto === 'iphone') {
            capacidadesArray = produtosData.iphones.capacidades;
            coresArray = produtosData.iphones.cores;
        } else if (tipoProduto === 'mac') {
            capacidadesArray = produtosData.mac.capacidades;
            coresArray = produtosData.mac.cores;
        } else if (tipoProduto === 'ipad') {
            capacidadesArray = produtosData.ipad.capacidades;
            coresArray = produtosData.ipad.cores;
        }
        
        // Popular capacidades
        capacidadesArray.forEach(capacidade => {
            const option = document.createElement('option');
            option.value = capacidade;
            option.textContent = capacidade;
            capacidadeSelect.appendChild(option);
        });
        
        // Popular cores
        coresArray.forEach(cor => {
            const option = document.createElement('option');
            option.value = cor;
            option.textContent = cor;
            corSelect.appendChild(option);
        });
    } else {
        // Para outros produtos, não tem capacidade/cor
        grupoCapacidade.style.display = 'none';
        grupoCor.style.display = 'none';
        calcularPrecoFinal();
    }
}

function calcularPrecoFinal() {
    const tipoProduto = document.getElementById('tipoProduto').value;
    const modelo = document.getElementById('modeloProduto').value;
    const capacidade = document.getElementById('capacidadeProduto').value;
    const cor = document.getElementById('corProduto').value;
    const grupoPreco = document.getElementById('grupoPreco');
    const precoFinal = document.getElementById('precoFinal');
    const precoFinalValue = document.getElementById('precoFinalValue');
    const produtoCompleto = document.getElementById('produtoCompleto');
    
    if (!modelo) {
        grupoPreco.style.display = 'none';
        return;
    }
    
    let preco = 0;
    let descricao = modelo;
    
    if (tipoProduto === 'iphone') {
        if (!capacidade || !cor) {
            grupoPreco.style.display = 'none';
            return;
        }
        preco = calcularPrecoiPhone(modelo, capacidade, cor);
        descricao = `${modelo} ${capacidade} ${cor}`;
    } else if (tipoProduto === 'mac') {
        if (!capacidade || !cor) {
            grupoPreco.style.display = 'none';
            return;
        }
        preco = calcularPrecoMac(modelo, capacidade, cor);
        descricao = `${modelo} ${capacidade} ${cor}`;
    } else if (tipoProduto === 'ipad') {
        if (!capacidade || !cor) {
            grupoPreco.style.display = 'none';
            return;
        }
        preco = calcularPrecoiPad(modelo, capacidade, cor);
        descricao = `${modelo} ${capacidade} ${cor}`;
    } else if (tipoProduto === 'applewatch') {
        preco = produtosData.applewatch.precos[modelo] || 0;
        descricao = modelo;
    } else if (tipoProduto === 'audio') {
        preco = produtosData.audio.precos[modelo] || 0;
        descricao = modelo;
    } else if (tipoProduto === 'acessorios') {
        preco = produtosData.acessorios.precos[modelo] || 0;
        descricao = modelo;
    } else if (tipoProduto === 'ofertas') {
        preco = produtosData.ofertas.precos[modelo] || 0;
        descricao = modelo;
    }
    
    if (preco > 0) {
        grupoPreco.style.display = 'block';
        precoFinal.value = `R$ ${preco.toLocaleString('pt-BR')}`;
        precoFinalValue.value = preco;
        produtoCompleto.value = descricao;
    } else {
        grupoPreco.style.display = 'none';
    }
}

// Formulário de pedido - integração com backend
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = orderForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Coletar dados do formulário
        const formData = new FormData(orderForm);
        const tipoProduto = document.getElementById('tipoProduto').value;
        const modelo = document.getElementById('modeloProduto').value;
        const capacidade = document.getElementById('capacidadeProduto').value || '';
        const cor = document.getElementById('corProduto').value || '';
        const produtoCompleto = document.getElementById('produtoCompleto').value;
        const precoFinalValue = document.getElementById('precoFinalValue').value;
        
        // Verificar se precisa de capacidade/cor
        const produtosComVariantes = ['iphone', 'mac', 'ipad'];
        const precisaVariantes = produtosComVariantes.includes(tipoProduto);
        
        if (!tipoProduto || !modelo || !precoFinalValue || !produtoCompleto) {
            alert('Por favor, complete a seleção do produto antes de enviar o pedido!');
            if (!tipoProduto) document.getElementById('tipoProduto').focus();
            else if (!modelo) document.getElementById('modeloProduto').focus();
            else if (precisaVariantes && !capacidade) document.getElementById('capacidadeProduto').focus();
            else if (precisaVariantes && !cor) document.getElementById('corProduto').focus();
            return;
        }
        
        if (precisaVariantes && (!capacidade || !cor)) {
            alert('Por favor, selecione capacidade e cor!');
            if (!capacidade) document.getElementById('capacidadeProduto').focus();
            else document.getElementById('corProduto').focus();
            return;
        }
        
        const produto = produtoCompleto;
        const preco = parseFloat(precoFinalValue);
        const nome = formData.get('nome') || orderForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || orderForm.querySelector('input[type="email"]').value;
        const telefone = formData.get('telefone') || orderForm.querySelector('input[type="tel"]').value;
        
        // Pegar endereço, método de pagamento e mensagem
        const textareas = orderForm.querySelectorAll('textarea');
        const endereco = textareas[0]?.value || '';
        const mensagem = textareas[1]?.value || '';
        const metodo_pagamento = formData.get('metodo_pagamento') || orderForm.querySelector('select[name="metodo_pagamento"]')?.value || '';
        
        // Desabilitar botão
        submitButton.textContent = 'Enviando Pedido...';
        submitButton.disabled = true;
        
        try {
            // Enviar pedido para o backend
            const response = await fetch(`${API_URL}/pedidos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    endereco,
                    produto,
                    modelo: modelo || null,
                    capacidade: capacidade || null,
                    cor: cor || null,
                    preco,
                    metodo_pagamento,
                    mensagem: mensagem || null
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Erro ao enviar pedido');
            }
            
            // Sucesso
            submitButton.textContent = '✓ Pedido Enviado com Sucesso!';
            submitButton.style.background = 'linear-gradient(135deg, #34c759, #30d158)';
            
            // Mostrar confirmação
            mostrarConfirmacao(produto, data.id);
            
            // Resetar formulário
            orderForm.reset();
            
            // Resetar botão após 5 segundos
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 5000);
            
        } catch (error) {
            console.error('Erro ao enviar pedido:', error);
            
            submitButton.textContent = '❌ Erro ao Enviar';
            submitButton.style.background = 'linear-gradient(135deg, #ff3b30, #ff2d55)';
            
            alert(`Erro ao enviar pedido: ${error.message}\n\nVerifique se o servidor está rodando em http://localhost:3000`);
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }
    });
}

// Função para mostrar confirmação
function mostrarConfirmacao(produto, pedidoId) {
    const confirmation = document.createElement('div');
    confirmation.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        text-align: center;
    `;
    confirmation.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
        <h2 style="color: var(--text-dark); margin-bottom: 1rem;">Pedido Enviado!</h2>
        <p style="color: var(--text-light); margin-bottom: 1rem;">
            Seu pedido de <strong>${produto}</strong> foi registrado com sucesso!<br>
            <small>Nº do pedido: #${pedidoId}</small>
        </p>
        <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1.5rem;">
            Nossa equipe entrará em contato em breve.
        </p>
        <button onclick="this.parentElement.remove()" style="
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Fechar</button>
    `;
    document.body.appendChild(confirmation);
    
    // Remover automaticamente após 10 segundos
    setTimeout(() => {
        if (confirmation.parentElement) {
            confirmation.remove();
        }
    }, 10000);
}

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Contador animado para stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('K') ? 'K+' : 
                               element.textContent.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('K') ? 'K+' : 
                                 element.textContent.includes('%') ? '%' : '');
        }
    };
    
    updateCounter();
};

// Observar stats para animação
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statValue = entry.target.querySelector('h3').textContent;
            const numericValue = parseInt(statValue.replace(/\D/g, ''));
            animateCounter(entry.target.querySelector('h3'), numericValue);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Adicionar classe active ao item do menu baseado na posição do scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar estilo para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Formatação de telefone
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            e.target.value = value;
        }
    });
});

// Animação de entrada para cards de produtos
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animação para cards de reviews
document.querySelectorAll('.review-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('🍎 Unique Importados carregada com sucesso!');

