// Base de dados completa de produtos Apple
// Modelos, capacidades, cores e preços base

const produtosData = {
    iphones: {
        // Modelos de iPhone disponíveis
        modelos: [
            'iPhone 11 Pro',
            'iPhone 13',
            'iPhone 13 Pro Max',
            'iPhone 14',
            'iPhone 14 Plus',
            'iPhone 15',
            'iPhone 15 Plus',
            'iPhone 15 Pro',
            'iPhone 15 Pro Max',
            'iPhone 16',
            'iPhone 16 Plus',
            'iPhone 16 Pro',
            'iPhone 16 Pro Max',
            'iPhone 16e',
            'iPhone 17',
            'iPhone 17 Pro',
            'iPhone 17 Pro Max',
            'iPhone Air',
            'iPhone SE (3ª geração)'
        ],
        
        // Capacidades disponíveis
        capacidades: ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'],
        
        // Cores disponíveis
        cores: [
            'Amarelo',
            'Azul',
            'Azul-céu',
            'Azul-Intenso',
            'Azul-névoa',
            'Azul-Sierra',
            'Branco',
            'Branco-nuvem',
            'Cinza Espacial',
            'Dourado-claro',
            'Estelar',
            'Laranja-cósmico',
            'Lavanda',
            'Meia-Noite',
            'Prateado',
            'Preto',
            'Preto-espacial',
            'Rosa',
            'Roxo',
            'Sálvia',
            'Titânio azul',
            'Titânio branco',
            'Titânio natural',
            'Titânio preto',
            'Titânio-deserto',
            'Ultramarino',
            'Verde',
            'Verde-acinzentado',
            'Verde-alpino',
            'Vermelho'
        ],
        
        // Preços base por modelo (128GB como referência)
        precosBase: {
            'iPhone 11 Pro': 4499,
            'iPhone 13': 5499,
            'iPhone 13 Pro Max': 6999,
            'iPhone 14': 5999,
            'iPhone 14 Plus': 6499,
            'iPhone 15': 6999,
            'iPhone 15 Plus': 7499,
            'iPhone 15 Pro': 8499,
            'iPhone 15 Pro Max': 9999,
            'iPhone 16': 7999,
            'iPhone 16 Plus': 8499,
            'iPhone 16 Pro': 9499,
            'iPhone 16 Pro Max': 10999,
            'iPhone 16e': 5999,
            'iPhone 17': 8999,
            'iPhone 17 Pro': 10499,
            'iPhone 17 Pro Max': 11999,
            'iPhone Air': 5499,
            'iPhone SE (3ª geração)': 3499
        },
        
        // Multiplicadores de preço por capacidade
        multiplicadorCapacidade: {
            '64GB': 0.9,
            '128GB': 1.0,
            '256GB': 1.2,
            '512GB': 1.5,
            '1TB': 1.9,
            '2TB': 2.5
        }
    },
    
    applewatch: {
        modelos: [
            'Apple Watch SE',
            'Apple Watch Series 8',
            'Apple Watch Series 9',
            'Apple Watch Ultra'
        ],
        precos: {
            'Apple Watch SE': 1999,
            'Apple Watch Series 8': 2999,
            'Apple Watch Series 9': 3999,
            'Apple Watch Ultra': 5999
        }
    },
    
    mac: {
        modelos: [
            'MacBook Air M1',
            'MacBook Air M2',
            'MacBook Air M3',
            'MacBook Pro 13" M2',
            'MacBook Pro 14" M3',
            'MacBook Pro 16" M3',
            'MacBook Pro 14" M3 Pro',
            'MacBook Pro 16" M3 Pro',
            'MacBook Pro 14" M3 Max',
            'MacBook Pro 16" M3 Max',
            'iMac 24" M1',
            'iMac 24" M3',
            'Mac mini M2',
            'Mac mini M4',
            'Mac Studio M2 Ultra',
            'Mac Pro'
        ],
        capacidades: ['256GB', '512GB', '1TB', '2TB', '4TB', '8TB'],
        cores: [
            'Prata',
            'Cinza Espacial',
            'Dourado',
            'Azul',
            'Rosa',
            'Verde',
            'Roxo',
            'Amarelo',
            'Laranja'
        ],
        precosBase: {
            'MacBook Air M1': 7999,
            'MacBook Air M2': 8999,
            'MacBook Air M3': 9999,
            'MacBook Pro 13" M2': 11999,
            'MacBook Pro 14" M3': 14999,
            'MacBook Pro 16" M3': 17999,
            'MacBook Pro 14" M3 Pro': 19999,
            'MacBook Pro 16" M3 Pro': 22999,
            'MacBook Pro 14" M3 Max': 24999,
            'MacBook Pro 16" M3 Max': 27999,
            'iMac 24" M1': 12999,
            'iMac 24" M3': 14999,
            'Mac mini M2': 5999,
            'Mac mini M4': 6999,
            'Mac Studio M2 Ultra': 39999,
            'Mac Pro': 59999
        },
        multiplicadorCapacidade: {
            '256GB': 1.0,
            '512GB': 1.3,
            '1TB': 1.7,
            '2TB': 2.2,
            '4TB': 3.0,
            '8TB': 4.5
        }
    },
    
    ipad: {
        modelos: [
            'iPad (10ª geração)',
            'iPad (9ª geração)',
            'iPad Air M1',
            'iPad Air M2',
            'iPad Pro 11" M2',
            'iPad Pro 12.9" M2',
            'iPad Pro 11" M4',
            'iPad Pro 13" M4',
            'iPad mini (6ª geração)'
        ],
        capacidades: ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'],
        cores: [
            'Prata',
            'Cinza Espacial',
            'Rosa',
            'Azul',
            'Roxo',
            'Amarelo',
            'Verde',
            'Estelar',
            'Meia-Noite'
        ],
        precosBase: {
            'iPad (10ª geração)': 3999,
            'iPad (9ª geração)': 3499,
            'iPad Air M1': 5999,
            'iPad Air M2': 6999,
            'iPad Pro 11" M2': 8999,
            'iPad Pro 12.9" M2': 11999,
            'iPad Pro 11" M4': 9999,
            'iPad Pro 13" M4': 12999,
            'iPad mini (6ª geração)': 4999
        },
        multiplicadorCapacidade: {
            '64GB': 1.0,
            '128GB': 1.2,
            '256GB': 1.5,
            '512GB': 1.9,
            '1TB': 2.5,
            '2TB': 3.5
        }
    },
    
    audio: {
        modelos: [
            'AirPods (2ª geração)',
            'AirPods (3ª geração)',
            'AirPods Pro (2ª geração)',
            'AirPods Max',
            'Beats Fit Pro',
            'Beats Studio Pro',
            'Beats Studio Buds',
            'HomePod mini',
            'HomePod (2ª geração)'
        ],
        precos: {
            'AirPods (2ª geração)': 999,
            'AirPods (3ª geração)': 1499,
            'AirPods Pro (2ª geração)': 1999,
            'AirPods Max': 4999,
            'Beats Fit Pro': 1699,
            'Beats Studio Pro': 2499,
            'Beats Studio Buds': 899,
            'HomePod mini': 999,
            'HomePod (2ª geração)': 2499
        }
    },
    
    acessorios: {
        modelos: [
            'Apple Pencil (1ª geração)',
            'Apple Pencil (2ª geração)',
            'Apple Pencil USB-C',
            'Magic Mouse',
            'Magic Trackpad',
            'Magic Keyboard',
            'Magic Keyboard com Touch ID',
            'Magic Keyboard para iPad',
            'Carregador MagSafe',
            'Carregador MagSafe Duo',
            'Carregador MagSafe Battery Pack',
            'Cabo Lightning para USB-C',
            'Cabo USB-C para Lightning',
            'Adaptador Lightning para P2',
            'Capa de Silicone iPhone',
            'Capa de Couro iPhone',
            'Capa Clear iPhone',
            'Protetor de Tela',
            'AirTag',
            'AirTag Pack de 4'
        ],
        precos: {
            'Apple Pencil (1ª geração)': 899,
            'Apple Pencil (2ª geração)': 1299,
            'Apple Pencil USB-C': 699,
            'Magic Mouse': 699,
            'Magic Trackpad': 999,
            'Magic Keyboard': 1299,
            'Magic Keyboard com Touch ID': 1799,
            'Magic Keyboard para iPad': 1499,
            'Carregador MagSafe': 399,
            'Carregador MagSafe Duo': 1199,
            'Carregador MagSafe Battery Pack': 899,
            'Cabo Lightning para USB-C': 149,
            'Cabo USB-C para Lightning': 149,
            'Adaptador Lightning para P2': 89,
            'Capa de Silicone iPhone': 399,
            'Capa de Couro iPhone': 599,
            'Capa Clear iPhone': 349,
            'Protetor de Tela': 199,
            'AirTag': 349,
            'AirTag Pack de 4': 1199
        }
    },
    
    ofertas: {
        modelos: [
            'iPhone 14 128GB - Promoção',
            'iPhone 15 256GB - Oferta Especial',
            'MacBook Air M2 - Black Friday',
            'iPad Air M1 - Liquidação',
            'AirPods Pro - Combo Especial',
            'Apple Watch SE - Promoção',
            'Kit iPhone + AirPods',
            'Kit iPad + Apple Pencil',
            'Kit Mac + Magic Mouse'
        ],
        precos: {
            'iPhone 14 128GB - Promoção': 4999,
            'iPhone 15 256GB - Oferta Especial': 6499,
            'MacBook Air M2 - Black Friday': 7499,
            'iPad Air M1 - Liquidação': 4999,
            'AirPods Pro - Combo Especial': 1699,
            'Apple Watch SE - Promoção': 1499,
            'Kit iPhone + AirPods': 7999,
            'Kit iPad + Apple Pencil': 8999,
            'Kit Mac + Magic Mouse': 11999
        }
    }
};

