# Implementation Plan — Quiz Web "Você conhece o Claude Code?"

**Gerado em:** 2026-04-17  
**Baseado em:** prd.md + descoberta de documentação do projeto de referência  
**Referência:** `/home/nobru/documentos/curso_nocode/app_financas`

---

## Ambiente Verificado

| Item | Valor |
|------|-------|
| Node.js | v10.19.0 (sistema) — **usar NVM para ativar Node 20** |
| npm/npx | disponível em `/usr/bin/npx` |
| Next.js ref | 16.2.3 (App Router) |
| Tailwind | 4.x (PostCSS, sem `tailwind.config.ts`) |
| React | 19.2.4 |
| nvm | disponível — `export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 20` |

**IMPORTANTE:** Sempre ativar Node 20 via nvm antes de qualquer comando npm/npx neste projeto.

---

## Phase 0 — Allowed APIs (Documentation Discovery Output)

### Next.js 16 App Router
- Root layout: `app/layout.tsx` — Server Component, exporta `metadata: Metadata` e função `RootLayout`
- Fonte: `import { Inter } from 'next/font/google'` → `Inter({ subsets: ['latin'] })`
- Metadata: `import type { Metadata } from 'next'`
- Client components: precisam de `'use client'` no topo

### Tailwind CSS 4.x
- **Sem** `tailwind.config.ts` — configuração via PostCSS
- `postcss.config.mjs`: `{ plugins: { "@tailwindcss/postcss": {} } }`
- `globals.css` começa com: `@import "tailwindcss";`
- **Anti-pattern:** NÃO criar `tailwind.config.ts` nem usar `@tailwind base/components/utilities`

### Framer Motion
- Import: `import { motion, AnimatePresence } from 'framer-motion'`
- Componentes motion: `motion.div`, `motion.section` etc.
- `AnimatePresence` para animar saída de componentes
- Props: `initial`, `animate`, `exit`, `transition`
- **Requer `'use client'`** em qualquer componente que use motion

### TypeScript
- `tsconfig.json`: `strict: true`, `moduleResolution: "bundler"`, `paths: { "@/*": ["./src/*"] }`
- Sem `any` — tipar tudo com as interfaces de `types/quiz.ts`

### Estrutura de diretórios (confirmada pelo projeto de referência)
- Código fonte em `src/` com path alias `@/*` → `./src/*`
- `src/app/` para rotas App Router
- `src/components/` para componentes React
- `src/data/` para dados estáticos
- `src/types/` para interfaces TypeScript

---

## Phase 1 — Inicialização do Projeto

**Objetivo:** Criar o projeto Next.js com a stack correta e estrutura de diretórios.

### Tarefas

**1.1 Ativar Node 20 e criar o projeto**
```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 20
cd /home/nobru/documentos/claude_curso_/quiz_claude
npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
```
Quando perguntado:
- Use Turbopack? → **No**
- Todas as outras opções → aceitar defaults

**1.2 Instalar Framer Motion**
```bash
npm install framer-motion
```

**1.3 Remover arquivos boilerplate desnecessários**
- Deletar `src/app/page.tsx` (será recriado)
- Limpar `src/app/globals.css` — manter apenas `@import "tailwindcss";`
- Não instalar shadcn, base-ui ou outros — o quiz usa Tailwind puro

**1.4 Verificar postcss.config.mjs**
Deve conter exatamente (copiar de `/home/nobru/documentos/curso_nocode/app_financas/postcss.config.mjs`):
```javascript
const config = {
  plugins: { "@tailwindcss/postcss": {} }
};
export default config;
```

### Verificação Phase 1
```bash
# Deve rodar sem erro
npm run dev
# Deve abrir em http://localhost:3000
npx tsc --noEmit
```

---

## Phase 2 — Tipos e Dados

**Objetivo:** Criar as interfaces TypeScript e o banco de perguntas completo.

### Tarefas

**2.1 Criar `src/types/quiz.ts`**

