"use client"

import React, { memo } from "react"

export const GamerBackground = memo(function GamerBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">
      {/* 1. Base Gradient Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_50%_50%,_var(--tw-gradient-stops)] from-[#8a2be210] via-transparent to-transparent" />

      {/* 2. Static Side Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff6b00]/[0.03] blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8a2be2]/[0.03] blur-[150px] rounded-full" />

      {/* 3. Vigilant Shine (subtle moving highlight) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent bg-[length:200%_200%] animate-[shine_20s_linear_infinite]" />

      <style jsx>{`
        @keyframes shine {
          0% { background-position: 100% 100%; }
          100% { background-position: -100% -100%; }
        }
      `}</style>
    </div>
  )
})