// Função para calcular preço do iPhone baseado em modelo, capacidade e cor
function calcularPrecoiPhone(modelo, capacidade, cor) {
    const precoBase = produtosData.iphones.precosBase[modelo];
    if (!precoBase) return 0;
    
    const multiplicador = produtosData.iphones.multiplicadorCapacidade[capacidade] || 1.0;
    const preco = Math.round(precoBase * multiplicador);
    
    // Algumas cores especiais podem ter acréscimo (opcional)
    const coresEspeciais = ['Titânio azul', 'Titânio branco', 'Titânio natural', 'Titânio preto', 'Titânio-deserto'];
    if (coresEspeciais.includes(cor)) {
        return Math.round(preco * 1.1); // +10% para versões titânio
    }
    
    return preco;
}

// Função para calcular preço do Mac baseado em modelo, capacidade e cor
function calcularPrecoMac(modelo, capacidade, cor) {
    const precoBase = produtosData.mac.precosBase[modelo];
    if (!precoBase) return 0;
    
    const multiplicador = produtosData.mac.multiplicadorCapacidade[capacidade] || 1.0;
    return Math.round(precoBase * multiplicador);
}

// Função para calcular preço do iPad baseado em modelo, capacidade e cor
function calcularPrecoiPad(modelo, capacidade, cor) {
    const precoBase = produtosData.ipad.precosBase[modelo];
    if (!precoBase) return 0;
    
    const multiplicador = produtosData.ipad.multiplicadorCapacidade[capacidade] || 1.0;
    return Math.round(precoBase * multiplicador);
}

// Função para obter todas as combinações disponíveis de um modelo
function obterCombinaçõesDisponiveis(modelo) {
    if (!produtosData.iphones.modelos.includes(modelo)) return [];
    
    const combinacoes = [];
    produtosData.iphones.capacidades.forEach(capacidade => {
        produtosData.iphones.cores.forEach(cor => {
            const preco = calcularPrecoiPhone(modelo, capacidade, cor);
            combinacoes.push({
                modelo,
                capacidade,
                cor,
                preco
            });
        });
    });
    return combinacoes;
}