```typescript
export type Level = 'iniciante' | 'intermediario' | 'avancado'
export type Phase = 'start' | 'question' | 'feedback' | 'levelTransition' | 'result'

export interface Question {
  id: number
  level: Level
  statement: string
  answer: boolean        // true = Verdadeiro, false = Falso
  explanation: string
}

export interface UserAnswer {
  questionId: number
  userAnswer: boolean
  correct: boolean
}

export interface QuizState {
  currentQuestionIndex: number  // índice dentro do nível atual (0-4)
  currentLevel: Level
  answers: UserAnswer[]
  phase: Phase
}

export interface LevelScore {
  level: Level
  correct: number
  total: number
}
```

**2.2 Criar `src/data/questions.ts`**

Copiar as 15 perguntas exatamente do `prd.md` seção 4, estruturadas como array tipado:

```typescript
import type { Question } from '@/types/quiz'

export const questions: Question[] = [
  // NÍVEL INICIANTE (ids 1-5)
  {
    id: 1,
    level: 'iniciante',
    statement: 'Claude Code é uma extensão do VS Code.',
    answer: false,
    explanation: 'Claude Code é uma CLI (interface de linha de comando) que roda no terminal, mas também tem extensões para IDEs como VS Code e JetBrains.'
  },
  {
    id: 2,
    level: 'iniciante',
    statement: 'Claude Code pode ler e editar arquivos do seu projeto diretamente.',
    answer: true,
    explanation: 'Claude Code tem acesso ao sistema de arquivos local e pode ler, criar e editar arquivos com permissão do usuário.'
  },
  {
    id: 3,
    level: 'iniciante',
    statement: 'Para usar o Claude Code é necessário ter uma conta Anthropic.',
    answer: true,
    explanation: 'O Claude Code requer autenticação via conta Anthropic (Claude.ai Pro/Team ou API key).'
  },
  {
    id: 4,
    level: 'iniciante',
    statement: 'Claude Code só funciona em projetos JavaScript.',
    answer: false,
    explanation: 'Claude Code é agnóstico de linguagem e funciona com qualquer linguagem de programação ou tipo de projeto.'
  },
  {
    id: 5,
    level: 'iniciante',
    statement: 'Claude Code pode executar comandos no terminal em nome do usuário.',
    answer: true,
    explanation: 'Com permissão do usuário, o Claude Code pode executar comandos bash, rodar testes, instalar pacotes e outras operações no terminal.'
  },
  // NÍVEL INTERMEDIÁRIO (ids 6-10)
  {
    id: 6,
    level: 'intermediario',
    statement: 'O arquivo CLAUDE.md é usado para fornecer instruções persistentes ao Claude Code sobre o projeto.',
    answer: true,
    explanation: 'O CLAUDE.md funciona como um arquivo de contexto que o Claude Code lê automaticamente para entender convenções, arquitetura e regras do projeto.'
  },
  {
    id: 7,
    level: 'intermediario',
    statement: 'O comando /clear no Claude Code deleta arquivos temporários do projeto.',
    answer: false,
    explanation: '/clear limpa o histórico da conversa atual no Claude Code, não arquivos do projeto.'
  },
  {
    id: 8,
    level: 'intermediario',
    statement: 'Claude Code possui um modo headless (--print) para ser usado em pipelines de CI/CD.',
    answer: true,
    explanation: 'O flag --print permite rodar o Claude Code de forma não-interativa, ideal para automações e pipelines.'
  },
  {
    id: 9,
    level: 'intermediario',
    statement: 'Comandos slash como /commit e /review são funcionalidades nativas fixas e não podem ser customizados.',
    answer: false,
    explanation: 'Além dos comandos nativos, é possível criar comandos slash customizados através de skills e configurações do projeto.'
  },
  {
    id: 10,
    level: 'intermediario',
    statement: 'O Claude Code pode fazer commits no Git automaticamente quando solicitado.',
    answer: true,
    explanation: 'O Claude Code pode executar operações Git completas — staging, commit, push — quando o usuário autoriza essas ações.'
  },
  // NÍVEL AVANÇADO (ids 11-15)
  {
    id: 11,
    level: 'avancado',
    statement: 'MCP (Model Context Protocol) permite ao Claude Code se conectar a ferramentas e fontes de dados externas.',
    answer: true,
    explanation: 'O MCP é um protocolo aberto que permite ao Claude Code acessar servidores MCP que expõem ferramentas como bancos de dados, APIs e serviços externos.'
  },
  {
    id: 12,
    level: 'avancado',
    statement: 'Hooks no Claude Code são executados pelo próprio modelo de IA em resposta a eventos.',
    answer: false,
    explanation: 'Hooks são comandos shell configurados no settings.json e executados pelo harness (runtime), não pelo modelo.'
  },
  {
    id: 13,
    level: 'avancado',
    statement: 'O Claude Code Agent SDK permite criar agentes especializados que podem ser invocados como subagentes.',
    answer: true,
    explanation: 'O SDK de agentes do Claude Code permite construir agentes customizados com ferramentas e capacidades específicas que podem ser orquestrados pelo agente principal.'
  },
  {
    id: 14,
    level: 'avancado',
    statement: 'Cada subagente iniciado pelo Claude Code compartilha o mesmo contexto da conversa principal.',
    answer: false,
    explanation: 'Subagentes são instâncias independentes e começam sem memória da conversa principal — o contexto relevante precisa ser passado explicitamente no prompt.'
  },
  {
    id: 15,
    level: 'avancado',
    statement: 'O arquivo settings.json do Claude Code pode configurar permissões de ferramentas, variáveis de ambiente e hooks de automação.',
    answer: true,
    explanation: 'O settings.json é o arquivo central de configuração do Claude Code, permitindo definir permissões, env vars, hooks pre/post-tool e outros comportamentos do agente.'
  },
]

export const QUESTIONS_PER_LEVEL = 5
export const LEVELS: import('@/types/quiz').Level[] = ['iniciante', 'intermediario', 'avancado']

export function getQuestionsByLevel(level: import('@/types/quiz').Level): Question[] {
  return questions.filter(q => q.level === level)
}
```

