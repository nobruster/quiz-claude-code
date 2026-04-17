# PRD — Quiz Web: "Você conhece o Claude Code?"

**Versão:** 1.0  
**Data:** 2026-04-17  
**Projeto:** quiz_claude  
**Diretório:** `/home/nobru/documentos/claude_curso_/quiz_claude`

---

## 1. Visão Geral do Produto

### 1.1 Problema
Profissionais de negócio e desenvolvedores têm dificuldade em avaliar o próprio nível de conhecimento sobre o Claude Code — seja para justificar adoção na empresa ou para identificar lacunas técnicas.

### 1.2 Solução
Um quiz web interativo de perguntas **Verdadeiro ou Falso** sobre o Claude Code, com progressão de dificuldade em 3 níveis (Iniciante → Intermediário → Avançado), explicação das respostas e placar ao final.

### 1.3 Objetivos de Negócio
- Educar o mercado sobre capacidades do Claude Code
- Servir como material de apoio para cursos e treinamentos
- Gerar engajamento e compartilhamento de resultado nas redes
- Funcionar como material de onboarding para equipes que estão adotando o Claude Code

---

## 2. Público-Alvo

| Perfil | Descrição | Nível no Quiz |
|--------|-----------|---------------|
| Gestores / Líderes de produto | Querem entender o valor de negócio | Iniciante |
| Desenvolvedores iniciantes | Começando a usar o Claude Code | Iniciante + Intermediário |
| Desenvolvedores experientes | Usuários frequentes do Claude Code | Intermediário + Avançado |

---

## 3. Funcionalidades

### 3.1 Core (MVP)

| # | Funcionalidade | Descrição |
|---|---------------|-----------|
| F01 | Quiz progressivo por níveis | 3 níveis: Iniciante (5 perguntas), Intermediário (5 perguntas), Avançado (5 perguntas). Total: 15 perguntas |
| F02 | Perguntas Verdadeiro ou Falso | Cada pergunta exibe uma afirmação e o usuário escolhe V ou F |
| F03 | Explicação da resposta | Após cada resposta, exibir feedback com a explicação do porquê é verdadeiro ou falso |
| F04 | Placar ao final | Tela de resultado com pontuação total, desempenho por nível e mensagem personalizada |
| F05 | Progressão de nível | O usuário avança automaticamente de nível após responder todas as perguntas do nível atual |

### 3.2 Comportamento de Progressão
- O quiz começa sempre no **Nível 1 (Iniciante)**
- Ao completar o nível, exibe tela de transição com pontuação parcial antes de avançar
- Não há bloqueio por pontuação mínima — todos avançam para o próximo nível
- Ao final do Nível 3, exibe a tela de resultado completo

### 3.3 Tela de Resultado
- Pontuação total: X / 15
- Pontuação por nível: X / 5 em cada
- Badge de resultado baseado na pontuação:
  - 0–5: "Explorando o Claude Code"
  - 6–10: "Usuário Claude Code"
  - 11–13: "Especialista Claude Code"
  - 14–15: "Claude Code Master"
- Botão "Jogar novamente"
- Botão "Compartilhar resultado" (gera texto para copiar ou compartilhar)

---

## 4. Banco de Perguntas

### Nível 1 — Iniciante (Negócio / Conceitos básicos)

| # | Afirmação | Resposta | Explicação |
|---|-----------|----------|------------|
| 1 | "Claude Code é uma extensão do VS Code." | Falso | Claude Code é uma CLI (interface de linha de comando) que roda no terminal, mas também tem extensões para IDEs como VS Code e JetBrains. |
| 2 | "Claude Code pode ler e editar arquivos do seu projeto diretamente." | Verdadeiro | Claude Code tem acesso ao sistema de arquivos local e pode ler, criar e editar arquivos com permissão do usuário. |
| 3 | "Para usar o Claude Code é necessário ter uma conta Anthropic." | Verdadeiro | O Claude Code requer autenticação via conta Anthropic (Claude.ai Pro/Team ou API key). |
| 4 | "Claude Code só funciona em projetos JavaScript." | Falso | Claude Code é agnóstico de linguagem e funciona com qualquer linguagem de programação ou tipo de projeto. |
| 5 | "Claude Code pode executar comandos no terminal em nome do usuário." | Verdadeiro | Com permissão do usuário, o Claude Code pode executar comandos bash, rodar testes, instalar pacotes e outras operações no terminal. |

