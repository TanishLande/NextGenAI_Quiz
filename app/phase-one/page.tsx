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
          Phase 1: AI Video Generation
        </p>

        <p className="text-xl text-yellow-600 mb-10">
          Create One Visionary Video
        </p>

        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
          Use any AI video generation tool (Runway, Kling, Luma Dream Machine, Pika Labs, Sora, etc.) to create a short video (5–20 seconds) that shows:<br /><br />
          <span className="text-yellow-400 font-semibold">
            "How Vishwakarma University (VU) would look and function in 2050 — powered by AI in education and learning."
          </span><br /><br />
          Include futuristic elements like holographic professors, neural learning interfaces, VR/AR classrooms, emotion-adaptive spaces, personalized AI companions, global virtual collaborations, and more — all set on the VU campus.
        </p>

        <div className="bg-gray-900/60 border border-yellow-800 rounded-xl p-8 mb-12 text-left max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">
            Video Guidelines
          </h3>
          <ul className="text-gray-300 space-y-3 list-disc pl-6">
            <li>Show recognizable VU campus elements (library, fountain, banyan tree, buildings, etc.) transformed into 2050.</li>
            <li>Highlight AI-driven education: students learning via holograms, neural uploads, VR pods, adaptive environments.</li>
            <li>Keep it cinematic, futuristic, high-quality — cinematic lighting, smooth motion.</li>
            <li>Upload the final MP4 / video file to the Google Drive folder below.</li>
            <li>Best submissions will be featured and advance you faster.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-8 mt-8">
          <a
            href="https://drive.google.com/drive/u/4/folders/1pPC6zKBVIxQbmEVOz1as6KyU7NR021Rg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-md px-8 py-6 bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 text-black font-extrabold text-2xl rounded-2xl border border-yellow-400 flex items-center justify-center gap-4 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-400 transition-colors shadow-lg shadow-yellow-900/50"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0 4h10v2H7z"/>
            </svg>
            Upload Your 2050 VU Video Here
          </a>

          <p className="text-yellow-600 text-base">
            Generate → Upload video → Await verification
          </p>

          <a
            href="/phase-two"
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