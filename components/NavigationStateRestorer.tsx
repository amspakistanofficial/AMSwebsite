"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const RESTORE_SCROLL_KEY = "ams-restore-scroll"

function getScrollKey() {
  return `ams-scroll:${window.location.pathname}${window.location.search}`
}

function saveScrollPosition() {
  window.sessionStorage.setItem(getScrollKey(), String(window.scrollY))
}

export function NavigationStateRestorer() {
  const pathname = usePathname()

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const markHistoryNavigation = () => {
      window.sessionStorage.setItem(RESTORE_SCROLL_KEY, "true")
    }

    window.addEventListener("popstate", markHistoryNavigation)

    return () => {
      window.removeEventListener("popstate", markHistoryNavigation)
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }
  }, [])

  useEffect(() => {
    const shouldRestore = window.sessionStorage.getItem(RESTORE_SCROLL_KEY) === "true"

    if (shouldRestore) {
      window.sessionStorage.removeItem(RESTORE_SCROLL_KEY)
      const savedPosition = Number(window.sessionStorage.getItem(getScrollKey()) ?? 0)

      window.requestAnimationFrame(() => {
        window.scrollTo({ top: savedPosition, behavior: "auto" })
      })
    }

    let ticking = false
    const handleScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(() => {
        saveScrollPosition()
        ticking = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("pagehide", saveScrollPosition)
    saveScrollPosition()

    return () => {
      saveScrollPosition()
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("pagehide", saveScrollPosition)
    }
  }, [pathname])

  return null
}
