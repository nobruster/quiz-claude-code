'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { QuizState, UserAnswer } from '@/types/quiz'
import { getQuestionsByLevel, getNextLevel, LEVEL_LABELS, LEVELS, QUESTIONS_PER_LEVEL } from '@/data/questions'
import StartScreen from '@/components/StartScreen'
import NameScreen from '@/components/NameScreen'
import QuestionCard from '@/components/QuestionCard'
import FeedbackCard from '@/components/FeedbackCard'
import LevelTransition from '@/components/LevelTransition'
import ResultScreen from '@/components/ResultScreen'

const INITIAL_STATE: QuizState = {
  currentQuestionIndex: 0,
  currentLevel: 'iniciante',
  answers: [],
  phase: 'start',
  playerName: '',
}

export default function QuizPage() {
  const [state, setState] = useState<QuizState>(INITIAL_STATE)

  const currentLevelQuestions = getQuestionsByLevel(state.currentLevel)
  const currentQuestion = currentLevelQuestions[state.currentQuestionIndex]
  const isLastInLevel = state.currentQuestionIndex === currentLevelQuestions.length - 1
  const isLastLevel = state.currentLevel === LEVELS[LEVELS.length - 1]
  const nextLevel = getNextLevel(state.currentLevel)

  const levelAnswers = state.answers.filter((a) => a.level === state.currentLevel)
  const levelScore = levelAnswers.filter((a) => a.correct).length

  function handleStart() {
    setState((prev) => ({ ...prev, phase: 'name' }))
  }

  function handleNameSubmit(name: string) {
    setState((prev) => ({ ...prev, playerName: name, phase: 'question' }))
  }

  function handleAnswer(userAnswer: boolean) {
    const isCorrect = userAnswer === currentQuestion.answer
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      userAnswer,
      correct: isCorrect,
      level: state.currentLevel,
    }
    setState((prev) => ({
      ...prev,
      answers: [...prev.answers, newAnswer],
      phase: 'feedback',
    }))
  }

  function handleNext() {
    if (isLastInLevel && isLastLevel) {
      setState((prev) => ({ ...prev, phase: 'result' }))
    } else if (isLastInLevel) {
      setState((prev) => ({ ...prev, phase: 'levelTransition' }))
    } else {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        phase: 'question',
      }))
    }
  }

  function handleContinueLevel() {
    const level = getNextLevel(state.currentLevel)
    if (!level) return
    setState((prev) => ({
      ...prev,
      currentLevel: level,
      currentQuestionIndex: 0,
      phase: 'question',
    }))
  }

  function handleRestart() {
    setState(INITIAL_STATE)
  }

  const nextLabel =
    isLastInLevel && isLastLevel
      ? 'Ver resultado final'
      : isLastInLevel
        ? 'Ver resultado do nível'
        : 'Próxima pergunta'

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[560px]">
        <AnimatePresence mode="wait">
          {state.phase === 'start' && (
            <div key="start">
              <StartScreen onStart={handleStart} />
            </div>
          )}

          {state.phase === 'name' && (
            <div key="name">
              <NameScreen
                onStart={handleNameSubmit}
                onBack={() => setState((prev) => ({ ...prev, phase: 'start' }))}
              />
            </div>
          )}

          {state.phase === 'question' && currentQuestion && (
            <div key={`q-${currentQuestion.id}`}>
              <QuestionCard
                question={currentQuestion}
                questionNumber={state.currentQuestionIndex + 1}
                levelLabel={LEVEL_LABELS[state.currentLevel]}
                onAnswer={handleAnswer}
              />
            </div>
          )}

          {state.phase === 'feedback' && currentQuestion && (
            <div key={`f-${currentQuestion.id}`}>
              <FeedbackCard
                question={currentQuestion}
                isCorrect={state.answers[state.answers.length - 1]?.correct ?? false}
                onNext={handleNext}
                nextLabel={nextLabel}
              />
            </div>
          )}

          {state.phase === 'levelTransition' && nextLevel && (
            <div key={`lt-${state.currentLevel}`}>
              <LevelTransition
                completedLevel={LEVEL_LABELS[state.currentLevel]}
                nextLevel={LEVEL_LABELS[nextLevel]}
                score={levelScore}
                total={QUESTIONS_PER_LEVEL}
                onContinue={handleContinueLevel}
              />
            </div>
          )}

          {state.phase === 'result' && (
            <div key="result">
              <ResultScreen
                answers={state.answers}
                playerName={state.playerName}
                onRestart={handleRestart}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
