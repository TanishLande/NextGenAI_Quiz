"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAllQuestions } from '@/app/actions/quiz' // adjust path

interface Question {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

const LOCK_TIMES = [0, 30, 60, 120, 300] // seconds

export default function QuizPage() {
  const router = useRouter()

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [wrongCountThisQ, setWrongCountThisQ] = useState(0)
  const [lockUntil, setLockUntil] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const current = questions[currentIndex]
  const isLocked = Date.now() < lockUntil

  // Fetch questions once
  useEffect(() => {
    async function fetchData() {
      const result = await getAllQuestions()
      if (result.success && result.questions) {
        setQuestions(result.questions)
      } else {
        setErrorMsg(result.error || 'Failed to load quiz')
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // Lock timer
  useEffect(() => {
    if (!isLocked) return

    const remaining = Math.ceil((lockUntil - Date.now()) / 1000)
    setTimeLeft(remaining)

    const timer = setInterval(() => {
      const newRemaining = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000))
      setTimeLeft(newRemaining)
      if (newRemaining <= 0) clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [lockUntil, isLocked])

  const selectOption = (idx: number) => {
    if (isLocked || showFeedback) return
    setSelected(idx)
  }

  const submitAnswer = () => {
    if (selected === null || isLocked) return

    const correct = selected === current.correctIndex
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(prev => prev + 1)
      setWrongCountThisQ(0)
    } else {
      const newWrong = wrongCountThisQ + 1
      setWrongCountThisQ(newWrong)
      const penalty = LOCK_TIMES[Math.min(newWrong, LOCK_TIMES.length - 1)]
      setLockUntil(Date.now() + penalty * 1000)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      resetCurrent()
    } else {
      // Quiz finished
      alert(`Quiz completed!\nYour score: ${score} / ${questions.length}`)
      router.push('/')
    }
  }

  const resetCurrent = () => {
    setSelected(null)
    setIsCorrect(null)
    setShowFeedback(false)
    setWrongCountThisQ(0)
    setLockUntil(0)
    setTimeLeft(0)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-yellow-500 text-xl">
      Loading quiz...
    </div>
  )

  if (errorMsg) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
      {errorMsg}
    </div>
  )

  if (questions.length === 0) return (
    <div className="min-h-screen flex items-center justify-center text-yellow-500 text-xl">
      No questions available yet.
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-200">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500">
            NextGenAI Knowledge Trial
          </h1>
          <p className="mt-3 text-yellow-600/90 text-base sm:text-lg">
            Discipline. Precision. Only the worthy proceed.
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-3 sm:gap-6 bg-black/60 border border-yellow-800/40 rounded-full px-4 py-2 text-sm sm:text-base">
            <span className="text-yellow-500 font-bold">
              Q {currentIndex + 1} / {questions.length}
            </span>
            <div className="h-2 w-24 sm:w-32 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-600 to-amber-500 transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-yellow-500 font-bold">
              Score: {score}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="relative bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-950/90 border border-yellow-700/40 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/70 backdrop-blur-sm">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mb-6 leading-tight">
            {current.question}
          </h2>

          <div className="grid gap-4">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => selectOption(idx)}
                disabled={isLocked || showFeedback}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 text-sm sm:text-base
                  ${selected === idx
                    ? isCorrect === null
                      ? 'border-yellow-500 bg-yellow-900/30'
                      : isCorrect
                      ? 'border-green-600 bg-green-900/40'
                      : 'border-red-600 bg-red-900/40'
                    : 'border-yellow-800/60 hover:border-yellow-600 bg-black/50 hover:bg-black/70'
                  }
                  ${showFeedback && idx === current.correctIndex ? 'border-green-500 bg-green-900/30' : ''}
                  ${(isLocked || showFeedback) && 'opacity-60 cursor-not-allowed'}
                `}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold shrink-0
                  ${selected === idx ? 'bg-yellow-600 text-black' : 'bg-gray-800 text-gray-400'}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="break-words">{opt}</span>
              </button>
            ))}
          </div>

          {/* Lock overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
              <div className="text-center px-6">
                <div className="text-red-400 text-2xl font-bold mb-3">Locked</div>
                <div className="text-yellow-500 text-xl mb-2">
                  {timeLeft}s remaining
                </div>
                <div className="text-gray-400 text-sm">
                  Penalty ({wrongCountThisQ}× wrong)
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {!showFeedback && !isLocked ? (
              <button
                onClick={submitAnswer}
                disabled={selected === null}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-black font-bold rounded-xl shadow-lg disabled:opacity-50 transition hover:scale-105"
              >
                Submit Answer
              </button>
            ) : showFeedback ? isCorrect ? (
              <>
                <div className="px-8 py-4 bg-green-900/50 border border-green-700 rounded-xl text-green-300">
                  Correct!
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 text-black font-bold rounded-xl shadow-lg transition hover:scale-105"
                >
                  Next →
                </button>
              </>
            ) : (
              <>
                <div className="px-8 py-4 bg-red-900/50 border border-red-700 rounded-xl text-red-300">
                  Wrong
                </div>
                <button
                  onClick={() => {
                    setShowFeedback(false)
                    setSelected(null)
                    setIsCorrect(null)
                  }}
                  className="w-full sm:w-auto px-10 py-4 border-2 border-yellow-700 text-yellow-400 hover:bg-yellow-800/30 rounded-xl transition"
                >
                  Try Again
                </button>
              </>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  )
}