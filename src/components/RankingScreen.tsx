'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchRanking } from '@/lib/results'
import type { QuizResult } from '@/types/quiz'
import Link from 'next/link'

const BADGE_EMOJI: Record<string, string> = {
  'Explorando o Claude Code': '🌱',
  'Usuário Claude Code': '💡',
  'Especialista Claude Code': '⚡',
  'Claude Code Master': '🏆',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

export default function RankingScreen() {
  const [results, setResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRanking().then((data) => {
      setResults(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[560px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-lg font-bold text-[#1A1A1A]">🏅 Ranking</h1>
                <p className="text-xs text-[#6B7280]">Top 20 melhores resultados</p>
              </div>
              <Link
                href="/quiz"
                className="text-xs font-semibold text-[#D97757] hover:text-[#C4663F] transition-colors"
              >
                Jogar →
              </Link>
            </div>

            {/* Lista */}
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 bg-[#F9FAFB] rounded-xl animate-pulse" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-3xl block mb-3">🎯</span>
                <p className="text-sm text-[#6B7280]">Nenhum resultado ainda.</p>
                <p className="text-sm text-[#6B7280]">Seja o primeiro a completar o quiz!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((r, i) => {
                  const isTop3 = i < 3
                  const medals = ['🥇', '🥈', '🥉']
                  const pct = Math.round((r.total_score / 15) * 100)

                  return (
                    <div
                      key={r.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${
                        isTop3 ? 'border-[#D97757]/30 bg-[#D97757]/5' : 'border-[#E5E7EB] bg-[#F9FAFB]'
                      }`}
                    >
                      {/* Posição */}
                      <span className="text-lg w-7 text-center flex-shrink-0">
                        {isTop3 ? medals[i] : <span className="text-xs font-bold text-[#9CA3AF]">{i + 1}</span>}
                      </span>

                      {/* Nome + badge */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1A1A1A] truncate">{r.player_name}</p>
                        <p className="text-xs text-[#6B7280]">
                          {BADGE_EMOJI[r.badge] ?? '🎯'} {r.badge}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-[#1A1A1A]">{r.total_score}/15</p>
                        <p className="text-xs text-[#6B7280]">{pct}% · {formatDate(r.completed_at)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
