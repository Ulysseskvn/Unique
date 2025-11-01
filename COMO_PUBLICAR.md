# 🌐 GUIA COMPLETO: Como Colocar seu Site no Ar

Este guia vai te ensinar **passo a passo** como publicar seu site no Vercel usando o GitHub. É **gratuito** e leva cerca de 10 minutos!

---

## 📋 O QUE VOCÊ VAI PRECISAR

1. Conta no GitHub (gratuita)
2. Conta no Vercel (gratuita)
3. Todos os arquivos do seu projeto

---

## 🚀 PARTE 1: CRIAR REPOSITÓRIO NO GITHUB

### Passo 1: Criar Conta no GitHub

1. Acesse: **https://github.com**
2. Clique em **"Sign up"** (Criar conta)
3. Preencha: nome de usuário, email e senha
4. Confirme seu email

### Passo 2: Criar Novo Repositório

1. No GitHub, clique no **"+"** no canto superior direito
2. Escolha **"New repository"** (Novo repositório)

3. Configure assim:
   - **Repository name**: `unique-importados` (ou o nome que quiser)
   - **Description**: (opcional) "Landing page Unique Importados"
   - **Public**: ✅ Marque como público (gratuito)
   - **NÃO marque** "Add a README file"
   - **NÃO marque** "Add .gitignore"
   - **NÃO escolha** nenhuma licença

4. Clique em **"Create repository"**

### Passo 3: Fazer Upload dos Arquivos

**OPÇÃO A - Pela Interface Web do GitHub (Mais Fácil):**

1. Na página do repositório criado, você verá instruções
2. Clique na opção **"uploading an existing file"**
3. Arraste **TODOS os arquivos** da pasta do seu projeto:
   - ✅ index.html
   - ✅ admin.html
   - ✅ styles.css
   - ✅ admin.css
   - ✅ script.js
   - ✅ admin.js
   - ✅ server.js
   - ✅ package.json
   - ✅ vercel.json
   - ✅ README.md (opcional)
   - ✅ Pasta `api/` (com o arquivo index.js dentro)

4. **IMPORTANTE**: Arrume a pasta `api`:
   - Clique em "Add file" > "Create new file"
   - Nome do arquivo: `api/index.js`
   - Cole o conteúdo do arquivo `api/index.js` do seu projeto
   - Clique em "Commit new file"

5. No final da página, clique em **"Commit changes"** (botão verde)

**OPÇÃO B - Pelo GitHub Desktop (Recomendado):**

1. Baixe o GitHub Desktop: **https://desktop.github.com**
2. Instale e faça login
3. Clique em **"File" > "Add Local Repository"**
4. Clique em **"Choose..."** e selecione a pasta do seu projeto
5. Se aparecer "This directory does not appear to be a Git repository", clique em **"create a repository"**
6. Escolha o repositório remoto que você criou
7. Escreva uma mensagem: "Primeira versão do site"
8. Clique em **"Commit to main"**
9. Clique em **"Push origin"** (ou "Publish repository")

### Passo 4: Verificar se Está Tudo Lá

1. Volte ao GitHub no navegador
2. Acesse seu repositório
3. Verifique se você vê todos os arquivos:
   - index.html
   - admin.html
   - styles.css
   - admin.css
   - script.js
   - admin.js
   - server.js
   - package.json
   - vercel.json
   - Pasta `api/` com `index.js` dentro

✅ **Se tudo estiver lá, vá para a PARTE 2!**

---

## 🌐 PARTE 2: PUBLICAR NO VERCEL

### Passo 1: Criar Conta no Vercel

1. Acesse: **https://vercel.com**
2. Clique em **"Sign Up"** (Criar conta)
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar seu GitHub

### Passo 2: Importar Projeto

1. No dashboard do Vercel, clique em **"Add New..."** ou **"New Project"**
2. Você verá a lista dos seus repositórios do GitHub
3. Encontre o repositório que você acabou de criar (ex: `unique-importados`)
4. Clique em **"Import"** ao lado do repositório

### Passo 3: Configurar o Projeto

Na tela de configuração, configure **EXATAMENTE** assim:

1. **Project Name**: 
   - Deixe o nome padrão ou mude se quiser
   - Exemplo: `unique-importados`

2. **Framework Preset**: 
   - Se aparecer **"Express"** automaticamente, **DEIXE ASSIM!** ✅
   - Se aparecer outra coisa, mude para **"Other"** ou **"None"**
   - O Vercel pode detectar Express automaticamente porque seu projeto usa Express


3. **Root Directory**: 
   - Deixe **VAZIO** (ou coloque um ponto `.`)

4. **Build and Output Settings**:
   - **Build Command**: Deixe **COMPLETAMENTE VAZIO**
   - **Output Directory**: Deixe **COMPLETAMENTE VAZIO**
   - **Install Command**: `npm install` (ou deixe padrão)

