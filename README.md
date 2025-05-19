# DevwkStore 🛒

![DevwkStore - Home](https://github.com/user-attachments/assets/b0c7feef-d5b1-44f6-8e36-0f048634d861)

**DevwkStore** é uma aplicação e-commerce full-stack moderna construída com tecnologias de ponta como Next.js 15, React 19 e TypeScript. O projeto oferece uma experiência de compra completa, incluindo autenticação de usuários, gerenciamento de produtos, funcionalidade de carrinho de compras, integração com pagamentos (Stripe e PayPal), envio de e-mails transacionais e um robusto painel administrativo.

> ⚠️ O projeto está em desenvolvimento ativo. Acesse a versão atual em: [https://devwkstoree.vercel.app/](https://devwkstoree.vercel.app/)

## 📂 Repositório

Código fonte disponível em: [https://github.com/wandskk/devwkstore](https://github.com/wandskk/devwkstore)

## 🧰 Tecnologias Utilizadas

- **Frontend:**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - ShadCN UI
  - React Hook Form
  - Zod
  - Recharts (visualização de dados)

- **Backend:**
  - PostgreSQL (Neon)
  - Prisma ORM
  - NextAuth.js
  - Uploadthing
  - Jest
  - Server Actions

- **Pagamentos & E-mails:**
  - Stripe API
  - PayPal API (Sandbox)
  - Resend (para e-mails transacionais)

- **DevOps & Infraestrutura:**
  - Vercel (deploy contínuo)
  - GitHub Actions
  - PostgreSQL (Neon)

## 🛠️ Funcionalidades Implementadas

### Autenticação e Usuários
- [x] Sistema completo de autenticação com NextAuth.js
- [x] Login e registro de usuários
- [x] Proteção de rotas para usuários autenticados
- [x] Gerenciamento de sessão com JWT
- [x] Perfil de usuário com endereço de entrega

### Produtos e Catálogo
- [x] Listagem de produtos com paginação
- [x] Visualização detalhada de produtos
- [x] Galeria de imagens com suporte a múltiplas fotos
- [x] Upload de imagens com Uploadthing
- [x] Filtros e busca de produtos

### Carrinho e Checkout
- [x] Carrinho de compras com persistência de sessão
- [x] Gerenciamento de quantidade de itens
- [x] Cálculo dinâmico de subtotal
- [x] Processo de checkout em etapas
- [x] Seleção de método de pagamento
- [x] Integração com PayPal Sandbox
- [x] Formulário de endereço de entrega

### Pedidos
- [x] Criação e gerenciamento de pedidos
- [x] Histórico de pedidos
- [x] Detalhes do pedido com status
- [x] Confirmação por e-mail

### Interface e UX
- [x] Design responsivo com Tailwind CSS
- [x] Componentes modernos com ShadCN UI
- [x] Tema claro/escuro
- [x] Menu responsivo
- [x] Animações e transições suaves
- [x] Validação de formulários com Zod

## 📦 Instalação

Para executar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/wandskk/devwkstore.git
   cd devwkstore
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
   ```bash
   NEXT_PUBLIC_APP_NAME="DevwkStore"
   NEXT_PUBLIC_APP_DESCRIPTION="A modern ecommerce platform built with Next.js"
   NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
   DATABASE_URL="your_postgresql_connection_string"
   LATEST_PRODUCTS_LIMIT=4
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_URL_INTERNAL="http://localhost:3000"
   ENCRYPTION_KEY="your_encryption_key"
   PAYPAL_CLIENT_ID="your_paypal_client_id"
   PAYPAL_CLIENT_SECRET="your_paypal_client_secret"
   ```

4. **Execute as migrações do banco de dados:**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## ✅ Testes
Para executar os testes:
   ```bash
   npm run test
   ```

## 📈 Próximos Passos

- [ ] Integração completa com Stripe
- [ ] Sistema de avaliações e reviews
- [ ] Dashboard administrativo com gráficos
- [ ] Filtros avançados de busca
- [ ] Sistema de notificações
- [ ] Otimizações de performance
- [ ] Testes de integração
- [ ] Internacionalização (i18n)

## 🤝 Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias, correções ou novas funcionalidades.

## 📄 Licença
Este projeto está licenciado sob a Licença MIT.

## 📬 Contato

Nome: Wanderson

LinkedIn: [https://www.linkedin.com/in/wanderson-kenedy-soares/](https://www.linkedin.com/in/wanderson-kenedy-soares/)

Email: [devwk.c@gmail.com](mailto:devwk.c@gmail.com)