### Verificação Phase 2
```bash
npx tsc --noEmit   # zero erros de tipo
# Checar manualmente: 15 perguntas, 5 por nível
```

---

## Phase 3 — Layout Raiz e Estilos Globais

**Objetivo:** Configurar `app/layout.tsx` com fonte Inter e globals.css limpo.

### Tarefas

**3.1 Criar `src/app/globals.css`** (substituir o gerado pelo create-next-app)
```css
@import "tailwindcss";

:root {
  --primary: #D97757;
  --primary-hover: #C4663F;
  --success: #22C55E;
  --error: #EF4444;
  --border: #E5E7EB;
  --text: #1A1A1A;
  --text-muted: #6B7280;
  --bg: #FFFFFF;
  --bg-subtle: #F9FAFB;
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}
```

**3.2 Criar `src/app/layout.tsx`**
Adaptar do padrão em `/home/nobru/documentos/curso_nocode/app_financas/src/app/layout.tsx:1-23`:
- Usar `Inter` no lugar de `Geist`
- Sem `ThemeProvider` (sem dark mode no MVP)
- `lang="pt-BR"`

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Você conhece o Claude Code?',
  description: 'Quiz de perguntas verdadeiro ou falso sobre o Claude Code — da Anthropic.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

**3.3 Criar `src/app/page.tsx`** (redireciona para o quiz)
```typescript
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/quiz')
}
```

**3.4 Criar `src/app/quiz/page.tsx`** (stub vazio por ora)
```typescript
'use client'

export default function QuizPage() {
  return <div>Quiz</div>
}
```

### Verificação Phase 3
```bash
npm run dev
# Acessar http://localhost:3000 → deve redirecionar para /quiz e mostrar "Quiz"
npx tsc --noEmit
```

---

## Phase 4 — Componentes de UI

**Objetivo:** Construir os 5 componentes visuais, um por vez.

Todos os componentes precisam de `'use client'` quando usam Framer Motion ou hooks React.

### Design Tokens (usar como classes Tailwind inline ou CSS vars)
```
bg-[#F9FAFB]         ← fundo sutil
bg-white             ← card
border-[#E5E7EB]     ← borda
text-[#1A1A1A]       ← texto principal
text-[#6B7280]       ← texto secundário
bg-[#D97757]         ← botão primário (laranja Anthropic)
hover:bg-[#C4663F]   ← hover do botão primário
bg-[#22C55E]         ← correto
bg-[#EF4444]         ← incorreto
max-w-[640px]        ← largura máxima
```

---

