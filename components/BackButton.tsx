"use client"

import { ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"

export function BackButton() {
  const pathname = usePathname()

  if (pathname === "/") {
    return null
  }

  return (
    <div className="relative z-30 bg-[#0a0a0a] px-6 pt-24 md:px-8 md:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="group inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-primary/50 bg-[#111111]/95 px-5 py-2.5 text-sm font-black uppercase tracking-tighter text-primary shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-black hover:shadow-[0_16px_35px_rgba(255,107,0,0.2)] active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          aria-label="Go back to the previous page"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back
        </button>
      </div>
    </div>
  )
}
