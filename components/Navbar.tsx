"use client"

import { useEffect, useRef, useState } from "react"
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
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",")
    const previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
        return
      }

      if (event.key !== "Tab") return

      const focusableElements = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      ).filter((element) => element.offsetParent !== null)

      if (!focusableElements.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)
    window.setTimeout(() => {
      const initialFocusElement =
        mobileMenuRef.current?.querySelector<HTMLElement>("[data-menu-initial]") ??
        mobileMenuRef.current?.querySelector<HTMLElement>(focusableSelector)

      initialFocusElement?.focus()
    }, 100)

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      document.removeEventListener("keydown", handleKeyDown)
      previouslyFocusedElement?.focus()
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
    <nav
      className={`fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a] ${
        isMobileMenuOpen ? "z-[9998]" : "z-50"
      }`}
    >
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

      <div
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`md:hidden fixed left-0 top-0 z-[9999] h-screen w-screen overflow-hidden bg-[linear-gradient(180deg,#000000,#050505,#0b0b0b)] transition-opacity duration-300 ease-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <button
          type="button"
          className={`fixed right-5 top-4 z-[10000] inline-flex h-12 w-12 items-center justify-center border border-[#1a1a1a] bg-[#111111] text-gray-200 transition-all duration-300 hover:border-primary/50 hover:text-primary active:scale-95 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        >
          <X className="h-5 w-5" />
        </button>

        <div
          id="mobile-navigation"
          onClick={(event) => event.stopPropagation()}
          className={`mx-auto flex h-screen w-full max-w-sm flex-col items-center justify-center overflow-hidden px-6 py-24 text-center transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link
            href="/"
            onClick={handleHomeClick}
            className={`mb-10 inline-flex transition-all duration-300 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "80ms" : "140ms" }}
            aria-label="AMS Home"
            data-menu-initial
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            <Image
              src="/ams-logo.png"
              alt="AMS"
              width={72}
              height={72}
              priority
              sizes="72px"
              className="h-16 w-auto"
            />
          </Link>

          <div className="flex w-full max-w-xs flex-col items-center gap-3 text-base font-medium tracking-widest uppercase">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={item.href === "/" ? handleHomeClick : () => setIsMobileMenuOpen(false)}
                className={`${getActiveClass(isActive(item.href))} flex min-h-11 w-full items-center justify-center transition-all duration-300 active:scale-95`}
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${140 + index * 45}ms`
                    : `${(navItems.length - index) * 25}ms`,
                }}
                aria-current={isActive(item.href) ? "page" : undefined}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <span
                  className={`transition-all duration-300 ${
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <Button
            size="sm"
            className={`mt-10 min-h-11 w-48 from-primary bg-linear-to-r text-white hover:bg-orange-600 font-bold tracking-wide rounded-none border-l-4 to-accent transition-all duration-300 active:scale-95 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "340ms" : "0ms" }}
            onClick={handleQuoteClick}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            GET QUOTE
          </Button>

          <button
            type="button"
            className="sr-only"
            onClick={() => setIsMobileMenuOpen(false)}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            Close navigation menu
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`relative z-[60] md:hidden inline-flex h-11 w-11 items-center justify-center border border-[#1a1a1a] bg-[#111111] text-gray-200 transition-colors hover:border-primary/50 hover:text-primary active:scale-95 ${
          isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
        tabIndex={isMobileMenuOpen ? -1 : 0}
      >
        <Menu className="h-5 w-5" />
      </button>
    </nav>
  )
}
