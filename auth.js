// Sistema de Autenticação
class Auth {
    constructor() {
        this.usuario = this.carregarUsuario();
    }
    
    // Carregar usuário do localStorage
    carregarUsuario() {
        try {
            const usuarioSalvo = localStorage.getItem('usuario_logado');
            return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
        } catch (e) {
            console.error('Erro ao carregar usuário:', e);
            return null;
        }
    }
    
    // Salvar usuário no localStorage
    salvarUsuario(usuario) {
        try {
            if (usuario) {
                localStorage.setItem('usuario_logado', JSON.stringify(usuario));
            } else {
                localStorage.removeItem('usuario_logado');
            }
            this.usuario = usuario;
            this.atualizarUI();
        } catch (e) {
            console.error('Erro ao salvar usuário:', e);
        }
    }
    
    // Verificar se está logado
    estaLogado() {
        return this.usuario !== null;
    }
    
    // Atualizar UI de login/logout
    atualizarUI() {
        const loginLink = document.getElementById('login-link');
        const userMenu = document.getElementById('user-menu');
        
        if (this.estaLogado()) {
            if (loginLink) loginLink.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'flex';
                const userName = userMenu.querySelector('.user-name');
                if (userName) userName.textContent = this.usuario.nome.split(' ')[0];
            }
        } else {
            if (loginLink) loginLink.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
    }
    
    // Login
    async login(email, senha) {
        try {
            const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:3000/api'
                : '/api';
            
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.salvarUsuario(data.usuario);
                return { sucesso: true, usuario: data.usuario };
            } else {
                return { sucesso: false, erro: data.error || 'Erro ao fazer login' };
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return { sucesso: false, erro: 'Erro de conexão. Tente novamente.' };
        }
    }
    
    // Cadastro
    async cadastrar(nome, email, senha, telefone, endereco, cep, cidade, estado) {
        try {
            const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:3000/api'
                : '/api';
            
            const response = await fetch(`${API_URL}/auth/cadastro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha, telefone, endereco, cep, cidade, estado })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.salvarUsuario(data.usuario);
                return { sucesso: true, usuario: data.usuario };
            } else {
                return { sucesso: false, erro: data.error || 'Erro ao cadastrar' };
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            return { sucesso: false, erro: 'Erro de conexão. Tente novamente.' };
        }
    }
    
    // Logout
    logout() {
        this.salvarUsuario(null);
        window.location.href = '/';
    }
    
    // Obter token/autorização (se necessário no futuro)
    obterToken() {
        return this.usuario ? this.usuario.token || null : null;
    }
}

// Instância global
const auth = new Auth();

// Atualizar UI quando carregar
document.addEventListener('DOMContentLoaded', () => {
    auth.atualizarUI();
});

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}