### Nível 2 — Intermediário (Comandos, CLI e uso diário)

| # | Afirmação | Resposta | Explicação |
|---|-----------|----------|------------|
| 6 | "O arquivo CLAUDE.md é usado para fornecer instruções persistentes ao Claude Code sobre o projeto." | Verdadeiro | O CLAUDE.md funciona como um arquivo de contexto que o Claude Code lê automaticamente para entender convenções, arquitetura e regras do projeto. |
| 7 | "O comando `/clear` no Claude Code deleta arquivos temporários do projeto." | Falso | `/clear` limpa o histórico da conversa atual no Claude Code, não arquivos do projeto. |
| 8 | "Claude Code possui um modo headless (--print) para ser usado em pipelines de CI/CD." | Verdadeiro | O flag `--print` permite rodar o Claude Code de forma não-interativa, ideal para automações e pipelines. |
| 9 | "Comandos slash como `/commit` e `/review` são funcionalidades nativas fixas e não podem ser customizados." | Falso | Além dos comandos nativos, é possível criar comandos slash customizados através de skills e configurações do projeto. |
| 10 | "O Claude Code pode fazer commits no Git automaticamente quando solicitado." | Verdadeiro | O Claude Code pode executar operações Git completas — staging, commit, push — quando o usuário autoriza essas ações. |

### Nível 3 — Avançado (Agentes, MCP, Hooks e Configuração)

| # | Afirmação | Resposta | Explicação |
|---|-----------|----------|------------|
| 11 | "MCP (Model Context Protocol) permite ao Claude Code se conectar a ferramentas e fontes de dados externas." | Verdadeiro | O MCP é um protocolo aberto que permite ao Claude Code acessar servidores MCP que expõem ferramentas como bancos de dados, APIs e serviços externos. |
| 12 | "Hooks no Claude Code são executados pelo próprio modelo de IA em resposta a eventos." | Falso | Hooks são comandos shell configurados no settings.json e executados pelo harness (runtime), não pelo modelo. |
| 13 | "O Claude Code Agent SDK permite criar agentes especializados que podem ser invocados como subagentes." | Verdadeiro | O SDK de agentes do Claude Code permite construir agentes customizados com ferramentas e capacidades específicas que podem ser orquestrados pelo agente principal. |
| 14 | "Cada subagente iniciado pelo Claude Code compartilha o mesmo contexto da conversa principal." | Falso | Subagentes são instâncias independentes e começam sem memória da conversa principal — o contexto relevante precisa ser passado explicitamente no prompt. |
| 15 | "O arquivo settings.json do Claude Code pode configurar permissões de ferramentas, variáveis de ambiente e hooks de automação." | Verdadeiro | O settings.json é o arquivo central de configuração do Claude Code, permitindo definir permissões, env vars, hooks pre/post-tool e outros comportamentos do agente. |

---

## 5. Design e UX

### 5.1 Estilo Visual
- **Paleta:** Clean / Minimalista
  - Background: `#FFFFFF` / `#F9FAFB`
  - Primária: `#D97757` (laranja Anthropic)
  - Texto: `#1A1A1A`
  - Bordas: `#E5E7EB`
  - Sucesso: `#22C55E`
  - Erro: `#EF4444`
- **Tipografia:** Inter (Google Fonts) — pesos 400, 500, 700
- **Sem modo escuro** no MVP — foco em legibilidade

### 5.2 Fluxo de Telas

```
[Tela Inicial]
    → Título + descrição do quiz + botão "Começar"
        ↓
[Tela de Pergunta]
    → Indicador de progresso (ex: "Pergunta 3 de 5 — Nível Iniciante")
    → Afirmação em destaque
    → Botões: [Verdadeiro] [Falso]
        ↓ (após resposta)
[Feedback da Resposta]
    → Ícone ✓ ou ✗ + "Correto!" / "Incorreto"
    → Explicação da resposta
    → Botão "Próxima pergunta"
        ↓ (após 5 perguntas)
[Tela de Transição de Nível]
    → "Nível Iniciante concluído! X/5 acertos"
    → Botão "Avançar para o próximo nível"
        ↓ (após 15 perguntas)
[Tela de Resultado Final]
    → Badge + pontuação total
    → Breakdown por nível
    → Botões: "Jogar novamente" | "Compartilhar"
```

