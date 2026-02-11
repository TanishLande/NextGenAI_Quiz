"use client"

import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-lg">Loading...</div>
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
          Phase 1: AI Image Generation
        </p>

        <p className="text-xl text-yellow-600 mb-10">
          Generate These 5 Images
        </p>

        <p className="text-lg text-gray-300 mb-12">
          Create one AI-generated image for each topic below.<br />
          Upload all 5 to the Google Drive folder.<br />
          Images will be verified at the end.
        </p>

        {/* 5 Topics - only text, no images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: "1. Holographic AI Professor",
              desc: "Futuristic classroom with holographic AI teacher using AR projections and interactive 3D models."
            },
            {
              title: "2. Neural Knowledge Upload",
              desc: "Student in 2050 with neural interface instantly downloading knowledge from AI in a learning pod."
            },
            {
              title: "3. Personalized AI Learning Companion",
              desc: "Glowing holographic AI mentor guiding a student through personalized lessons on campus."
            },
            {
              title: "4. Immersive VR Global Classroom",
              desc: "Worldwide students in shared VR classroom with floating AI interfaces and digital worlds."
            },
            {
              title: "5. Emotion-Adaptive Learning Space",
              desc: "Intelligent room where AI adapts content, lighting, and pace based on student emotions."
            }
          ].map((topic, i) => (
            <div 
              key={i} 
              className="bg-gray-900/60 border border-yellow-900 rounded-xl p-6 text-left"
            >
              <h3 className="text-xl font-bold text-yellow-300 mb-3">
                {topic.title}
              </h3>
              <p className="text-gray-300">
                {topic.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <a
            href="https://drive.google.com/drive/u/4/folders/1pPC6zKBVIxQbmEVOz1as6KyU7NR021Rg" // ← REPLACE WITH YOUR REAL GOOGLE DRIVE FOLDER LINK
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-md px-8 py-5 bg-yellow-600 text-black font-bold text-xl rounded-xl border border-yellow-500 flex items-center justify-center gap-3 hover:bg-yellow-500 transition-colors"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0 4h10v2H7z"/>
            </svg>
            Upload Your 5 Images Here
          </a>

          <p className="text-yellow-600 text-base">
            Upload all 5 images — they will be verified at the end
          </p>

          <a
            href="/phase-two" // ← CHANGE TO YOUR ACTUAL NEXT PHASE URL WHEN READY
            className="w-full max-w-md px-8 py-5 bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-bold text-xl rounded-xl border border-amber-500 flex items-center justify-center gap-3 hover:from-amber-500 hover:to-yellow-500 transition-colors"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 5l7 7-7 7M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Go to Next Phase
          </a>
        </div>

      </div>
    </div>
  )
}