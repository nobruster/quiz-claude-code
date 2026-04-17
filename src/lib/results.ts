import { getSupabase } from './supabase'
import type { UserAnswer, QuizResult } from '@/types/quiz'
import { LEVELS, LEVEL_LABELS, QUESTIONS_PER_LEVEL } from '@/data/questions'

export function getBadge(score: number): string {
  if (score <= 5) return 'Explorando o Claude Code'
  if (score <= 10) return 'Usuário Claude Code'
  if (score <= 13) return 'Especialista Claude Code'
  return 'Claude Code Master'
}

export function calcScores(answers: UserAnswer[]) {
  const byLevel = LEVELS.map((level) => {
    const correct = answers.filter((a) => a.level === level && a.correct).length
    return { level, label: LEVEL_LABELS[level], correct, total: QUESTIONS_PER_LEVEL }
  })
  const total = byLevel.reduce((sum, l) => sum + l.correct, 0)
  return { byLevel, total }
}

export async function saveResult(
  playerName: string,
  answers: UserAnswer[]
): Promise<{ error: string | null }> {
  const { byLevel, total } = calcScores(answers)

  const row = {
    player_name: playerName,
    total_score: total,
    iniciante_score: byLevel.find((l) => l.level === 'iniciante')?.correct ?? 0,
    intermediario_score: byLevel.find((l) => l.level === 'intermediario')?.correct ?? 0,
    avancado_score: byLevel.find((l) => l.level === 'avancado')?.correct ?? 0,
    badge: getBadge(total),
  }

  const { error } = await getSupabase().from('quiz_results').insert(row)
  return { error: error?.message ?? null }
}

export async function fetchRanking(): Promise<QuizResult[]> {
  const { data, error } = await getSupabase()
    .from('quiz_results')
    .select('*')
    .order('total_score', { ascending: false })
    .order('completed_at', { ascending: true })
    .limit(20)

  if (error) return []
  return data as QuizResult[]
}
