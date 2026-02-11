"use client"

import { useEffect, useState } from 'react'

export default function Phase2() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes total
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizStopped, setQuizStopped] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions = [
    {
      question: "What is the full form of AI?",
      options: ["Advanced Intelligence", "Artificial Intelligence", "Automated Integration", "Active Inference"],
      correct: 1
    },
    {
      question: "Who is considered the father of Artificial Intelligence?",
      options: ["Alan Turing", "John McCarthy", "Elon Musk", "Geoffrey Hinton"],
      correct: 1
    },
    {
      question: "Which of these is NOT a main type of Machine Learning?",
      options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Predictive Coding"],
      correct: 3
    },
    {
      question: "What does a neural network primarily try to mimic?",
      options: ["Human digestive system", "Human brain neurons", "Human eye vision", "Human muscle movement"],
      correct: 1
    },
    {
      question: "What is the goal of Artificial Intelligence?",
      options: ["To replace all humans", "To create machines that perform tasks requiring human intelligence", "To make computers faster", "To store infinite data"],
      correct: 1
    },
    {
      question: "Which is an example of Narrow AI (Weak AI)?",
      options: ["Self-aware robot", "ChatGPT", "General problem-solving AI", "Human-level reasoning AI"],
      correct: 1
    },
    {
      question: "In supervised learning, what is required?",
      options: ["Labeled data", "No data at all", "Random data", "Only images"],
      correct: 0
    },
    {
      question: "What is overfitting in machine learning?",
      options: ["Model performs too well on training data but poorly on new data", "Model is too simple", "Model has too few parameters", "Model ignores training data"],
      correct: 0
    },
    {
      question: "What does 'Deep Learning' primarily use?",
      options: ["Shallow neural networks", "Multi-layer neural networks", "Rule-based systems", "Simple decision trees"],
      correct: 1
    },
    {
      question: "Which field is NOT closely related to AI?",
      options: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Traditional Arithmetic"],
      correct: 3
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // Main 10-minute timer
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
      // Correct → move forward
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
    setSelectedAnswer(null) // allow choosing again on the same question
  }

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-lg">Loading Phase 2...</div>
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
          Phase 2: AI Quiz Challenge
        </p>

        <p className="text-xl text-yellow-600 mb-6">
          10 MCQs • 10-minute total time • Must get all correct
        </p>

        <p className="text-lg text-gray-300 mb-8">
          Wrong answer → 20-second wait, then continue from same question
        </p>

        <div className="text-4xl font-bold text-yellow-400 mb-10">
          Time Left: {formatTime(timeLeft)}
        </div>

        {quizCompleted ? (
          <div className="bg-green-900/40 border border-green-700 rounded-xl p-8 mb-10">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Perfect Score!</h2>
            <p className="text-lg text-gray-200 mb-6">
              All 10 correct — well done, Tanish!
            </p>
            <a
              href="/phase-3" // ← replace with your real next phase URL
              className="w-full max-w-md mx-auto block px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl rounded-xl border border-green-500 hover:from-green-500 hover:to-emerald-500 transition-colors"
            >
              Go to Next Phase
            </a>
          </div>
        ) : (
          <>
            <div className="bg-gray-900/60 border border-yellow-900 rounded-xl p-6 mb-10 text-left">
              <h3 className="text-2xl font-bold text-yellow-300 mb-6">
                Question {currentQuestion + 1} of 10
              </h3>
              <p className="text-xl text-gray-200 mb-6">
                {questions[currentQuestion].question}
              </p>

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