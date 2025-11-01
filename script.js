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

// Fechar menu ao clicar nos botões do menu mobile
document.querySelectorAll('.mobile-carrinho-btn, .mobile-login-btn').forEach(btn => {
    btn.addEventListener('click', () => {
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

// Funções de formatação de pagamento
function formatarCartao(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = valor;
}

function formatarValidade(input) {
    let valor = input.value.replace(/\D/g, '');
    if (valor.length >= 2) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
    }
    input.value = valor;
}

function mostrarCamposPagamento() {
    const metodo = document.getElementById('metodoPagamento').value;
    const camposCartao = document.getElementById('campos-cartao');
    const infoPagamento = document.getElementById('info-pagamento');
    const infoTexto = document.getElementById('info-texto');
    
    if (metodo === 'Cartão de Crédito') {
        camposCartao.style.display = 'block';
        infoPagamento.style.display = 'none';
        
        // Tornar campos obrigatórios
        document.getElementById('numero-cartao').required = true;
        document.getElementById('nome-cartao').required = true;
        document.getElementById('validade-cartao').required = true;
        document.getElementById('cvv-cartao').required = true;
    } else {
        camposCartao.style.display = 'none';
        
        // Remover obrigatoriedade
        document.getElementById('numero-cartao').required = false;
        document.getElementById('nome-cartao').required = false;
        document.getElementById('validade-cartao').required = false;
        document.getElementById('cvv-cartao').required = false;
        
        if (metodo === 'PIX') {
            infoPagamento.style.display = 'block';
            infoTexto.textContent = 'Ao finalizar, você receberá o código PIX para pagamento. A aprovação é instantânea.';
        } else if (metodo === 'Boleto') {
            infoPagamento.style.display = 'block';
            infoTexto.textContent = 'Ao finalizar, você receberá o boleto para pagamento. O pedido será confirmado após a compensação.';
        } else {
            infoPagamento.style.display = 'none';
        }
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
        
        // Validar campos do cartão se necessário
        if (metodo_pagamento === 'Cartão de Crédito') {
            const numeroCartao = document.getElementById('numero-cartao')?.value.replace(/\s/g, '');
            const nomeCartao = document.getElementById('nome-cartao')?.value;
            const validadeCartao = document.getElementById('validade-cartao')?.value;
            const cvvCartao = document.getElementById('cvv-cartao')?.value;
            
            if (!numeroCartao || numeroCartao.length < 13 || !nomeCartao || !validadeCartao || !cvvCartao) {
                alert('Por favor, preencha todos os dados do cartão!');
                return;
            }
        }
        
        // Desabilitar botão
        submitButton.textContent = 'Processando Pagamento...';
        submitButton.disabled = true;
        
        try {
            // Processar pagamento se necessário (antes de criar pedido)
            let resultadoPagamento = null;
            if (metodo_pagamento && typeof pagamento !== 'undefined') {
                if (metodo_pagamento === 'Cartão de Crédito') {
                    const numeroCartao = document.getElementById('numero-cartao')?.value.replace(/\s/g, '');
                    const nomeCartao = document.getElementById('nome-cartao')?.value;
                    const validadeCartao = document.getElementById('validade-cartao')?.value;
                    const cvvCartao = document.getElementById('cvv-cartao')?.value;
                    const parcelas = document.getElementById('parcelas-cartao')?.value || 1;
                    
                    resultadoPagamento = await pagamento.processarPagamento({
                        metodo: metodo_pagamento,
                        valor: preco,
                        numero: numeroCartao,
                        nome: nomeCartao,
                        cvv: cvvCartao,
                        validade: validadeCartao,
                        parcelas: parcelas,
                        dadosCliente: { nome, email }
                    });
                    
                    if (!resultadoPagamento.sucesso) {
                        throw new Error(resultadoPagamento.erro || 'Pagamento não aprovado');
                    }
                } else if (metodo_pagamento === 'PIX') {
                    resultadoPagamento = await pagamento.processarPagamento({
                        metodo: 'PIX',
                        valor: preco,
                        pedidoId: null
                    });
                } else if (metodo_pagamento === 'Boleto') {
                    resultadoPagamento = await pagamento.processarPagamento({
                        metodo: 'Boleto',
                        valor: preco,
                        pedidoId: null
                    });
                }
            }
            
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
                    mensagem: mensagem || null,
                    status_pagamento: resultadoPagamento?.sucesso ? (metodo_pagamento === 'PIX' ? 'pago' : 'processando') : 'pendente'
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Erro ao enviar pedido');
            }
            
            // Mostrar informações de pagamento se aplicável
            if (resultadoPagamento && metodo_pagamento === 'PIX') {
                mostrarInfoPIX(resultadoPagamento, data.id);
            } else if (resultadoPagamento && metodo_pagamento === 'Boleto') {
                mostrarInfoBoleto(resultadoPagamento, data.id);
            }
            
            // Sucesso
            submitButton.textContent = '✓ Pedido Enviado com Sucesso!';
            submitButton.style.background = 'linear-gradient(135deg, #34c759, #30d158)';
            
            // Mostrar confirmação
            mostrarConfirmacao(produto, data.id);
            
            // Resetar formulário
            orderForm.reset();
            document.getElementById('campos-cartao').style.display = 'none';
            document.getElementById('info-pagamento').style.display = 'none';
            
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
            Seu pedido foi confirmado e será processado em breve.
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

// ============ CARROSSEL MAIS VENDIDOS ============
let currentCarouselIndex = 0;
const itemsPerView = 4;

function inicializarCarrossel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.getElementById('carouselDots');
    
    if (!track || !maisVendidos) return;
    
    // Limpar conteúdo
    track.innerHTML = '';
    dots.innerHTML = '';
    
    // Criar cards dos produtos
    maisVendidos.forEach((produto, index) => {
        const card = criarCardProduto(produto, index);
        track.appendChild(card);
    });
    
    // Criar dots de navegação
    const totalSlides = Math.ceil(maisVendidos.length / itemsPerView);
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => irParaSlide(i);
        dots.appendChild(dot);
    }
    
    atualizarCarrossel();
}

function criarCardProduto(produto, index) {
    const card = document.createElement('div');
    card.className = 'product-carousel-card';
    card.onclick = () => {
        // Preencher formulário com este produto
        document.getElementById('tipoProduto').value = 'iphone';
        atualizarSelecoesProduto();
        setTimeout(() => {
            document.getElementById('modeloProduto').value = produto.modelo;
            atualizarCapacidadeECor();
            setTimeout(() => {
                document.getElementById('capacidadeProduto').value = produto.capacidade;
                document.getElementById('corProduto').value = produto.cor;
                calcularPrecoFinal();
                document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }, 100);
    };
    
    const starsHTML = gerarEstrelas(produto.avaliacao);
    
    card.innerHTML = `
        <div class="product-image-container">
            ${produto.desconto > 0 ? `<div class="discount-badge">-${produto.desconto}%</div>` : ''}
            <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'280\\' height=\\'280\\'%3E%3Crect fill=\\'%23f5f5f7\\' width=\\'280\\' height=\\'280\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%2386868b\\' font-size=\\'18\\'%3E📱 iPhone%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="product-name-carousel">${produto.nome}</div>
        <div class="product-rating">${starsHTML}</div>
        <div class="product-price-carousel">
            ${produto.precoOriginal > produto.precoAtual ? 
                `<span class="price-old-carousel">R$ ${produto.precoOriginal.toLocaleString('pt-BR')}</span>` : ''}
            <span class="price-new-carousel">R$ ${produto.precoAtual.toLocaleString('pt-BR')}</span>
        </div>
        <div class="product-installment-carousel">ou ${produto.parcelas}x de R$ ${produto.valorParcela.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
    `;
    
    return card;
}

function gerarEstrelas(avaliacao) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= avaliacao) {
            html += '<span class="star filled">★</span>';
        } else {
            html += '<span class="star">☆</span>';
        }
    }
    return html;
}

function moverCarrossel(direcao) {
    const totalSlides = Math.ceil(maisVendidos.length / itemsPerView);
    
    if (direcao === 'next') {
        currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
    } else {
        currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
    }
    
    atualizarCarrossel();
}

function irParaSlide(index) {
    currentCarouselIndex = index;
    atualizarCarrossel();
}

function atualizarCarrossel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track) return;
    
    // Calcular posição baseado no card width + gap
    const cardWidth = 280; // min-width do card
    const gap = 32; // 2rem = 32px
    const translateX = -(currentCarouselIndex * (cardWidth + gap) * itemsPerView);
    track.style.transform = `translateX(${translateX}px)`;
    
    // Atualizar dots
    dots.forEach((dot, index) => {
        if (index === currentCarouselIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Inicializar carrossel quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        inicializarCarrossel();
    });
} else {
    inicializarCarrossel();
}

// Suporte a touch/swipe no carrossel
let touchStartX = 0;
let touchEndX = 0;

const carouselWrapper = document.querySelector('.carousel-wrapper');
if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            moverCarrossel('next');
        } else {
            moverCarrossel('prev');
        }
    }
}