### 5.3 Responsividade
- Mobile-first: layout funcional em 375px+
- Desktop: max-width 640px centralizado na tela

---

## 6. Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Framework | Next.js 14 (App Router) | SSR, deploy fácil na Vercel, estrutura moderna |
| Estilização | Tailwind CSS | Utilitário, rápido, minimalista por padrão |
| Animações | Framer Motion | Transições suaves entre telas e feedback visual |
| Dados | JSON estático | Banco de perguntas em arquivo local, sem backend necessário |
| Deploy | Vercel | Zero config, preview automático, domínio gratuito |
| Fontes | Google Fonts (Inter) | Via next/font para otimização automática |

### 6.1 Estrutura de Diretórios

```
quiz_claude/
├── app/
│   ├── layout.tsx          # Layout raiz com fonte Inter
│   ├── page.tsx            # Tela inicial
│   └── quiz/
│       └── page.tsx        # Lógica principal do quiz
├── components/
│   ├── StartScreen.tsx     # Tela de boas-vindas
│   ├── QuestionCard.tsx    # Card de pergunta V/F
│   ├── FeedbackCard.tsx    # Feedback após resposta
│   ├── LevelTransition.tsx # Tela entre níveis
│   └── ResultScreen.tsx    # Tela de resultado final
├── data/
│   └── questions.ts        # Banco de perguntas tipado
├── types/
│   └── quiz.ts             # Interfaces TypeScript
├── public/
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

### 6.2 Modelo de Dados

```typescript
// types/quiz.ts
interface Question {
  id: number;
  level: 'iniciante' | 'intermediario' | 'avancado';
  statement: string;       // Afirmação exibida ao usuário
  answer: boolean;         // true = Verdadeiro, false = Falso
  explanation: string;     // Explicação exibida após resposta
}

interface QuizState {
  currentQuestionIndex: number;
  currentLevel: 'iniciante' | 'intermediario' | 'avancado';
  answers: UserAnswer[];
  phase: 'start' | 'question' | 'feedback' | 'levelTransition' | 'result';
}

interface UserAnswer {
  questionId: number;
  userAnswer: boolean;
  correct: boolean;
}
```

---

## 7. Critérios de Aceite

| ID | Critério |
|----|----------|
| CA01 | O quiz exibe 15 perguntas divididas em 3 níveis de 5 perguntas cada |
| CA02 | Cada pergunta apresenta uma afirmação e dois botões: Verdadeiro e Falso |
| CA03 | Após cada resposta, é exibido feedback visual (correto/incorreto) + explicação |
| CA04 | O usuário avança automaticamente entre níveis com tela de transição |
| CA05 | A tela de resultado exibe pontuação total, pontuação por nível e badge |
| CA06 | O botão "Jogar novamente" reinicia o quiz do início |
| CA07 | O layout é responsivo e funcional em mobile (375px+) e desktop |
| CA08 | O quiz carrega em menos de 2 segundos em conexão 4G |
| CA09 | Não há dependência de backend ou banco de dados — apenas arquivos estáticos |
| CA10 | O código TypeScript não apresenta erros de tipo (`tsc --noEmit` sem erros) |

---

## 8. Fora do Escopo (MVP)

- Autenticação de usuários
- Persistência de resultados em banco de dados
- Ranking global entre usuários
- Timer por pergunta
- Modo estudo (sem pressão de tempo)
- Perguntas aleatórias de um banco maior
- Internacionalização (i18n)
- Modo escuro

---

## 9. Métricas de Sucesso

- Taxa de conclusão do quiz > 70% (usuários que começam e chegam ao resultado final)
- Tempo médio de sessão > 3 minutos
- Taxa de "jogar novamente" > 20%

---

## 10. Próximos Passos

1. Criar projeto Next.js com Tailwind e Framer Motion
2. Implementar banco de perguntas em `data/questions.ts`
3. Construir componentes de UI na ordem do fluxo
4. Implementar lógica de estado do quiz em `app/quiz/page.tsx`
5. Testar responsividade em mobile e desktop
6. Deploy na Vercel
