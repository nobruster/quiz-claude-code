import type { Question, Level } from '@/types/quiz'

export const questions: Question[] = [
  // NÍVEL INICIANTE
  {
    id: 1,
    level: 'iniciante',
    statement: 'Claude Code é uma extensão do VS Code.',
    answer: false,
    explanation: 'Claude Code é uma CLI (interface de linha de comando) que roda no terminal, mas também tem extensões para IDEs como VS Code e JetBrains.',
  },
  {
    id: 2,
    level: 'iniciante',
    statement: 'Claude Code pode ler e editar arquivos do seu projeto diretamente.',
    answer: true,
    explanation: 'Claude Code tem acesso ao sistema de arquivos local e pode ler, criar e editar arquivos com permissão do usuário.',
  },
  {
    id: 3,
    level: 'iniciante',
    statement: 'Para usar o Claude Code é necessário ter uma conta Anthropic.',
    answer: true,
    explanation: 'O Claude Code requer autenticação via conta Anthropic (Claude.ai Pro/Team ou API key).',
  },
  {
    id: 4,
    level: 'iniciante',
    statement: 'Claude Code só funciona em projetos JavaScript.',
    answer: false,
    explanation: 'Claude Code é agnóstico de linguagem e funciona com qualquer linguagem de programação ou tipo de projeto.',
  },
  {
    id: 5,
    level: 'iniciante',
    statement: 'Claude Code pode executar comandos no terminal em nome do usuário.',
    answer: true,
    explanation: 'Com permissão do usuário, o Claude Code pode executar comandos bash, rodar testes, instalar pacotes e outras operações no terminal.',
  },
  // NÍVEL INTERMEDIÁRIO
  {
    id: 6,
    level: 'intermediario',
    statement: 'O arquivo CLAUDE.md é usado para fornecer instruções persistentes ao Claude Code sobre o projeto.',
    answer: true,
    explanation: 'O CLAUDE.md funciona como um arquivo de contexto que o Claude Code lê automaticamente para entender convenções, arquitetura e regras do projeto.',
  },
  {
    id: 7,
    level: 'intermediario',
    statement: 'O comando /clear no Claude Code deleta arquivos temporários do projeto.',
    answer: false,
    explanation: '/clear limpa o histórico da conversa atual no Claude Code, não arquivos do projeto.',
  },
  {
    id: 8,
    level: 'intermediario',
    statement: 'Claude Code possui um modo headless (--print) para ser usado em pipelines de CI/CD.',
    answer: true,
    explanation: 'O flag --print permite rodar o Claude Code de forma não-interativa, ideal para automações e pipelines.',
  },
  {
    id: 9,
    level: 'intermediario',
    statement: 'Comandos slash como /commit e /review são funcionalidades nativas fixas e não podem ser customizados.',
    answer: false,
    explanation: 'Além dos comandos nativos, é possível criar comandos slash customizados através de skills e configurações do projeto.',
  },
  {
    id: 10,
    level: 'intermediario',
    statement: 'O Claude Code pode fazer commits no Git automaticamente quando solicitado.',
    answer: true,
    explanation: 'O Claude Code pode executar operações Git completas — staging, commit, push — quando o usuário autoriza essas ações.',
  },
  // NÍVEL AVANÇADO
  {
    id: 11,
    level: 'avancado',
    statement: 'MCP (Model Context Protocol) permite ao Claude Code se conectar a ferramentas e fontes de dados externas.',
    answer: true,
    explanation: 'O MCP é um protocolo aberto que permite ao Claude Code acessar servidores MCP que expõem ferramentas como bancos de dados, APIs e serviços externos.',
  },
  {
    id: 12,
    level: 'avancado',
    statement: 'Hooks no Claude Code são executados pelo próprio modelo de IA em resposta a eventos.',
    answer: false,
    explanation: 'Hooks são comandos shell configurados no settings.json e executados pelo harness (runtime), não pelo modelo.',
  },
  {
    id: 13,
    level: 'avancado',
    statement: 'O Claude Code Agent SDK permite criar agentes especializados que podem ser invocados como subagentes.',
    answer: true,
    explanation: 'O SDK de agentes do Claude Code permite construir agentes customizados com ferramentas e capacidades específicas que podem ser orquestrados pelo agente principal.',
  },
  {
    id: 14,
    level: 'avancado',
    statement: 'Cada subagente iniciado pelo Claude Code compartilha o mesmo contexto da conversa principal.',
    answer: false,
    explanation: 'Subagentes são instâncias independentes e começam sem memória da conversa principal — o contexto relevante precisa ser passado explicitamente no prompt.',
  },
  {
    id: 15,
    level: 'avancado',
    statement: 'O arquivo settings.json do Claude Code pode configurar permissões de ferramentas, variáveis de ambiente e hooks de automação.',
    answer: true,
    explanation: 'O settings.json é o arquivo central de configuração do Claude Code, permitindo definir permissões, env vars, hooks pre/post-tool e outros comportamentos do agente.',
  },
]

export const QUESTIONS_PER_LEVEL = 5
export const LEVELS: Level[] = ['iniciante', 'intermediario', 'avancado']

export const LEVEL_LABELS: Record<Level, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
}

export function getQuestionsByLevel(level: Level): Question[] {
  return questions.filter((q) => q.level === level)
}

export function getNextLevel(current: Level): Level | null {
  const idx = LEVELS.indexOf(current)
  return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null
}
