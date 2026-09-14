# Calculadora de Orçamento Doméstico

[Demo ao vivo](https://budgetofficerbgkmyhmhm.vercel.app/)

Site de página única para organizar receitas e despesas domésticas.
Feito em Next.js 14 (App Router) + TypeScript, com CSS separado do TSX
(CSS Modules) e integração com Firebase.

## Destaques técnicos

- Componentes React reutilizáveis e tipados com TypeScript.
- Layout responsivo com CSS Modules e pontos de quebra para desktop e mobile.
- Persistência local com `localStorage` e sincronização opcional com Firestore.
- Autenticação anônima no Firebase e isolamento de dados por usuário.
- Formulários validados, controles rotulados e botões com nomes acessíveis.
- Salvamento remoto com debounce para reduzir escritas desnecessárias.

## Estrutura

```
app/
  layout.tsx          -> layout raiz (título, meta tags, viewport)
  page.tsx             -> página principal (junta os componentes)
  page.module.css
  globals.css           -> variáveis de cor (azul confiança #165DFF), fontes
components/
  Header/               -> título e subtítulo
  IncomeSection/         -> bloco de receitas
  ExpenseSection/        -> bloco de despesas
  EntryForm/              -> formulário (reutilizado por receitas e despesas)
  EntryList/               -> lista de lançamentos com botão de remover
  SummaryCard/              -> cartão azul com totais e saldo
  AdSlot/                    -> espaço reservado para anúncios do Google
  Footer/
lib/
  firebase.ts              -> inicialização do Firebase (App, Auth, Firestore)
  useBudget.ts               -> hook com toda a lógica: estado, cálculo,
                                salvar/carregar (localStorage + Firestore)
types/
  budget.ts                    -> tipos TypeScript dos dados
```

Cada componente tem seu próprio arquivo `.module.css` ao lado do `.tsx`.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Configurando o Firebase (opcional, mas recomendado)

O site funciona 100% sem Firebase (os dados ficam salvos no navegador,
via `localStorage`). Se você configurar o Firebase, os dados também são
sincronizados na nuvem (usando login anônimo, sem necessidade de senha
para o usuário).

1. Crie um projeto em https://console.firebase.google.com
2. Ative **Authentication > Sign-in method > Anônimo**
3. Ative **Firestore Database** (modo produção, com regras abaixo)
4. Em Configurações do projeto > Geral > Seus apps, crie um "App da Web"
   e copie as credenciais
5. Copie o arquivo `.env.local.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

6. Regras sugeridas no Firestore (cada usuário só acessa o próprio
   orçamento):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orcamentos/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Adicionando o Google AdSense

Já existem 3 espaços reservados e estilizados no layout (topo, lateral e
rodapé), no componente `components/AdSlot/AdSlot.tsx`.

1. Depois de aprovado no AdSense, adicione o script de verificação dentro
   de `app/layout.tsx` (há um comentário indicando onde colar).
2. Dentro de `AdSlot.tsx`, troque o `<span>` de placeholder pelo bloco
   `<ins class="adsbygoogle" ...>` gerado no painel do AdSense para cada
   posição de anúncio.

## Deploy

O jeito mais simples é publicar na [Vercel](https://vercel.com) (criadora
do Next.js): conecte o repositório e adicione as mesmas variáveis de
ambiente do `.env.local` no painel do projeto.
