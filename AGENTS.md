# budget-officer: Calculadora de Orçamento Doméstico

> AGENTS.md criado em 05/10/2026 (cópia do Raspberry Pi). Contexto geral em `../AGENTS.md`.

- **O que é:** site de página única para organizar receitas e despesas domésticas, peça de portfólio. Demo citada no README: https://budgetofficerbgkmyhmhm.vercel.app/ (não verifiquei se está no ar).
- **Stack:** Next.js 14.2.35 (App Router), React 18, TypeScript 5, CSS Modules, Firebase 11 (Auth anônima e Firestore, opcionais). Sem Firebase, os dados ficam no `localStorage`.
- **Estrutura:** `app/` (layout, página, estilos globais), `components/<Componente>/<Componente>.tsx` + `.module.css` (Header, IncomeSection, ExpenseSection, EntryForm, EntryList, SummaryCard, AdSlot, Footer), `lib/firebase.ts` (inicializa o Firebase só se houver credenciais), `lib/useBudget.ts` (estado, cálculos, persistência), `types/budget.ts`.
- **Comandos** (`package.json`/README): `npm install`, `npm run dev` (http://localhost:3000), `npm run build`, `npm run start`, `npm run lint` (`next lint`; não encontrei arquivo de configuração do ESLint e não testei). **Não há testes automatizados.**
- **Configuração:** copie `.env.local.example` para `.env.local` com as variáveis `NEXT_PUBLIC_FIREBASE_*`. As regras sugeridas do Firestore estão no README.
- **Deploy:** Vercel, conectando o repositório e configurando as mesmas variáveis de ambiente (README).
- **Git (05/10/2026):** branch `main` = `origin/main` (`f112948`, "feat: publish Budget Officer portfolio project"), sem pendências além deste `AGENTS.md` (agora versionado). Remoto: https://github.com/banana-eletrizante/budget-officer
- **Convenções:** um componente por pasta, com o CSS Module ao lado; textos da interface em português; commits `feat:`/`fix:` em inglês; `.env*` fora do git.
- **Localização:** `/mnt/hdd/Projetos/Carreira Profissional/budget-officer` · `Z:\Projetos\Carreira Profissional\budget-officer` · via Tailscale `ssh andrew@100.97.106.15` · MCP: `Carreira Profissional/budget-officer/...` (veja `/mnt/hdd/Projetos/.administracao/MCP.md`).
- **Dependências:** `node_modules/` e `.next/` vieram do Windows. Reinstale (`npm ci`) ao trabalhar em outra máquina e não instale direto no HDD do Pi. No Linux, use `git -c core.autocrlf=true status`.

- Remoto SSH nesta cópia do Pi: `git@github-budget-officer:banana-eletrizante/budget-officer.git`.
