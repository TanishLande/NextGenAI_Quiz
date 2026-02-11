"use client"

import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Better cookie checking + force re-check on focus/mount
  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split('; ')
      const authCookie = cookies.find(row => row.startsWith('auth_token='))
      setIsAuthenticated(!!authCookie)
    }

    checkAuth()

    // Re-check when window gets focus (helps after login redirect)
    window.addEventListener('focus', checkAuth)

    return () => {
      window.removeEventListener('focus', checkAuth)
    }
  }, [pathname]) // Re-run when route changes

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Strict'
    setIsAuthenticated(false)
    router.push('/login')
    // Force refresh after logout
    router.refresh()
  }

  const handleFillQuestion = () => {
    router.push('/fill-question')
  }

  const handleAddQuestion = () => {
    router.push('/add-question')
  }

  const handleLoginRedirect = () => {
    router.push('/login')
  }

  return (
    <nav className="bg-gradient-to-b from-black to-gray-950 border-b border-yellow-700/40 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/20 to-amber-500/10 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
              <h1 className="relative text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 group-hover:from-yellow-300 group-hover:to-amber-400 transition-all duration-500">
                NextGenAI
              </h1>
            </div>
            <span className="text-yellow-600/60 text-xs md:text-sm font-medium tracking-widest uppercase hidden sm:inline">
              Elite
            </span>
          </div>

          {/* Right Side Actions */}
          {/* <div className="flex items-center gap-3 sm:gap-5">
            {isAuthenticated ? (
              <>

                <button
                  onClick={handleAddQuestion}
                  className="relative group px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-black font-semibold rounded-lg shadow-md shadow-amber-900/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Question
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-yellow-700/80 text-yellow-400 font-medium rounded-lg hover:bg-yellow-800/30 hover:border-yellow-500/70 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginRedirect}
                className="relative group px-6 py-2.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-400 text-black font-bold rounded-xl shadow-lg shadow-yellow-900/50 hover:shadow-yellow-600/60 transition-all duration-400 hover:scale-105 active:scale-95 flex items-center gap-2 text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Enter Portal
              </button>
            )}
          </div> */}
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-yellow-700/30 to-transparent" />
    </nav>
  )
}