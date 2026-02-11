"use client"

import { useEffect, useState } from 'react'

export default function Phase6() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes suggested for real hunt, change as needed
  const [photoUploaded, setPhotoUploaded] = useState(false)
  const [showFinishAnimation, setShowFinishAnimation] = useState(false)

  // You can change this to your actual VU campus location clue
  const locationClue = {
    title: "Final Challenge: Campus Treasure Hunt",
    instruction: "Find this exact location on your VU campus:",
    description: "The spot where the old banyan tree meets the central fountain,\nbeside the main library entrance,\nunder the sign that says 'Knowledge Grows Here'.\n\nTake a clear team photo (minimum 2–3 members) with this landmark visible in the background.\nMake sure the fountain and tree are clearly seen.",
    hint: "Look for the circular seating area around the fountain.\nThe banyan tree has hanging roots and wide canopy.\nBest captured during daylight."
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Timer countdown (optional – you can remove if not needed for this phase)
  useEffect(() => {
    if (timeLeft > 0 && !showFinishAnimation) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timeLeft, showFinishAnimation])

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  const handleFinish = () => {
    setShowFinishAnimation(true)
    // You can add confetti / sound / API call here later if wanted
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 text-xl flex items-center gap-3">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Final Phase Loading...
        </div>
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
          Phase 6: Campus Treasure Hunt
        </p>

        <p className="text-xl text-yellow-600 mb-6">
          Find the location • Take team photo • Submit
        </p>

        {!showFinishAnimation ? (
          <>
            <div className="bg-gray-900/60 border border-yellow-800 rounded-xl p-6 mb-10 text-left">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                {locationClue.title}
              </h3>

              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                {locationClue.instruction}
              </p>

              <p className="text-xl text-yellow-400 font-medium mb-6 whitespace-pre-line">
                {locationClue.description}
              </p>

              <p className="text-base text-gray-400 italic mb-6">
                Hint: {locationClue.hint}
              </p>

              <div className="text-2xl font-bold text-yellow-500 mb-4">
                Time Remaining: {formatTime(timeLeft)}
              </div>
            </div>

            {/* Google Drive Upload Button */}
            <div className="flex flex-col items-center gap-8 mb-12">
              <a
                href="https://drive.google.com/drive/u/4/folders/1pPC6zKBVIxQbmEVOz1as6KyU7NR021Rg" // ← REPLACE WITH YOUR ACTUAL SHARED FOLDER LINK
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-md px-8 py-6 bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 text-black font-extrabold text-2xl rounded-2xl border border-yellow-400 flex items-center justify-center gap-4 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-400 transition-colors shadow-lg shadow-yellow-900/50"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0 4h10v2H7z"/>
                </svg>
                Upload Team Photo Here
              </a>

              <p className="text-yellow-600 text-base">
                Click above → upload your team photo at the location → come back and finish
              </p>
            </div>

            {/* Finish Button – always enabled as per your request */}
            <button
              onClick={handleFinish}
              className="w-full max-w-md mx-auto px-10 py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-extrabold text-2xl rounded-2xl border border-emerald-500 flex items-center justify-center gap-4 hover:from-green-500 hover:to-emerald-500 transition-colors shadow-lg shadow-green-900/50"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              FINISH – Code Hunt Complete!
            </button>
          </>
        ) : (
          /* Finish Animation Screen */
          <div className="bg-gradient-to-b from-green-950 via-black to-black border border-green-700 rounded-2xl p-10 animate-pulse-slow">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-green-400 mb-6 animate-bounce">
              CODE HUNT COMPLETE!
            </h2>

            <div className="text-4xl text-yellow-300 mb-8">
              Congratulations!
            </div>

            <p className="text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
              You've conquered every phase — from image generation to riddles to real-world campus hunt.<br />
              Welcome to the elite circle of NextGenAI.
            </p>

            <div className="text-6xl mb-10 animate-spin-slow">
              🎉🔥🚀
            </div>

            {/* Final action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/dashboard" // ← or your final page / certificate / group invite
                className="px-10 py-5 bg-yellow-600 text-black font-bold text-xl rounded-xl hover:bg-yellow-500 transition-colors"
              >
                View Your Certificate
              </a>
              <a
                href="https://discord.gg/your-server" // ← optional discord/community link
                target="_blank"
                className="px-10 py-5 bg-indigo-700 text-white font-bold text-xl rounded-xl hover:bg-indigo-600 transition-colors"
              >
                Join Inner Circle
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}