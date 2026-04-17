'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Question } from '@/types/quiz'

interface FeedbackCardProps {
  question: Question
  isCorrect: boolean
  onNext: () => void
  nextLabel: string
}

export default function FeedbackCard({
  question,
  isCorrect,
  onNext,
  nextLabel,
}: FeedbackCardProps) {
  const correctLabel = question.answer ? 'Verdadeiro' : 'Falso'
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    nextButtonRef.current?.focus()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
        {/* Status */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="flex items-center gap-3 p-4 rounded-xl mb-5"
          style={{ backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2' }}
        >
          <span className="text-2xl" aria-hidden="true">{isCorrect ? '✅' : '❌'}</span>
          <div>
            <p
              className="font-bold text-sm"
              style={{ color: isCorrect ? '#15803D' : '#B91C1C' }}
            >
              {isCorrect ? 'Correto!' : 'Incorreto'}
            </p>
            <p className="text-xs" style={{ color: isCorrect ? '#166534' : '#991B1B' }}>
              A resposta correta é <strong>{correctLabel}</strong>
            </p>
          </div>
        </div>

        {/* Afirmação */}
        <p className="text-sm text-[#6B7280] mb-2 font-medium">A afirmação:</p>
        <p className="text-sm text-[#1A1A1A] mb-4 leading-relaxed">
          &ldquo;{question.statement}&rdquo;
        </p>

        {/* Explicação */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">
            Explicação
          </p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed">{question.explanation}</p>
        </div>

        {/* Botão */}
        <button
          ref={nextButtonRef}
          onClick={onNext}
          className="w-full bg-[#D97757] hover:bg-[#C4663F] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97757]"
        >
          {nextLabel}
        </button>
      </div>
    </motion.div>
  )
}
