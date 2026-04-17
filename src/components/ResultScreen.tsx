'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { UserAnswer } from '@/types/quiz'
import { LEVELS, LEVEL_LABELS, QUESTIONS_PER_LEVEL } from '@/data/questions'
import { saveResult, getBadge, calcScores } from '@/lib/results'

const TOTAL_QUESTIONS = LEVELS.length * QUESTIONS_PER_LEVEL

const BADGE_META: Record<string, { emoji: string; description: string }> = {
  'Explorando o Claude Code': { emoji: '🌱', description: 'Continue aprendendo — você está no início da jornada!' },
  'Usuário Claude Code': { emoji: '💡', description: 'Bom conhecimento! Explore os recursos avançados.' },
  'Especialista Claude Code': { emoji: '⚡', description: 'Impressionante! Você domina bem o Claude Code.' },
  'Claude Code Master': { emoji: '🏆', description: 'Perfeito! Você conhece o Claude Code de ponta a ponta.' },
}

interface ResultScreenProps {
  answers: UserAnswer[]
  playerName: string
  onRestart: () => void
}

export default function ResultScreen({ answers, playerName, onRestart }: ResultScreenProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
  const restartButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    restartButtonRef.current?.focus()
  }, [])

  const { byLevel, total: totalScore } = calcScores(answers)
  const badgeTitle = getBadge(totalScore)
  const { emoji, description } = BADGE_META[badgeTitle] ?? { emoji: '🎯', description: '' }
  const pct = Math.round((totalScore / TOTAL_QUESTIONS) * 100)

  useEffect(() => {
    setSaved('saving')
    saveResult(playerName, answers).then(({ error }) => {
      setSaved(error ? 'error' : 'done')
    })
  }, [playerName, answers])

  const handleShare = async () => {
    const text = `Fiz o quiz "Você conhece o Claude Code?" e acertei ${totalScore}/${TOTAL_QUESTIONS}!\nMeu nível: ${badgeTitle} ${emoji}\n\nQue tal testar o seu?`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback silencioso
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
        {/* Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D97757]/10 mb-3">
            <span className="text-3xl">{emoji}</span>
          </div>
          <p className="text-xs text-[#6B7280] mb-1">Parabéns, {playerName}!</p>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">{badgeTitle}</h2>
          <p className="text-sm text-[#6B7280]">{description}</p>
        </div>

        {/* Score total */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-5 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#6B7280]">Pontuação total</span>
            <span className="text-sm font-bold text-[#1A1A1A]">{pct}%</span>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-bold text-[#1A1A1A]">{totalScore}</span>
            <span className="text-lg text-[#6B7280] mb-1">/ {TOTAL_QUESTIONS}</span>
          </div>
          <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D97757] rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Por nível */}
        <div className="space-y-2 mb-5">
          {byLevel.map(({ label, correct, total }) => {
            const levelPct = Math.round((correct / total) * 100)
            return (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#6B7280] w-24 flex-shrink-0">{label}</span>
                <div className="flex-1 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#D97757] rounded-full" style={{ width: `${levelPct}%` }} />
                </div>
                <span className="text-xs font-semibold text-[#1A1A1A] w-8 text-right">{correct}/{total}</span>
              </div>
            )
          })}
        </div>

        {/* Status do save */}
        <div className="mb-5 text-center">
          {saved === 'saving' && <p className="text-xs text-[#6B7280]">💾 Salvando resultado...</p>}
          {saved === 'done' && (
            <Link href="/ranking" className="text-xs font-semibold text-[#D97757] hover:underline">
              🏅 Ver ranking completo →
            </Link>
          )}
          {saved === 'error' && <p className="text-xs text-[#EF4444]">Não foi possível salvar o resultado.</p>}
        </div>

        {/* Ações */}
        <div className="grid grid-cols-2 gap-3">
          <button
            ref={restartButtonRef}
            onClick={onRestart}
            className="py-3 rounded-xl border-2 border-[#E5E7EB] text-[#1A1A1A] font-semibold text-sm hover:border-[#D97757] hover:text-[#D97757] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97757]"
          >
            Jogar novamente
          </button>
          <button
            onClick={handleShare}
            aria-label={copied ? 'Resultado copiado!' : 'Compartilhar resultado'}
            className="py-3 rounded-xl bg-[#D97757] hover:bg-[#C4663F] text-white font-semibold text-sm transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97757]"
          >
            {copied ? '✓ Copiado!' : 'Compartilhar'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
