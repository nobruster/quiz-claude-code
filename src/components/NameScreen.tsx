'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NameScreenProps {
  onStart: (name: string) => void
  onBack: () => void
}

export default function NameScreen({ onStart, onBack }: NameScreenProps) {
  const [name, setName] = useState('')
  const trimmed = name.trim()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (trimmed.length < 2) return
    onStart(trimmed)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
        <button
          onClick={onBack}
          className="text-xs text-[#6B7280] hover:text-[#1A1A1A] mb-6 flex items-center gap-1 transition-colors cursor-pointer"
        >
          ← Voltar
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D97757]/10 mb-4">
            <span className="text-2xl">✏️</span>
          </div>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">
            Como quer ser identificado?
          </h2>
          <p className="text-sm text-[#6B7280]">
            Seu nome aparecerá no ranking ao final do quiz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome ou apelido"
              maxLength={40}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E7EB] focus:border-[#D97757] outline-none text-[#1A1A1A] text-sm transition-colors placeholder:text-[#9CA3AF]"
            />
            <p className="text-xs text-[#9CA3AF] mt-1.5 text-right">{name.length}/40</p>
          </div>

          <button
            type="submit"
            disabled={trimmed.length < 2}
            className="w-full bg-[#D97757] hover:bg-[#C4663F] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm cursor-pointer disabled:cursor-not-allowed"
          >
            Começar o Quiz
          </button>
        </form>
      </div>
    </motion.div>
  )
}
