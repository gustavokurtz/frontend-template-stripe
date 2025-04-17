# Frontend Template Stripe

Este repositório é um template de front-end em **Next.js** (App Router) com **TypeScript** e **Tailwind CSS**, integrando Stripe no front-end de forma simples. A lógica das chaves do Stripe (publicable e secret) está gerenciada no back-end, então aqui não é necessário configurar variáveis de ambiente.

## Visão Geral

Este template fornece uma interface pronta para:

- Registro e Login de usuários (com JWT via back-end)
- Página protegida após autenticação (Welcome e Dashboard)
- Checkout simples via Stripe (acessado após Welcome)

Ideal para aplicações SaaS ou e-commerce que queiram um ponto de partida rápido com Next.js e Stripe.

## Tecnologias

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Stripe.js

## Pré-requisitos

- Node.js (versão 14 ou superior)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/gustavokurtz/frontend-template-stripe.git
   cd frontend-template-stripe
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

## Scripts

- Desenvolvimento (hot-reload):
  ```bash
  npm run dev
  # ou yarn dev
  ```
  Acesse `http://localhost:3000` no browser.

- Build & Start:
  ```bash
  npm run build
  npm run start
  ```

## Estrutura do Projeto

```
public/                   # Arquivos estáticos
src/
├── app/                  # Páginas (App Router)
│   ├── login/
│   ├── register/
│   ├── welcome/
│   ├── dashboard/
│   └── page.tsx          # Entrada da home
├── components/           # Componentes reutilizáveis
├── lib/                  # Helpers (auth, utils)
├── styles/               # Estilos globais (globals.css)
├── layout.tsx            # Layout padrão
└── page.tsx              # Página principal

package.json             # Scripts e dependências
tsconfig.json            # Configuração TypeScript
next.config.ts           # Configuração Next.js
tailwind.config.js       # Configuração Tailwind CSS
```

## Customização

- Ajuste estilos em `src/styles/globals.css` ou direto nos componentes com Tailwind.
- Modifique rotas e lógica de autenticação em `src/lib/auth.ts`.
- Expanda páginas em `src/app` conforme a necessidade.

---

Use este template como ponto de partida e adapte-o livremente às suas necessidades.