### 4.1 `src/components/StartScreen.tsx`

Props: `onStart: () => void`

Conteúdo:
- Título: "Você conhece o Claude Code?"
- Subtítulo: "15 perguntas • 3 níveis • Verdadeiro ou Falso"
- Descrição breve do quiz
- Botão "Começar o Quiz" → chama `onStart()`
- Badge visual de cada nível (Iniciante / Intermediário / Avançado)

---

### 4.2 `src/components/QuestionCard.tsx`

Props:
```typescript
interface QuestionCardProps {
  question: Question
  questionNumber: number   // 1-5 dentro do nível
  levelLabel: string       // "Iniciante" | "Intermediário" | "Avançado"
  onAnswer: (answer: boolean) => void
}
```

Conteúdo:
- Barra de progresso: "Pergunta X de 5 — Nível [label]"
- Afirmação em destaque (texto grande, card central)
- Dois botões: [✓ Verdadeiro] e [✗ Falso]
- Animação de entrada: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`

---

### 4.3 `src/components/FeedbackCard.tsx`

Props:
```typescript
interface FeedbackCardProps {
  question: Question
  userAnswer: boolean
  isCorrect: boolean
  onNext: () => void
  isLastInLevel: boolean
  nextLabel: string   // "Próxima pergunta" | "Ver resultado do nível"
}
```

Conteúdo:
- Ícone grande ✓ (verde) ou ✗ (vermelho)
- "Correto!" ou "Incorreto"
- A afirmação original
- Explicação da resposta
- Resposta correta em destaque
- Botão com `nextLabel`
- Animação: `initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}`

---

### 4.4 `src/components/LevelTransition.tsx`

Props:
```typescript
interface LevelTransitionProps {
  completedLevel: string     // "Iniciante" | "Intermediário" | "Avançado"
  nextLevel: string          // "Intermediário" | "Avançado"
  score: number              // acertos neste nível
  total: number              // sempre 5
  onContinue: () => void
}
```

Conteúdo:
- "Nível [completedLevel] concluído!"
- Pontuação: X / 5 acertos com barra visual
- Mensagem de encorajamento
- Botão "Avançar para [nextLevel]"

---

### 4.5 `src/components/ResultScreen.tsx`

Props:
```typescript
interface ResultScreenProps {
  answers: UserAnswer[]
  onRestart: () => void
}
```

Lógica interna:
- Calcular score total (0-15) e por nível (0-5 cada)
- Badge baseado no score total:
  - 0–5: "Explorando o Claude Code" 🌱
  - 6–10: "Usuário Claude Code" 💡
  - 11–13: "Especialista Claude Code" ⚡
  - 14–15: "Claude Code Master" 🏆
- Função de compartilhamento: `navigator.clipboard.writeText(texto)`
- Texto de compartilhamento: "Fiz o quiz 'Você conhece o Claude Code?' e acertei X/15! Meu nível: [badge]. Que tal testar o seu?"

Conteúdo:
- Badge com ícone e título
- Score total em destaque
- Tabela de score por nível
- Botões: "Jogar novamente" | "Copiar resultado"

### Verificação Phase 4
```bash
npx tsc --noEmit   # zero erros em todos os componentes
# Inspecionar visualmente cada componente isolado se necessário
```

---

## Phase 5 — Lógica do Quiz (máquina de estados)

**Objetivo:** Conectar todos os componentes em `src/app/quiz/page.tsx` com a lógica de estado.

### Estrutura do estado
```typescript
'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { QuizState, Level, UserAnswer } from '@/types/quiz'
import { questions, getQuestionsByLevel, LEVELS } from '@/data/questions'
// imports de componentes...

const INITIAL_STATE: QuizState = {
  currentQuestionIndex: 0,
  currentLevel: 'iniciante',
  answers: [],
  phase: 'start',
}
```

### Funções de estado a implementar

| Função | Transição de fase |
|--------|------------------|
| `handleStart()` | `start → question` |
| `handleAnswer(userAnswer: boolean)` | `question → feedback` (salva resposta) |
| `handleNext()` | `feedback → question` OU `feedback → levelTransition` (se última do nível) |
| `handleContinueLevel()` | `levelTransition → question` (próximo nível) |
| `handleRestart()` | qualquer → `start` (reset estado) |

### Lógica de progressão de nível
```typescript
// Dentro de handleNext():
const currentLevelQuestions = getQuestionsByLevel(state.currentLevel)
const isLastInLevel = state.currentQuestionIndex === currentLevelQuestions.length - 1
const isLastLevel = state.currentLevel === 'avancado'

