"use client"

import { useEffect, useState } from 'react'

export default function Phase3() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(480) // 8 minutes = 480 seconds
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizStopped, setQuizStopped] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // 5 Tricky C Output Prediction Questions (MCQ with correct index 0-3)
  const questions = [
    {
      question: "What is the output of this C code?\n```c\n#include <stdio.h>\nint main() {\n  int x = 5;\n  printf(\"%d\", x++ + ++x);\n  return 0;\n}\n```",
      options: ["10", "11", "12", "Undefined / Compiler-dependent"],
      correct: 3 // undefined behavior due to multiple modifications without sequence point
    },
    {
      question: "What is printed by this program?\n```c\n#include <stdio.h>\nint main() {\n  int a = 10;\n  int *p = &a;\n  printf(\"%d\", *p++);\n  return 0;\n}\n```",
      options: ["10", "Address of a", "Garbage value", "11"],
      correct: 0 // *p++ dereferences first, then increments pointer (post-increment)
    },
    {
      question: "Predict the output:\n```c\n#include <stdio.h>\nint main() {\n  char str[] = \"Hello\";\n  printf(\"%c\", *(str+1));\n  return 0;\n}\n```",
      options: ["H", "e", "l", "o"],
      correct: 1 // pointer arithmetic: str+1 points to second char 'e'
    },
    {
      question: "What does this code output?\n```c\n#include <stdio.h>\nint main() {\n  int i = 1;\n  for (; i++ < 5; ) printf(\"%d \", i);\n  return 0;\n}\n```",
      options: ["1 2 3 4", "2 3 4 5", "1 2 3 4 5", "Infinite loop"],
      correct: 1 // i starts 1, condition i++ < 5 → checks 1<5 (true), increments to 2, prints 2... up to 5
    },
    {
      question: "What is the output?\n```c\n#include <stdio.h>\n#define SQR(x) x*x\nint main() {\n  int a = 5;\n  printf(\"%d\", SQR(a+1));\n  return 0;\n}\n```",
      options: ["25", "36", "30", "11"],
      correct: 3 // macro expansion: a+1*a+1 = 5+1*5+1 = 11 (no parentheses in macro)
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // 8-minute total timer
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

  // 20-second cooldown
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

    if (index !== questions[currentQuestion].correct) {
      setQuizStopped(true)
      setCooldown(20)
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setQuizCompleted(true)
      }
    }
  }

  const continueAfterCooldown = () => {
    setQuizStopped(false)
    setSelectedAnswer(null) // retry same question
  }

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-lg">Loading Phase 3...</div>
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
          Phase 3: Code Output Prediction
        </p>

        <p className="text-xl text-yellow-600 mb-6">
          5 Tricky C Questions • 8-minute total time • All must be correct
        </p>

        <p className="text-lg text-gray-300 mb-8">
          Predict the output. Wrong answer → 20-sec wait, continue from same question.
        </p>

        <div className="text-4xl font-bold text-yellow-400 mb-10">
          Time Left: {formatTime(timeLeft)}
        </div>

        {quizCompleted ? (
          <div className="bg-green-900/40 border border-green-700 rounded-xl p-8 mb-10">
            <h2 className="text-3xl font-bold text-green-400 mb-4">All 5 Correct!</h2>
            <p className="text-lg text-gray-200 mb-6">
              Great job on C output prediction, Tanish! You're moving up.
            </p>
            <a
              href="/phase-4" // ← CHANGE TO YOUR ACTUAL NEXT PHASE URL
              className="w-full max-w-md mx-auto block px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl rounded-xl border border-green-500 hover:from-green-500 hover:to-emerald-500 transition-colors"
            >
              Go to Next Phase
            </a>
          </div>
        ) : (
          <>
            <div className="bg-gray-900/60 border border-yellow-900 rounded-xl p-6 mb-10 text-left">
              <h3 className="text-2xl font-bold text-yellow-300 mb-6">
                Question {currentQuestion + 1} of 5
              </h3>
              <pre className="text-lg text-gray-200 mb-6 whitespace-pre-wrap font-mono">
                {questions[currentQuestion].question}
              </pre>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={quizStopped || quizCompleted || cooldown > 0 || selectedAnswer !== null}
                    className={`w-full text-left px-5 py-4 rounded-lg border transition-colors ${
                      selectedAnswer === idx
                        ? idx === questions[currentQuestion].correct
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
                <h2 className="text-2xl font-bold text-red-400 mb-3">Quiz Paused</h2>
                <p className="text-gray-200 mb-4">
                  {timeLeft <= 0 ? "Time's up!" : "Wrong answer!"}
                </p>

                {cooldown > 0 ? (
                  <p className="text-yellow-300 text-lg">
                    Wait {cooldown} seconds...
                  </p>
                ) : (
                  <button
                    onClick={continueAfterCooldown}
                    className="mt-4 px-8 py-4 bg-yellow-600 text-black font-bold text-lg rounded-xl hover:bg-yellow-500 transition-colors"
                  >
                    Continue from Question {currentQuestion + 1}
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