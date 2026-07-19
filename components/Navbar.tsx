"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
]

function getActiveClass(isActive: boolean) {
  return isActive ? "text-primary" : "text-gray-400 hover:text-primary"
}

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const originalOverflow = document.body.style.overflow
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isMobileMenuOpen])

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false)
    if (pathname !== "/") return

    event.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleQuoteClick = () => {
    setIsMobileMenuOpen(false)
    window.open("https://wa.me/923348964450", "_blank")
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    if (href === "/products") {
      return pathname === "/products" || pathname.startsWith("/products/")
    }
    return pathname === href
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]">
      <Link href="/" onClick={handleHomeClick} className="flex items-center gap-3" aria-label="AMS Home">
        <Image
          src="/ams-logo.png"
          alt="AMS"
          width={40}
          height={40}
          priority
          sizes="40px"
          className="h-10 w-auto"
        />
      </Link>

      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex items-center gap-10 text-sm font-medium tracking-widest uppercase">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={item.href === "/" ? handleHomeClick : undefined}
              className={`${getActiveClass(isActive(item.href))} transition-colors`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <Button
        size="sm"
        className="hidden md:inline-flex from-primary bg-linear-to-r text-white hover:bg-orange-600 hover:scale-110 font-bold px-5 tracking-wide rounded-none border-l-4 to-accent"
        onClick={handleQuoteClick}
      >
        GET QUOTE
      </Button>

      <button
        type="button"
        className="md:hidden inline-flex h-11 w-11 items-center justify-center border border-[#1a1a1a] bg-[#111111] text-gray-200 transition-colors hover:border-primary/50 hover:text-primary"
        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={`md:hidden fixed inset-x-0 bottom-0 top-[73px] z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        />
        <div
          id="mobile-navigation"
          className={`absolute right-0 top-0 h-full w-full max-w-xs border-l border-[#1a1a1a] bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-6 py-8">
            <div className="flex flex-col gap-2 text-sm font-medium tracking-widest uppercase">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={item.href === "/" ? handleHomeClick : () => setIsMobileMenuOpen(false)}
                  className={`${getActiveClass(isActive(item.href))} flex min-h-11 items-center border-b border-[#1a1a1a] transition-colors`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Button
              size="sm"
              className="mt-8 min-h-11 w-full from-primary bg-linear-to-r text-white hover:bg-orange-600 font-bold tracking-wide rounded-none border-l-4 to-accent"
              onClick={handleQuoteClick}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              GET QUOTE
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
