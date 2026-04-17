export type Level = 'iniciante' | 'intermediario' | 'avancado'
export type Phase = 'start' | 'name' | 'question' | 'feedback' | 'levelTransition' | 'result'

export interface Question {
  id: number
  level: Level
  statement: string
  answer: boolean
  explanation: string
}

export interface UserAnswer {
  questionId: number
  userAnswer: boolean
  correct: boolean
  level: Level
}

export interface QuizState {
  currentQuestionIndex: number
  currentLevel: Level
  answers: UserAnswer[]
  phase: Phase
  playerName: string
}

export interface QuizResult {
  id: string
  player_name: string
  total_score: number
  iniciante_score: number
  intermediario_score: number
  avancado_score: number
  badge: string
  completed_at: string
}
