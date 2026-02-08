"use client"

import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'

export default function LoginPage() {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const CORRECT_PASSCODE = 'NextGenAI2024'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (passcode === CORRECT_PASSCODE) {
      document.cookie = `auth_token=authenticated_${Date.now()}; path=/; max-age=86400; SameSite=Strict`

      setTimeout(() => {
        router.push('/')
      }, 300)
    } else {
      setError('Invalid passcode. Please try again.')
      setIsLoading(false)
      setPasscode('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center px-5 sm:px-6 lg:px-8">
      {/* Very subtle animated background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Title area */}
        <div className="text-center mb-10">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 animate-gradient-x">
              NextGenAI
            </span>
          </h1>
          <p className="mt-3 text-yellow-600/80 font-medium tracking-[0.35em] text-sm uppercase">
            Elite Access • College Chapter
          </p>
        </div>

        {/* Main card */}
        <div className="bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-950/90 backdrop-blur-sm border border-yellow-600/30 rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/70 relative overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/3 to-transparent pointer-events-none"></div>

          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center tracking-wide">
            Divine Portal
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label
                htmlFor="passcode"
                className="block text-yellow-500/80 text-sm font-medium mb-3 tracking-wide"
              >
                ENTER THE KEY
              </label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-5 py-4 bg-black/60 border-2 border-yellow-700/50 rounded-xl text-yellow-300 placeholder-gray-600 
                           focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/30 focus:bg-black/70
                           transition-all duration-300 shadow-inner"
                placeholder="············"
                required
                autoFocus
                autoComplete="off"
              />
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-950/70 to-red-900/40 border border-red-700/40 text-red-300 px-5 py-4 rounded-xl text-sm font-medium flex items-center gap-3">
                <span className="text-red-400 text-lg">⚠</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 
                         hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-400
                         text-black font-bold text-lg py-4 rounded-xl
                         transition-all duration-500 transform hover:scale-[1.03] active:scale-[0.98]
                         shadow-lg shadow-yellow-900/40 hover:shadow-yellow-700/50
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100
                         flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                'UNLOCK ACCESS'
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-700/70 text-xs tracking-wider">
              RESTRICTED • MEMBERS ONLY • 2024–2025
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-800/60 text-xs tracking-widest">
            © {new Date().getFullYear()} NextGenAI • Powered by the Future
          </p>
        </div>
      </div>
    </div>
  )
}