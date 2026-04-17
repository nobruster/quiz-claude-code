'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface StartScreenProps {
  onStart: () => void
}

const levels = [
  { label: 'Iniciante', description: 'Conceitos e proposta de valor', color: '#22C55E' },
  { label: 'Intermediário', description: 'Comandos, CLI e uso diário', color: '#D97757' },
  { label: 'Avançado', description: 'Agentes, MCP e hooks', color: '#6366F1' },
]

export default function StartScreen({ onStart }: StartScreenProps) {
  const startButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    startButtonRef.current?.focus()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D97757]/10 mb-4">
            <span className="text-2xl">🤖</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            Você conhece o Claude Code?
          </h1>
          <p className="text-[#6B7280] text-sm">
            15 perguntas · 3 níveis · Verdadeiro ou Falso
          </p>
        </div>

        {/* Níveis */}
        <div className="space-y-3 mb-8">
          {levels.map((level, i) => (
            <div
              key={level.label}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: level.color }}
              >
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">{level.label}</p>
                <p className="text-xs text-[#6B7280]">{level.description}</p>
              </div>
              <span className="ml-auto text-xs text-[#6B7280] font-medium">5 perguntas</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          ref={startButtonRef}
          onClick={onStart}
          className="w-full bg-[#D97757] hover:bg-[#C4663F] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97757]"
        >
          Começar o Quiz
        </button>
      </div>
    </motion.div>
  )
}
