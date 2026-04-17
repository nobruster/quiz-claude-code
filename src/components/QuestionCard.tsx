'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { Question } from '@/types/quiz'
import { QUESTIONS_PER_LEVEL } from '@/data/questions'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  levelLabel: string
  onAnswer: (answer: boolean) => void
}

export default function QuestionCard({
  question,
  questionNumber,
  levelLabel,
  onAnswer,
}: QuestionCardProps) {
  const trueButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    trueButtonRef.current?.focus()
  }, [question])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') onAnswer(true)
      if (e.key === 'f' || e.key === 'F') onAnswer(false)
    },
    [onAnswer],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
        {/* Progresso */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-[#6B7280]">
              Nível {levelLabel}
            </span>
            <span className="text-xs font-medium text-[#6B7280]">
              {questionNumber} / {QUESTIONS_PER_LEVEL}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={questionNumber}
            aria-valuemin={1}
            aria-valuemax={QUESTIONS_PER_LEVEL}
            aria-label={`Pergunta ${questionNumber} de ${QUESTIONS_PER_LEVEL}`}
            className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-[#D97757] rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / QUESTIONS_PER_LEVEL) * 100}%` }}
            />
          </div>
        </div>

        {/* Label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-[#D97757] mb-3">
          Verdadeiro ou Falso?
        </p>

        {/* Afirmação */}
        <p id="question-statement" className="text-lg font-medium text-[#1A1A1A] leading-relaxed mb-8">
          {question.statement}
        </p>

        {/* Botões */}
        <div
          role="group"
          aria-labelledby="question-statement"
          className="grid grid-cols-2 gap-3"
        >
          <button
            ref={trueButtonRef}
            onClick={() => onAnswer(true)}
            aria-label="Verdadeiro (atalho: T)"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#22C55E] text-[#22C55E] font-semibold text-sm hover:bg-[#22C55E] hover:text-white transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
          >
            <span aria-hidden="true">✓</span>
            Verdadeiro
          </button>
          <button
            onClick={() => onAnswer(false)}
            aria-label="Falso (atalho: F)"
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#EF4444] text-[#EF4444] font-semibold text-sm hover:bg-[#EF4444] hover:text-white transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EF4444]"
          >
            <span aria-hidden="true">✗</span>
            Falso
          </button>
        </div>
      </div>
    </motion.div>
  )
}