// Verificar se veio do catálogo com produto pré-selecionado
function verificarPreSelecaoCatalogo() {
    const urlParams = new URLSearchParams(window.location.search);
    let categoria = urlParams.get('categoria');
    const modelo = urlParams.get('modelo');
    const capacidade = urlParams.get('capacidade');
    const cor = urlParams.get('cor');
    const preco = urlParams.get('preco');
    
    if (categoria && modelo) {
        // Converter categoria da URL para o formato do formulário (singular)
        // O formulário usa 'iphone', mas produtosData usa 'iphones'
        // Mas o formulário já usa singular, então está correto
        if (categoria === 'iphones') {
            categoria = 'iphone'; // Converter para o formato do formulário
        }
        
        // Preencher formulário automaticamente
        setTimeout(() => {
            if (document.getElementById('tipoProduto')) {
                document.getElementById('tipoProduto').value = categoria;
                atualizarSelecoesProduto();
                
                setTimeout(() => {
                    if (modelo && document.getElementById('modeloProduto')) {
                        document.getElementById('modeloProduto').value = modelo;
                        atualizarCapacidadeECor();
                        
                        setTimeout(() => {
                            if (capacidade && document.getElementById('capacidadeProduto')) {
                                document.getElementById('capacidadeProduto').value = capacidade;
                            }
                            if (cor && document.getElementById('corProduto')) {
                                document.getElementById('corProduto').value = cor;
                            }
                            calcularPrecoFinal();
                            
                            // Scroll até o formulário
                            const contatoSection = document.getElementById('contato');
                            if (contatoSection) {
                                setTimeout(() => {
                                    contatoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }, 300);
                            }
                        }, 200);
                    }
                }, 200);
            }
        }, 100);
    }
}

