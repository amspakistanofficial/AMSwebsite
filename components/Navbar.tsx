"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
  { label: "Reviews", href: "/#reviews" },
  { label: "About", href: "/about" },
]

function getActiveClass(isActive: boolean) {
  return isActive ? "text-primary" : "text-gray-400 hover:text-primary"
}

export function Navbar() {
  const pathname = usePathname()
  const [hash, setHash] = useState("")

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)

    updateHash()
    window.addEventListener("hashchange", updateHash)
    return () => window.removeEventListener("hashchange", updateHash)
  }, [pathname])

  useEffect(() => {
    if (pathname !== "/" || hash !== "#reviews") return

    const scrollTimer = window.setTimeout(() => {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })
    }, 100)

    return () => window.clearTimeout(scrollTimer)
  }, [hash, pathname])

  const handleReviewsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return

    event.preventDefault()
    const reviewsSection = document.getElementById("reviews")
    if (reviewsSection) {
      window.history.pushState(null, "", "/#reviews")
      setHash("#reviews")
      reviewsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return

    event.preventDefault()
    window.history.pushState(null, "", "/")
    setHash("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && hash !== "#reviews"
    }
    if (href === "/#reviews") {
      return pathname === "/" && hash === "#reviews"
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
              onClick={
                item.href === "/#reviews"
                  ? handleReviewsClick
                  : item.href === "/"
                    ? handleHomeClick
                    : undefined
              }
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
        className="from-primary bg-linear-to-r text-white hover:bg-orange-600 hover:scale-110 font-bold px-5 tracking-wide rounded-none border-l-4 to-accent"
        onClick={() => window.open("https://wa.me/923348964450", "_blank")}
      >
        GET QUOTE
      </Button>
    </nav>
  )
}
