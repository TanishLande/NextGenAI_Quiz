"use client"

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const handleStartQuiz = () => {
    router.push('/quiz')           // ← change this path if your quiz page is different
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-xl flex items-center gap-3">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Entering the Nexus...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-200">

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-600/4 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-400 animate-gradient-x">
              NextGenAI
            </span>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-yellow-600/90 font-medium tracking-wide">
            Where Tomorrow's AI Minds Are Forged Today
          </p>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-400 leading-relaxed">
            Premier college collective pushing the boundaries of artificial intelligence through workshops, 
            collaborative projects, research sprints and elite networking.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <span className="px-5 py-2.5 bg-yellow-700/30 border border-yellow-600/40 rounded-full text-sm font-medium text-yellow-300 backdrop-blur-sm">
              Machine Learning
            </span>
            <span className="px-5 py-2.5 bg-yellow-700/30 border border-yellow-600/40 rounded-full text-sm font-medium text-yellow-300 backdrop-blur-sm">
              Deep Learning
            </span>
            <span className="px-5 py-2.5 bg-yellow-700/30 border border-yellow-600/40 rounded-full text-sm font-medium text-yellow-300 backdrop-blur-sm">
              Generative AI
            </span>
            <span className="px-5 py-2.5 bg-yellow-700/30 border border-yellow-600/40 rounded-full text-sm font-medium text-yellow-300 backdrop-blur-sm">
              Computer Vision
            </span>
            <span className="px-5 py-2.5 bg-yellow-700/30 border border-yellow-600/40 rounded-full text-sm font-medium text-yellow-300 backdrop-blur-sm">
              NLP • LLMs
            </span>
          </div>

          {/* ✨ CENTERED START QUIZ BUTTON ✨ */}
          <div className="mt-14">
            <button
              onClick={handleStartQuiz}
              className="group relative px-10 py-5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 
                         hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-400
                         text-black font-extrabold text-xl md:text-2xl tracking-wide rounded-2xl
                         shadow-2xl shadow-yellow-900/60 hover:shadow-yellow-600/70
                         transition-all duration-500 transform hover:scale-105 active:scale-95
                         overflow-hidden flex items-center gap-4 mx-auto"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                START QUIZ
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </button>
            <p className="mt-4 text-yellow-600/70 text-sm md:text-base font-medium">
              Test your AI knowledge • Earn elite status
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Elite Workshops",
                desc: "Weekly deep-dive sessions led by top performers and occasional guest researchers from industry & academia.",
                icon: "brain"
              },
              {
                title: "Real Projects",
                desc: "Build production-grade AI systems, contribute to open-source, compete in hackathons and publish under club banner.",
                icon: "code"
              },
              {
                title: "Inner Circle",
                desc: "Exclusive access to high-signal community, mentorship pipeline, internship referrals and alpha research discussions.",
                icon: "users"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-950/80 border border-yellow-800/30 rounded-2xl p-7 md:p-8 hover:border-yellow-600/60 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-900/20 backdrop-blur-sm"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-yellow-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                
                <div className="text-4xl mb-5 text-yellow-500/70 group-hover:text-yellow-400 transition-colors">
                  {item.icon === 'brain' && '🧠'}
                  {item.icon === 'code' && '⚙️'}
                  {item.icon === 'users' && '🔗'}
                </div>

                <h3 className="text-2xl font-bold text-yellow-400 mb-4 group-hover:text-yellow-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Mission */}
      <section className="py-20 md:py-28 border-t border-yellow-900/30">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 mb-8">
            Engineering the Future — One Neuron at a Time
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            NextGenAI exists to accelerate the development of the next generation of AI practitioners. 
            We provide unmatched hands-on experience, high-quality resources, serious peers and real-world exposure — 
            preparing members not just to use AI, but to <span className="text-yellow-400 font-semibold">shape</span> it.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-900/40 mt-12 md:mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} NextGenAI • Forging Tomorrow's Intelligence
          </p>
          <p className="mt-2 text-gray-700 text-xs">
            Restricted access • Authorized members only
          </p>
        </div>
      </footer>
    </div>
  )
}