// Verificar se veio do carrinho (checkout)
function verificarCheckoutCarrinho() {
    const urlParams = new URLSearchParams(window.location.search);
    const isCheckout = urlParams.get('checkout') === 'true';
    
    if (isCheckout) {
        // Carregar itens do carrinho e mostrar resumo
        const checkoutItens = localStorage.getItem('checkoutItens');
        if (checkoutItens) {
            try {
                const itens = JSON.parse(checkoutItens);
                if (itens.length > 0) {
                    mostrarResumoCarrinho(itens);
                }
            } catch (e) {
                console.error('Erro ao carregar itens do checkout:', e);
            }
        }
    }
}

// Mostrar resumo do carrinho no formulário
function mostrarResumoCarrinho(itens) {
    const sectionHeader = document.querySelector('#contato .section-header');
    if (!sectionHeader) return;
    
    const total = itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const quantidadeTotal = itens.reduce((sum, item) => sum + item.quantidade, 0);
    
    // Criar elemento de resumo
    const resumoDiv = document.createElement('div');
    resumoDiv.id = 'resumo-carrinho';
    resumoDiv.style.cssText = `
        background: var(--bg-white);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: var(--shadow-md);
    `;
    
    let resumoHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Resumo do Pedido (${quantidadeTotal} ${quantidadeTotal === 1 ? 'item' : 'itens'})</h3>
        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
    `;
    
    itens.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        resumoHTML += `
            <div style="padding: 0.75rem 0; border-bottom: ${index < itens.length - 1 ? '1px solid var(--border-color)' : 'none'};">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <strong style="color: var(--text-dark);">${item.nome}</strong>
                        <div style="font-size: 0.9rem; color: var(--text-light);">
                            ${item.capacidade ? `Capacidade: ${item.capacidade}` : ''}
                            ${item.cor ? (item.capacidade ? ' • ' : '') + `Cor: ${item.cor}` : ''}
                            ${item.quantidade > 1 ? ` • Quantidade: ${item.quantidade}` : ''}
                        </div>
                    </div>
                    <strong style="color: var(--primary-color); margin-left: 1rem;">R$ ${subtotal.toLocaleString('pt-BR')}</strong>
                </div>
            </div>
        `;
    });
    
    // Carregar dados extras do checkout
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}');
    const cupom = checkoutData.cupom || null;
    const frete = checkoutData.frete || 0;
    
    // Calcular desconto
    let desconto = 0;
    if (cupom) {
        if (cupom.tipo === 'percentual') {
            desconto = total * (cupom.valor / 100);
        } else {
            desconto = cupom.valor;
        }
    }
    
    const totalFinal = total - desconto + frete;
    
    resumoHTML += `
        ${desconto > 0 ? `
        <div style="display: flex; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            <span style="color: var(--text-light);">Desconto (${cupom ? cupom.codigo : ''}):</span>
            <span style="color: #3c3; font-weight: 600;">-R$ ${desconto.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
        </div>
        ` : ''}
        ${frete > 0 ? `
        <div style="display: flex; justify-content: space-between; padding-top: 0.5rem;">
            <span style="color: var(--text-light);">Frete:</span>
            <span style="color: var(--text-dark); font-weight: 600;">R$ ${frete.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
        </div>
        ` : ''}
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 1rem; border-top: 2px solid var(--border-color);">
            <strong style="font-size: 1.3rem; color: var(--text-dark);">Total:</strong>
            <strong style="font-size: 1.8rem; color: var(--primary-color);">R$ ${totalFinal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>
        </div>
    `;
    
    resumoDiv.innerHTML = resumoHTML;
    
    // Inserir antes do formulário
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        contactContent.insertBefore(resumoDiv, contactContent.firstChild);
    }
    
    // Esconder campos de produto do formulário quando vier do carrinho
    const tipoProduto = document.getElementById('tipoProduto');
    if (tipoProduto) {
        tipoProduto.closest('.form-group').style.display = 'none';
        document.getElementById('grupoModelo').style.display = 'none';
        document.getElementById('grupoCapacidade').style.display = 'none';
        document.getElementById('grupoCor').style.display = 'none';
        document.getElementById('grupoPreco').style.display = 'none';
    }
    
    // Modificar o submit para processar todos os itens
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        const originalSubmit = orderForm.onsubmit;
        orderForm.onsubmit = null;
        
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Processar todos os itens do carrinho
            await processarPedidosDoCarrinho(itens, orderForm);
        });
    }
}

// Processar múltiplos pedidos do carrinho
async function processarPedidosDoCarrinho(itens, form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Carregar dados do checkout (cupom, frete, etc)
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData') || '{}');
    const cupom = checkoutData.cupom || null;
    const frete = checkoutData.frete || 0;
    const cepEntrega = checkoutData.cep || null;
    
    // Coletar dados do formulário
    const formData = new FormData(form);
    const nome = formData.get('nome') || form.querySelector('input[name="nome"]')?.value;
    const email = formData.get('email') || form.querySelector('input[name="email"]')?.value;
    const telefone = formData.get('telefone') || form.querySelector('input[name="telefone"]')?.value;
    const endereco = formData.get('endereco') || form.querySelector('textarea[name="endereco"]')?.value;
    const metodo_pagamento = formData.get('metodo_pagamento') || form.querySelector('select[name="metodo_pagamento"]')?.value;
    const mensagem = formData.get('mensagem') || form.querySelector('textarea[name="mensagem"]')?.value;
    
    if (!nome || !email || !telefone || !endereco) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    submitButton.textContent = 'Processando Pedidos...';
    submitButton.disabled = true;
    
    try {
        const pedidosIds = [];
        
        // Calcular desconto total
        let descontoTotal = 0;
        if (cupom) {
            const subtotal = itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
            if (cupom.tipo === 'percentual') {
                descontoTotal = subtotal * (cupom.valor / 100);
            } else {
                descontoTotal = cupom.valor;
            }
        }
        
        // Calcular desconto por item (proporcional)
        const subtotal = itens.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        const descontoPorItem = descontoTotal / subtotal;
        
        // Calcular frete por item (proporcional)
        const fretePorItem = frete / itens.length;
        
        // Criar um pedido para cada item do carrinho
        for (const item of itens) {
            const itemSubtotal = item.preco * item.quantidade;
            const itemDesconto = itemSubtotal * descontoPorItem;
            const itemFrete = fretePorItem;
            const itemTotal = itemSubtotal - itemDesconto + itemFrete;
            
            for (let i = 0; i < item.quantidade; i++) {
                // Dividir desconto e frete proporcionalmente por quantidade
                const descontoUnitario = itemDesconto / item.quantidade;
                const freteUnitario = itemFrete / item.quantidade;
                const totalUnitario = item.preco - descontoUnitario + freteUnitario;
                
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
                        produto: item.nome,
                        modelo: item.modelo || null,
                        capacidade: item.capacidade || null,
                        cor: item.cor || null,
                        preco: item.preco,
                        desconto: descontoUnitario,
                        frete: freteUnitario,
                        total: totalUnitario,
                        metodo_pagamento: metodo_pagamento || null,
                        mensagem: mensagem || null,
                        cupom_usado: cupom ? cupom.codigo : null,
                        cep_entrega: cepEntrega,
                        status_pagamento: 'pendente'
                    })
                });
                
                const data = await response.json();
                if (response.ok) {
                    pedidosIds.push(data.id);
                }
            }
        }
        
        // Sucesso - limpar carrinho e dados
        if (typeof carrinho !== 'undefined') {
            carrinho.limpar();
        }
        localStorage.removeItem('checkoutItens');
        localStorage.removeItem('checkoutData');
        
        submitButton.textContent = '✓ Pedidos Confirmados!';
        submitButton.style.background = 'linear-gradient(135deg, #34c759, #30d158)';
        
        mostrarConfirmacao(`${itens.length} ${itens.length === 1 ? 'produto' : 'produtos'}`, pedidosIds[0]);
        
        form.reset();
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            window.location.href = '/';
        }, 3000);
        
    } catch (error) {
        console.error('Erro ao processar pedidos:', error);
        alert(`Erro ao processar pedidos: ${error.message}`);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Executar quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        verificarPreSelecaoCatalogo();
        verificarCheckoutCarrinho();
    });
} else {
    verificarPreSelecaoCatalogo();
    verificarCheckoutCarrinho();
}

// Mostrar informações do PIX
function mostrarInfoPIX(dados, pedidoId) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 500px; width: 100%;">
            <h2 style="margin-bottom: 1rem; color: var(--text-dark);">Código PIX</h2>
            <p style="color: var(--text-light); margin-bottom: 1rem;">Escaneie o QR Code ou copie o código:</p>
            <div style="text-align: center; margin: 1.5rem 0; padding: 1rem; background: #f5f5f7; border-radius: 8px;">
                <img src="${dados.qr_code}" alt="QR Code PIX" style="max-width: 250px;">
            </div>
            <div style="background: #f5f5f7; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <input type="text" value="${dados.codigo_pix}" id="codigo-pix" readonly style="width: 100%; padding: 0.5rem; border: none; background: transparent; font-family: monospace; font-size: 0.85rem;">
            </div>
            <button onclick="copiarPIX(); this.textContent='✓ Copiado!'" style="width: 100%; padding: 0.75rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; margin-bottom: 0.5rem;">
                Copiar Código PIX
            </button>
            <button onclick="this.closest('div').parentElement.remove()" style="width: 100%; padding: 0.75rem; background: transparent; color: var(--text-dark); border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer;">
                Fechar
            </button>
            <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: var(--text-light);">
                Vencimento: ${new Date(dados.vencimento).toLocaleString('pt-BR')}
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Copiar PIX
    window.copiarPIX = function() {
        const input = document.getElementById('codigo-pix');
        input.select();
        document.execCommand('copy');
    };
}

// Mostrar informações do Boleto
function mostrarInfoBoleto(dados, pedidoId) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 500px; width: 100%;">
            <h2 style="margin-bottom: 1rem; color: var(--text-dark);">Boleto Bancário</h2>
            <p style="color: var(--text-light); margin-bottom: 1.5rem;">Seu boleto foi gerado:</p>
            <div style="background: #f5f5f7; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
                <div style="font-family: monospace; font-size: 1.2rem; font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">
                    ${dados.codigo_barras}
                </div>
                <button onclick="copiarBoleto(); this.textContent='✓ Copiado!'" style="padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">
                    Copiar Código de Barras
                </button>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 1rem;">
                <strong>Vencimento:</strong> ${new Date(dados.vencimento).toLocaleDateString('pt-BR')}
            </p>
            <button onclick="window.open('#', '_blank')" style="width: 100%; padding: 0.75rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; margin-bottom: 0.5rem;">
                Imprimir Boleto
            </button>
            <button onclick="this.closest('div').parentElement.remove()" style="width: 100%; padding: 0.75rem; background: transparent; color: var(--text-dark); border: 2px solid var(--border-color); border-radius: 8px; cursor: pointer;">
                Fechar
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    window.copiarBoleto = function() {
        navigator.clipboard.writeText(dados.codigo_barras);
    };
}

console.log('🍎 Unique Importados carregada com sucesso!');

