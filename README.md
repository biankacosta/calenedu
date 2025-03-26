# 📅 CalenEdu - Organização de Atividades

## 📌 Qual foi a ideia do projeto?

Este projeto nasceu após um brainstorming com usuários da **AgendaEdu**, que identificaram a necessidade de uma ferramenta visual e interativa para o gerenciamento de atividades acadêmicas. A proposta é oferecer um **painel em formato de calendário**, onde os alunos podem:

- **Visualizar** suas atividades em andamento, provas e eventos;
- **Adicionar** novas atividades para melhorar o planejamento;
- **Enviar** atividades diretamente pela plataforma.

## 🛠️ Tecnologias utilizadas

- **Backend:** Ruby on Rails  
- **Frontend:** React + Tailwind CSS  

## 🚀 Como rodar o projeto

### Pré-requisitos

- Rails 7.2.2.1
- Node.js e npm (para o frontend)

### Configuração do Backend (Ruby on Rails)

1. **Clone o repositório:**

   ```bash
   git clone <https://github.com/biankacosta/calenedu>
   cd backend
   ```

2. **Instale as dependências do Ruby:**

   ```bash
   bundle install
   ```

3. **Configure o banco de dados:**

   Crie o banco e rode as migrations:

   ```bash
   rails db:create
   rails db:migrate
   ```

4. **Inicie o servidor Rails:**

   ```bash
   rails server
   ```

   O backend estará disponível em `http://localhost:3000`.

### Configuração do Frontend (React)

1. **Acesse o diretório do frontend:**

   ```bash
   cd frontend
   ```

2. **Instale as dependências do React:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento do React:**

   ```bash
   npm run dev
   ```

   O painel será executado e normalmente estará disponível em `http://localhost:3001` ou `http://localhost:3000`, dependendo da configuração.