if (isLastInLevel && isLastLevel) → phase: 'result'
if (isLastInLevel && !isLastLevel) → phase: 'levelTransition'
if (!isLastInLevel) → phase: 'question', currentQuestionIndex + 1
```

### AnimatePresence
Envolver o switch de componentes com `AnimatePresence mode="wait"` para transições suaves entre fases.

### Layout da página
- `min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4`
- Container interno: `w-full max-w-[640px]`

### Verificação Phase 5
```bash
npm run dev
# Testar fluxo completo manualmente:
# 1. Tela inicial → clicar Começar
# 2. Responder 5 perguntas do nível iniciante
# 3. Ver tela de transição com score
# 4. Avançar para intermediário → responder 5
# 5. Avançar para avançado → responder 5
# 6. Ver tela de resultado final com score correto
# 7. Clicar "Jogar novamente" → volta à tela inicial
npx tsc --noEmit
```

---

## Phase 6 — Verificação Final e Polimento

**Objetivo:** Garantir que todos os critérios de aceite do PRD estão satisfeitos.

### Checklist de Critérios de Aceite

| CA | Verificação |
|----|-------------|
| CA01 | Contar perguntas renderizadas: exatamente 15, 5 por nível |
| CA02 | Cada tela de pergunta tem exatamente 2 botões: Verdadeiro e Falso |
| CA03 | Após cada resposta: feedback visual (cor) + explicação aparecem |
| CA04 | Tela de transição aparece entre níveis com score parcial |
| CA05 | Resultado final: score total + por nível + badge correto |
| CA06 | "Jogar novamente" reseta quiz e volta à tela inicial |
| CA07 | Testar em viewport 375px (DevTools mobile) e 1280px |
| CA08 | `npm run build` sem erros; página carrega rapidamente |
| CA09 | Confirmar: zero chamadas de rede, zero arquivos `.env` |
| CA10 | `npx tsc --noEmit` sem erros |

### Comandos de verificação
```bash
# Build de produção (detecta erros que dev server ignora)
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 20
npm run build

# Type check
npx tsc --noEmit

# Checar por any implícito (anti-pattern)
grep -r ": any" src/

# Checar se não há imports de backend/supabase (não deve ter)
grep -r "supabase\|prisma\|mongoose\|database" src/
```

### Anti-patterns a verificar
- `grep -r "tailwind.config" .` → deve retornar vazio (Tailwind 4 não usa este arquivo)
- `grep -r "@tailwind base" src/` → deve retornar vazio (usar `@import "tailwindcss"`)
- `grep -r "any" src/types/` → deve retornar vazio
- Nenhum componente que usa `motion.*` sem `'use client'`

---

## Ordem de Execução entre Sessões

```
Sessão 1: Phase 1 (inicialização) + Phase 2 (tipos e dados)
Sessão 2: Phase 3 (layout) + Phase 4 (componentes)
Sessão 3: Phase 5 (lógica) + Phase 6 (verificação)
```

Cada sessão é auto-contida. Começar cada sessão lendo:
1. Este `plan.md`
2. `prd.md` (especificação completa com todas as perguntas)
3. `CLAUDE.md` (convenções do projeto)

---

## Notas Críticas para Implementação

1. **Node 20:** Sempre ativar via `nvm use 20` antes de qualquer comando npm
2. **Tailwind 4:** `@import "tailwindcss"` — sem `@tailwind base/components/utilities`
3. **`'use client'`:** Obrigatório em qualquer arquivo que use Framer Motion, useState, ou event handlers
4. **Path alias:** Usar `@/` para todos os imports internos (ex: `@/types/quiz`, `@/components/QuestionCard`)
5. **Sem backend:** Nenhuma rota de API, nenhum Server Action, nenhuma chamada de rede
6. **Sem dark mode:** Não instalar `next-themes` — o quiz é light-only
