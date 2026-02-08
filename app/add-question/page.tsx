// app/add-question/page.tsx
"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar' // adjust path if needed
import { addNewQuestion } from '@/app/actions/questions' // adjust path

export default function AddQuestionPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const result = await addNewQuestion(formData)

    if (result.success) {
      setSuccess(result.message || 'Question added successfully!')

      // Safe form reset
      if (formRef.current) {
        formRef.current.reset()
      }

      setTimeout(() => {
        router.push('/quiz')
      }, 1800)
    } else {
      setError(result.error || 'Failed to add question. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-200">
      <Navbar />

      <main className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500">
            Add New Question
          </h1>
          <p className="mt-4 text-yellow-600/90 text-lg font-medium">
            Contribute to the NextGenAI Knowledge Base
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-950/90 border border-yellow-700/40 rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/70 backdrop-blur-sm">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
            {/* Question */}
            <div>
              <label className="block text-yellow-500/80 text-sm font-medium mb-3 tracking-wide">
                QUESTION
              </label>
              <textarea
                name="question"
                placeholder="Enter the question here..."
                rows={3}
                className="w-full px-5 py-4 bg-black/60 border-2 border-yellow-700/50 rounded-xl text-yellow-300 placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/30 transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Options */}
            {['A', 'B', 'C', 'D'].map((label, index) => (
              <div key={index}>
                <label className="block text-yellow-500/80 text-sm font-medium mb-3 tracking-wide">
                  OPTION {label}
                </label>
                <input
                  name={`option${label}`}
                  type="text"
                  placeholder={`Option ${label}...`}
                  className="w-full px-5 py-4 bg-black/60 border-2 border-yellow-700/50 rounded-xl text-yellow-300 placeholder-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/30 transition-all duration-300"
                  required
                />
              </div>
            ))}

            {/* Correct Answer - FIXED version with visible selection */}
            <div>
              <label className="block text-yellow-500/80 text-sm font-medium mb-3 tracking-wide">
                SELECT CORRECT ANSWER
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      // Update hidden input value + visual state
                      const radio = document.querySelector(`input[name="correctIndex"][value="${i}"]`) as HTMLInputElement
                      if (radio) radio.checked = true
                    }}
                    className={`
                      relative py-5 px-8 rounded-xl font-bold text-xl transition-all duration-400
                      border-2 overflow-hidden group
                      ${
                        // Visual feedback when selected (using :has() or peer)
                        'bg-black/50 border-yellow-800/60 hover:border-yellow-500/80 hover:bg-yellow-900/20 hover:text-yellow-300 hover:scale-[1.02]'
                      }
                      has-[:checked]:bg-gradient-to-r has-[:checked]:from-yellow-600 has-[:checked]:to-amber-600
                      has-[:checked]:border-yellow-400 has-[:checked]:text-black
                      has-[:checked]:shadow-2xl has-[:checked]:shadow-yellow-500/50
                      has-[:checked]:scale-[1.06] has-[:checked]:animate-pulse-glow
                    `}
                  >
                    {/* Shine effect when selected */}
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent
                        -translate-x-full group-has-[:checked]:animate-shine transition-transform duration-1000
                      `}
                    />

                    <span className="relative z-10">
                      {String.fromCharCode(65 + i)}
                    </span>

                    {/* Green checkmark when selected */}
                    <span
                      className={`
                        absolute -top-2 -right-2 bg-green-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md
                        opacity-0 group-has-[:checked]:opacity-100 animate-pop-in
                      `}
                    >
                      ✓
                    </span>

                    {/* Hidden radio input */}
                    <input
                      type="radio"
                      name="correctIndex"
                      value={i}
                      className="sr-only"
                      required
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            {error && (
              <div className="bg-gradient-to-r from-red-950/70 to-red-900/40 border border-red-700/40 text-red-300 px-6 py-4 rounded-xl text-sm font-medium flex items-center gap-3">
                <span className="text-red-400 text-lg">⚠</span>
                {error}
              </div>
            )}

            {success && (
              <div className="bg-gradient-to-r from-green-950/70 to-green-900/40 border border-green-700/40 text-green-300 px-6 py-4 rounded-xl text-sm font-medium flex items-center gap-3">
                <span className="text-green-400 text-lg">✓</span>
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 
                         hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-400
                         text-black font-bold text-lg py-4 rounded-xl
                         transition-all duration-500 transform hover:scale-[1.03] active:scale-[0.98]
                         shadow-lg shadow-yellow-900/40 hover:shadow-yellow-700/50
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Adding...
                </>
              ) : (
                'ADD QUESTION'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}