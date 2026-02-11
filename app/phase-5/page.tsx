"use client"

import { useEffect, useState } from 'react'

export default function Phase5() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes total
  const [currentRiddle, setCurrentRiddle] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizStopped, setQuizStopped] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // 5 AI-themed logic riddles focused on AI in learning & education
  const riddles = [
    {
      title: "Riddle 1 – The Perfect Tutor",
      riddle: "I know everything you've ever studied, yet I never went to school.\nI adapt to your pace, but I have no heartbeat.\nI can teach a million students at once, but I never get tired.\nWhat am I?",
      options: [
        "A very smart human teacher",
        "An AI-powered personalized learning system",
        "A printed encyclopedia",
        "A group of classmates helping each other"
      ],
      correct: 1,
      explanation: "An AI tutor (like adaptive learning platforms) knows your history, adjusts difficulty in real-time, scales infinitely, and never fatigues — unlike humans or books."
    },
    {
      title: "Riddle 2 – The Invisible Classroom",
      riddle: "Students from every continent sit together every day.\nNo building exists, yet everyone sees the same board.\nThe teacher has no face, but knows every student's name.\nWhat kind of classroom is this in 2050?",
      options: [
        "A traditional school with video calls",
        "A global immersive VR classroom powered by AI",
        "A massive open-air lecture",
        "A library reading room"
      ],
      correct: 1,
      explanation: "In the near future, AI-driven VR/AR classrooms allow borderless, synchronous learning with holographic teachers or AI avatars that personalize interaction for each student."
    },
    {
      title: "Riddle 3 – The Grade That Never Lies",
      riddle: "I watch you struggle, but never judge your effort.\nI give perfect scores without favoritism.\nI learn from millions of wrong answers to predict yours.\nYet I am not a teacher, examiner, nor parent.\nWhat am I?",
      options: [
        "An auto-grading AI system",
        "A very fair human professor",
        "A lucky coin flip",
        "A group project evaluation"
      ],
      correct: 0,
      explanation: "Modern AI auto-graders (used in platforms like Coursera, Khan Academy, or custom LMS) analyze patterns across millions of submissions, provide instant unbiased feedback, and improve over time — without human bias."
    },
    {
      title: "Riddle 4 – The Memory That Forgets Nothing",
      riddle: "I store every note you ever took, every question you asked,\nevery mistake you made in math at 2 a.m.\nI remind you before you forget, but I have no brain of my own.\nIn education 2050, what am I?",
      options: [
        "A very large USB drive",
        "An AI lifelong learning companion / memory augmentation system",
        "Your best friend who takes notes",
        "A school diary"
      ],
      correct: 1,
      explanation: "Future AI companions (neural-linked or app-based) act as external memory, spaced-repetition tutors, and proactive reminders — turning lifelong learning into a seamless, personalized process."
    },
    {
      title: "Riddle 5 – The Emotion-Reading Professor",
      riddle: "I see when you're confused before you raise your hand.\nI slow down when you're stressed, speed up when you're bored.\nI have no eyes, yet I read your face perfectly.\nIn the classroom of tomorrow, who am I?",
      options: [
        "A very empathetic human teacher",
        "An AI emotion-aware adaptive learning system",
        "A hidden camera in the room",
        "A magic crystal ball"
      ],
      correct: 1,
      explanation: "Advanced AI in education uses computer vision + affective computing to detect confusion, frustration, engagement via facial expressions, tone, and biometrics — then dynamically adjusts content in real time."
    }
  ]

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

    if (index !== riddles[currentRiddle].correct) {
      setQuizStopped(true)
      setCooldown(20)
    } else {
      if (currentRiddle < riddles.length - 1) {
        setCurrentRiddle(currentRiddle + 1)
        setSelectedAnswer(null)
      } else {
        setQuizCompleted(true)
      }
    }
  }

  const continueAfterCooldown = () => {
    setQuizStopped(false)
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
        <div className="text-yellow-500 text-lg">Loading Phase 5...</div>
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
          Phase 5: Logic Riddles
        </p>

        <p className="text-xl text-yellow-600 mb-6">
          5 AI in Learning & Education Riddles • 10-minute total
        </p>

        <p className="text-lg text-gray-300 mb-8">
          Think like the future of education.<br />
          Wrong answer → 20-sec wait, continue from same riddle.
        </p>

        <div className="text-4xl font-bold text-yellow-400 mb-10">
          Time Left: {formatTime(timeLeft)}
        </div>

        {quizCompleted ? (
          <div className="bg-green-900/40 border border-green-700 rounded-xl p-8 mb-10">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Master of AI Learning Logic!</h2>
            <p className="text-lg text-gray-200 mb-6">
              You decoded the future of education, Tanish.<br />
              All 5 riddles solved perfectly.
            </p>
            <a
              href="/phase-6" // ← CHANGE TO YOUR ACTUAL NEXT PHASE URL (or final dashboard/certification)
              className="w-full max-w-md mx-auto block px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl rounded-xl border border-green-500 hover:from-green-500 hover:to-emerald-500 transition-colors"
            >
              Proceed to Next Phase
            </a>
          </div>
        ) : (
          <>
            <div className="bg-gray-900/60 border border-yellow-900 rounded-xl p-6 mb-10 text-left">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                Riddle {currentRiddle + 1} of 5 – {riddles[currentRiddle].title}
              </h3>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                {riddles[currentRiddle].riddle}
              </p>

              <div className="space-y-4">
                {riddles[currentRiddle].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={quizStopped || quizCompleted || cooldown > 0 || selectedAnswer !== null}
                    className={`w-full text-left px-5 py-4 rounded-lg border transition-colors ${
                      selectedAnswer === idx
                        ? idx === riddles[currentRiddle].correct
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
                <h2 className="text-2xl font-bold text-red-400 mb-3">Not Quite</h2>

                <pre className="text-base text-gray-300 mb-6 p-4 bg-black/50 rounded-lg whitespace-pre-wrap font-mono">
                  {riddles[currentRiddle].explanation}
                </pre>

                {cooldown > 0 ? (
                  <p className="text-yellow-300 text-lg">
                    Wait {cooldown} seconds...
                  </p>
                ) : (
                  <button
                    onClick={continueAfterCooldown}
                    className="mt-4 px-8 py-4 bg-yellow-600 text-black font-bold text-lg rounded-xl hover:bg-yellow-500 transition-colors"
                  >
                    Try Riddle {currentRiddle + 1} Again
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