5. **Environment Variables** (Variáveis de Ambiente):
   - Deixe **VAZIO** por enquanto
   - Você pode adicionar depois se precisar

### Passo 4: Fazer Deploy

1. Clique no botão azul grande **"Deploy"**
2. Aguarde o processo (leva 1-3 minutos)
3. Você verá uma barra de progresso
4. Quando terminar, aparecerá **"Congratulations"** ou **"Deployment Complete"**

### Passo 5: Obter o Link

1. Após o deploy, você verá uma tela com o link do seu site
2. O link será algo como: `https://unique-importados.vercel.app`
3. **Anote esse link!** Esse é o link que você vai compartilhar!

---

## ✅ VERIFICAR SE FUNCIONOU

1. Clique no link fornecido pelo Vercel
2. Você deve ver a landing page da Unique Importados
3. Teste também:
   - `https://seu-projeto.vercel.app/admin.html` (painel admin)

Se aparecer **erro 404**, veja a seção de solução de problemas abaixo.

---

## 🔄 ATUALIZAR O SITE NO FUTURO

Sempre que você quiser atualizar o site:

1. Edite os arquivos no seu computador
2. No GitHub Desktop:
   - Veja as mudanças
   - Escreva uma mensagem (ex: "Atualizei os preços")
   - Clique em "Commit to main"
   - Clique em "Push origin"
3. O Vercel vai detectar automaticamente e fazer deploy sozinho!
4. Aguarde 1-2 minutos e o site estará atualizado

---

## 🆘 SOLUÇÃO DE PROBLEMAS

### Erro 404 ao Acessar

**Solução 1: Verificar Arquivos no GitHub**
1. Vá ao repositório no GitHub
2. Certifique-se de que TODOS os arquivos estão lá:
   - ✅ index.html
   - ✅ admin.html
   - ✅ styles.css, admin.css
   - ✅ script.js, admin.js
   - ✅ server.js
   - ✅ package.json
   - ✅ vercel.json
   - ✅ api/index.js (dentro da pasta api)

**Solução 2: Verificar Configuração no Vercel**
1. No Vercel, vá em **Settings** do projeto
2. Vá em **Build & Development Settings**
3. Confirme:
   - Framework: **Other**
   - Build Command: **VAZIO**
   - Output Directory: **VAZIO**
4. Salve e clique em **"Redeploy"**

**Solução 3: Deletar e Recriar**
1. Delete o projeto no Vercel
2. Crie um novo projeto
3. Importe o mesmo repositório do GitHub
4. Configure como na Parte 2, Passo 3
5. Deploy novamente

### Erro ao Fazer Build

**Solução:**
1. No Vercel, vá em **Settings**
2. **Build & Development Settings**
3. **Build Command**: Deixe **VAZIO**
4. Salve e refaça o deploy

### Site Funciona mas API Não Responde

**Solução:**
1. Verifique se o arquivo `api/index.js` existe no GitHub
2. Verifique se o `vercel.json` está correto
3. Tente acessar: `https://seu-projeto.vercel.app/api/pedidos`
4. Se der erro, verifique os logs no Vercel (aba "Functions")

---

## 📱 LINKS DO SEU SITE

Após o deploy bem-sucedido, você terá:

- **Site Principal**: `https://seu-projeto.vercel.app`
- **Painel Admin**: `https://seu-projeto.vercel.app/admin.html`
- **API**: `https://seu-projeto.vercel.app/api`

**Esses links funcionam em:**
- ✅ Celular
- ✅ Tablet
- ✅ Computador
- ✅ Qualquer navegador

**Compartilhe esses links com quem quiser!** Não precisa instalar nada, só abrir o link.

---

## 💡 DICAS IMPORTANTES

1. **Banco de Dados**: O SQLite no Vercel é temporário. Os dados podem ser perdidos. Para produção, considere usar um banco de dados hospedado (PostgreSQL, MongoDB, etc.)

2. **Domínio Personalizado**: Você pode adicionar seu próprio domínio no Vercel (Settings > Domains). O Vercel fornece SSL gratuito!

3. **Backups**: Sempre mantenha uma cópia dos arquivos no seu computador e no GitHub.

4. **Logs**: Se algo der errado, veja os logs no Vercel (aba "Functions" ou "Deployments")

---

## 📞 PRECISA DE AJUDA?

Se mesmo seguindo esse guia algo não funcionar:

1. Verifique os logs de erro no Vercel
2. Certifique-se de que todos os arquivos estão no GitHub
3. Tente deletar e recriar o projeto no Vercel

---

## 🎉 PRONTO!

Agora seu site está no ar! Compartilhe o link com seus clientes e comece a vender! 🚀
