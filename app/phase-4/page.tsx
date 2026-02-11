"use client"

import { useEffect, useState } from 'react'

export default function Phase4() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes total
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizStopped, setQuizStopped] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  // Single buggy code challenge
  const challenge = {
    title: "Debug the Room – The Hidden Door",
    question: "This code is supposed to print a secret room number, but it crashes or prints garbage. Fix it.",
    code: `#include <stdio.h>\nint main() {\n  int room = 4512;\n  char *msg = "Room ";\n  printf(msg + "%d", room);\n  return 0;\n}`,
    options: [
      "Change line to: printf(\"%s%d\", msg, room);",
      "Change line to: printf(msg \"%d\", room);",
      "Change line to: printf(\"Room %d\", room);",
      "No change needed – code is correct"
    ],
    correct: 0, // correct fix: use %s for string + %d for int
    explanationWrong: "Wrong fix.\n\nWhy it fails:\n• You cannot concatenate string literal + format specifier like that in printf.\n• `msg + \"%d\"` is pointer arithmetic → it moves the pointer inside the string and treats \"%d\" as part of the format → undefined behavior or garbage.\n\nCorrect way: use separate format specifiers \"%s%d\" and pass both arguments.",
    roomNumber: "4512" // revealed only on correct answer
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !quizStopped && !quizCompleted) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
    if (timeLeft <= 0 && !quizStopped && !quizCompleted) {
      setQuizStopped(true)
    }
  }, [timeLeft, quizStopped, quizCompleted])

  useEffect(() => {
    if (cooldown > 0) {
      const cd = setInterval(() => {
        setCooldown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(cd)
    }
  }, [cooldown])

  const handleAnswer = (index: number) => {
    if (quizStopped || quizCompleted || cooldown > 0 || selectedAnswer !== null) return
    setSelectedAnswer(index)

    if (index !== challenge.correct) {
      setQuizStopped(true)
      setShowExplanation(true)
      setCooldown(20)
    } else {
      setQuizCompleted(true)
    }
  }

  const continueAfterCooldown = () => {
    setQuizStopped(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
  }

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-lg">Loading Phase 4...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-200 px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-400">
            NextGenAI
          </span>
        </h1>

        <p className="text-3xl sm:text-4xl text-yellow-500 font-bold mb-4">
          Phase 4: Debug the Room
        </p>

        <p className="text-xl text-yellow-600 mb-6">
          Fix the Bug – Reveal the Room Number
        </p>

        <p className="text-lg text-gray-300 mb-8">
          One buggy C code. Choose the correct fix.<br />
          Wrong → explanation + 20-second wait.<br />
          Correct → room number revealed.
        </p>

        <div className="text-4xl font-bold text-yellow-400 mb-10">
          Time Left: {formatTime(timeLeft)}
        </div>

        {quizCompleted ? (
          <div className="bg-green-900/40 border border-green-700 rounded-xl p-8 mb-10">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Door Unlocked!</h2>
            <p className="text-4xl font-extrabold text-yellow-300 mb-6">
              Room {challenge.roomNumber}
            </p>
            <p className="text-lg text-gray-200 mb-6">
              Excellent debugging, Tanish!<br />
              The room number is now revealed.
            </p>
            <a
              href="/phase-5" // ← replace with your real next phase URL
              className="w-full max-w-md mx-auto block px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl rounded-xl border border-green-500 hover:from-green-500 hover:to-emerald-500 transition-colors"
            >
              Proceed to Next Phase
            </a>
          </div>
        ) : (
          <>
            <div className="bg-gray-900/60 border border-yellow-900 rounded-xl p-6 mb-10 text-left">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                {challenge.title}
              </h3>
              <p className="text-lg text-gray-200 mb-4">
                {challenge.question}
              </p>
              <pre className="text-base text-gray-300 mb-6 p-4 bg-black/50 rounded-lg overflow-auto font-mono whitespace-pre-wrap">
                {challenge.code}
              </pre>

              <div className="space-y-4">
                {challenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={quizStopped || quizCompleted || cooldown > 0 || selectedAnswer !== null}
                    className={`w-full text-left px-5 py-4 rounded-lg border transition-colors ${
                      selectedAnswer === idx
                        ? idx === challenge.correct
                          ? 'bg-green-800 border-green-600 text-white'
                          : 'bg-red-800 border-red-600 text-white'
                        : 'bg-gray-800 border-yellow-800 text-gray-200'
                    } ${
                      (quizStopped || cooldown > 0 || selectedAnswer !== null) && 'opacity-70 cursor-not-allowed'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {option}
                  </button>
                ))}
              </div>
            </div>

            {quizStopped && !quizCompleted && (
              <div className="bg-red-900/40 border border-red-700 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-red-400 mb-3">Incorrect Fix</h2>

                {showExplanation && (
                  <pre className="text-base text-gray-300 mb-6 p-4 bg-black/50 rounded-lg whitespace-pre-wrap font-mono">
                    {challenge.explanationWrong}
                  </pre>
                )}

                {cooldown > 0 ? (
                  <p className="text-yellow-300 text-lg">
                    Wait {cooldown} seconds before retry...
                  </p>
                ) : (
                  <button
                    onClick={continueAfterCooldown}
                    className="mt-4 px-8 py-4 bg-yellow-600 text-black font-bold text-lg rounded-xl hover:bg-yellow-500 transition-colors"
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}