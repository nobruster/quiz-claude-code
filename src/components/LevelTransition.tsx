'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface LevelTransitionProps {
  completedLevel: string
  nextLevel: string
  score: number
  total: number
  onContinue: () => void
}

const messages = [
  'Boa, continue assim!',
  'Você está indo bem!',
  'Vamos para o próximo desafio!',
]

export default function LevelTransition({
  completedLevel,
  nextLevel,
  score,
  total,
  onContinue,
}: LevelTransitionProps) {
  const pct = (score / total) * 100
  const msg = useMemo(() => messages[Math.floor(Math.random() * messages.length)], [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D97757]/10 mb-4">
          <span className="text-3xl">🎯</span>
        </div>

        <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">
          Nível {completedLevel} concluído!
        </h2>
        <p className="text-[#6B7280] text-sm mb-6">{msg}</p>

        {/* Score */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 mb-6">
          <p className="text-3xl font-bold text-[#1A1A1A] mb-1">
            {score}
            <span className="text-lg font-medium text-[#6B7280]">/{total}</span>
          </p>
          <p className="text-xs text-[#6B7280] mb-3">acertos neste nível</p>
          <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D97757] rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full bg-[#D97757] hover:bg-[#C4663F] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm cursor-pointer"
        >
          Avançar para {nextLevel} →
        </button>
      </div>
    </motion.div>
  )
}
