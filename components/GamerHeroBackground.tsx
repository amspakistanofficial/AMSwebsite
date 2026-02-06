"use client"

import React, { useEffect, useRef, memo } from "react"

interface GamerHeroBackgroundProps {
  phase: 0 | 1
}

export const GamerHeroBackground = memo(function GamerHeroBackground({ phase }: GamerHeroBackgroundProps) {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      style={{
        opacity: phase === 0 ? 1 : 0.4,
        transition: 'opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* 1. Base Layer */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.2] mix-blend-screen"
          style={{ backgroundImage: 'url(/hero-bg.gif)' }}
        />
        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-radial-[circle_at_20%_30%,_var(--tw-gradient-stops)] from-[#ff6b001a] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-radial-[circle_at_80%_70%,_var(--tw-gradient-stops)] from-[#8a2be21a] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      {/* 2. Cyber Grid Layer */}
      <div className="absolute inset-0 perspective-[1000px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff6b000a_1px,transparent_1px),linear-gradient(to_bottom,#8a2be20a_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(65deg)_translateY(-100px)_scale(2.5)] animate-grid-flow origin-top" />
      </div>

      {/* 3. Floating Particles / Glows - smaller on mobile for performance */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-[#ff6b00]/5 blur-[60px] md:blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-[#8a2be2]/5 blur-[60px] md:blur-[120px] rounded-full animate-pulse-slow delay-1000" />

      <style jsx>{`
        @keyframes grid-flow {
          0% { transform: rotateX(65deg) translateY(-120px) scale(2.5); }
          100% { transform: rotateX(65deg) translateY(0px) scale(2.5); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        .animate-grid-flow {
          animation: grid-flow 15s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
})
