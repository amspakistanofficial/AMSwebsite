"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronDown, Phone } from 'lucide-react'
import { GamerHeroBackground } from "@/components/GamerHeroBackground"
import { HERO_PRODUCTS } from "@/lib/products"
import { VideoCard } from "@/components/VideoCard"
import { FeaturedProducts } from "@/components/FeaturedProducts"

const FINAL_POSITIONS = [
  { x: -500, y: -250 }, // Top Left
  { x: -550, y: 50 },   // Mid Left
  { x: -450, y: 320 },  // Bottom Left
  { x: 500, y: -250 },  // Top Right
  { x: 550, y: 50 },    // Mid Right
  { x: 450, y: 320 },   // Bottom Right
]

const MOBILE_POSITIONS = [
  { x: -140, y: -220 }, // Top Left
  { x: 140, y: -180 },  // Top Right
  { x: -150, y: 30 },   // Mid Left
  { x: 150, y: 60 },    // Mid Right
  { x: -130, y: 280 },  // Bottom Left
  { x: 130, y: 310 },   // Bottom Right
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<0 | 1>(0)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastPhaseRef = useRef<number>(0)
  const lastProgressRef = useRef<number>(0)

  const handleScroll = useCallback(() => {
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container) {
        rafRef.current = null
        return
      }

      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const containerHeight = container.offsetHeight
      const scrollableDistance = containerHeight - viewportHeight
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)

      if (Math.abs(progress - lastProgressRef.current) < 0.001) {
        rafRef.current = null
        return
      }
      lastProgressRef.current = progress

      // Two phases: 0 = logo visible, 1 = cards + headline appear together
      const newPhase: 0 | 1 = progress < 0.35 ? 0 : 1

      if (newPhase !== lastPhaseRef.current) {
        lastPhaseRef.current = newPhase
        setPhase(newPhase)
      }

      rafRef.current = null
    })
  }, [])

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Trigger scroll logic on resize to prevent phase glitches
      handleScroll()
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [handleScroll])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  const positions = isMobile ? MOBILE_POSITIONS : FINAL_POSITIONS
  const displayProducts = isMobile ? HERO_PRODUCTS.slice(0, 6) : HERO_PRODUCTS

  if (!mounted) return null

  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero Section */}
      <div id="home" ref={containerRef} className="relative" style={{ height: "115vh" }}>
        <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Background Animation */}
            <GamerHeroBackground phase={phase} />

            {/* Product Cards - Only visible/animated on desktop */}
            {!isMobile && displayProducts.map((product, index) => {
              const pos = positions[index] || { x: 0, y: 0 }
              const delay = index * 50

              return (
                <div
                  key={index}
                  className="absolute w-20 h-20 md:w-60 md:h-60 flex items-center justify-center pointer-events-none"
                  style={{
                    transform: phase === 0
                      ? 'translate3d(0px, 0px, 0px) scale(0.2)'
                      : `translate3d(${pos.x}px, ${pos.y}px, 0px) scale(1)`,
                    opacity: phase === 0 ? 0 : 1,
                    transition: `transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 600ms ease ${delay}ms`,
                    zIndex: phase >= 1 ? 10 : 1,
                  }}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={240}
                    height={240}
                    sizes="240px"
                    className="w-full h-full object-contain"
                  />
                </div>
              )
            })}

            {/* Centered Logo - visible at start, fades when cards appear */}
            <div
              className="absolute z-10 flex flex-col items-center justify-center pointer-events-none"
              style={{
                opacity: phase === 0 ? 1 : 0,
                transform: phase === 0 ? 'scale(1.2)' : 'scale(0.8)',
                transition: 'opacity 500ms ease, transform 500ms ease',
              }}
            >
              <div className="relative overflow-hidden metallic-logo-container">
                <Image
                  src="/ams-logo.png"
                  alt="AMS"
                  width={320}
                  height={320}
                  priority
                  sizes="(min-width: 768px) 320px, 256px"
                  className="h-64 md:h-80 w-auto drop-shadow-2xl relative z-10"
                />
                {phase === 0 && <div className="absolute inset-0 z-20 metallic-shine" />}
              </div>
              <p className="text-xl md:text-2xl text-gray-400 mt-3 tracking-widest uppercase font-bold">Premium PC Parts</p>
            </div>

            <style jsx>{`
              .metallic-logo-container {
                position: relative;
              }
              .metallic-shine {
                background: linear-gradient(
                  110deg,
                  transparent 20%,
                  rgba(255, 255, 255, 0) 35%,
                  rgba(255, 255, 255, 0.6) 50%,
                  rgba(255, 255, 255, 0) 65%,
                  transparent 80%
                );
                background-size: 200% 100%;
                animation: shine 3s infinite linear;
                pointer-events: none;
                mix-blend-mode: overlay;
                -webkit-mask-image: url('/ams-logo.png');
                mask-image: url('/ams-logo.png');
                -webkit-mask-size: contain;
                mask-size: contain;
                -webkit-mask-repeat: no-repeat;
                mask-repeat: no-repeat;
                -webkit-mask-position: center;
                mask-position: center;
              }
              @keyframes shine {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-20px) scale(1.02); }
              }
              .animate-float {
                animation: float 15s ease-in-out infinite;
              }
              .animate-float-delayed {
                animation: float 18s ease-in-out infinite;
                animation-delay: 2s;
              }
              .animate-float-slow {
                animation: float 22s ease-in-out infinite;
                animation-delay: 5s;
              }
            `}</style>

            {/* Headline and CTA - appears together with cards */}
            <div
              className="absolute z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
              style={{
                opacity: phase === 1 ? 1 : 0,
                top: '50%',
                transform: `translateY(-50%) ${phase === 1 ? 'scale(1)' : 'scale(0.9)'}`,
                transition: 'opacity 600ms ease 300ms, transform 600ms ease 300ms',
                pointerEvents: phase === 1 ? 'auto' : 'none',
              }}
            >
              <h1 className="text-3xl md:text-7xl font-bold text-white mb-2 leading-tight tracking-tight">
                BUILD YOUR
              </h1>
              <h2 className="text-3xl md:text-7xl font-black text-primary mb-6 leading-tight tracking-tighter italic">
                DREAM RIG
              </h2>
              <p className="text-gray-400 text-sm md:text-xl mb-8 max-w-xs md:max-w-xl mx-auto font-medium px-4">
                Premium gaming hardware and PC components for enthusiasts in Pakistan by <span className="text-accent font-bold">AMS</span>
              </p>
              <Button
                size="lg"
                className="bg-linear-to-r from-primary to-accent text-white hover:bg-orange-600 font-black text-base md:text-lg px-8 md:px-12 py-6 md:py-8 rounded-none tracking-tighter uppercase shadow-[0_10px_20px_rgba(255,107,0,0.3)] transition-all transform hover:scale-105"
                onClick={() => {
                  window.location.href = "/products"
                }}
              >
                EXPLORE PRODUCTS
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
              style={{
                opacity: phase === 0 ? 1 : 0,
                transition: 'opacity 300ms ease',
              }}
            >
              <div className="flex flex-col items-center gap-2 text-gray-500 text-sm">
                <span className="tracking-widest uppercase text-xs">Scroll to explore AMS</span>
                <ChevronDown className="w-5 h-5 text-[#ff6b00]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeaturedProducts />

      {/* Video Showcase Section */}
      <section className="py-24 px-8 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight uppercase">
              SEE US IN <span className="text-primary italic">ACTION</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch our latest builds, reviews, and tutorials
            </p>
          </div>

          {/* Horizontally scrolling video carousel - manual scroll like reviews */}
          {/* 
            TO ADD YOUR OWN VIDEOS:
            1. Place your 9:16 vertical videos in the /public/videos/ folder (e.g., /public/videos/video1.mp4)
            2. Replace the src URLs below with your video paths (e.g., src="/videos/video1.mp4")
            3. Videos should be in MP4 format for best compatibility
          */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4 w-max">
              {/* Video cards - duplicated for infinite loop effect */}
              {[...Array(1)].map((_, setIndex) => (
                <div key={`set-${setIndex}`} className="flex gap-6">
                  <VideoCard
                    src="/videos/1/video.mp4"
                    fallbackSrc="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-writing-with-a-pen-in-a-notebook-41437-large.mp4"
                  />
                  <VideoCard
                    src="/videos/2/video.mp4"
                    fallbackSrc="https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-laptop-in-a-pink-neon-atmosphere-50261-large.mp4"
                  />
                  <VideoCard
                    src="/videos/3/video.mp4"
                    fallbackSrc="https://assets.mixkit.co/videos/preview/mixkit-hands-working-on-a-laptop-in-slow-motion-24-large.mp4"
                  />
                  <VideoCard
                    src="/videos/4/video.mp4"
                    fallbackSrc="https://assets.mixkit.co/videos/preview/mixkit-computer-and-smartphone-in-a-workspace-top-shot-50235-large.mp4"
                  />
                  <VideoCard
                    src="/videos/5/video.mp4"
                    fallbackSrc="https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-home-4839-large.mp4"
                  />
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </section>

      {/* Contact Wrapper */}
      <div className="relative overflow-hidden">
        {/* bg3 Positioning - Covering Contact */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none z-0 animate-float-slow">
          <Image
            src="/backgrounds/bg6.jpg"
            alt="AMS background 3"
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* WhatsApp CTA Section */}
        <section id="contact" className="py-20 px-8 bg-transparent relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 md:p-12 text-center">
              <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">
                Need build guidance?
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
                CHAT WITH <span className="text-primary italic">AMS</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium">
                Message us on WhatsApp for product availability, pricing, and custom PC build advice.
              </p>
              <Button
                size="lg"
                className="bg-green-600 text-white hover:bg-green-700 font-black text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-none uppercase tracking-tighter"
                onClick={() => window.open("https://wa.me/923348964450", "_blank")}
              >
                <Phone className="w-5 h-5" />
                WhatsApp AMS
              </Button>
            </div>
          </div>
        </section >
      </div>

      {/* JSON-LD Structured Data */}
      < script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AMS",
          "alternateName": "AMS Pakistan",
          "url": "https://amspakistan.com",
          "logo": "https://amspakistan.com/ams-logo.png",
          "description": "Premium PC components and gaming hardware. Your trusted source for graphics cards, processors, storage, cases, coolers and custom PC builds.",
          "telephone": "+923348964450",
          "email": "amspakistanofficial@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "PK",
            "addressRegion": "Pakistan"
          },
          "sameAs": [
            "https://whatsapp.com"
          ]
        })
      }
      } />

      {/* Product Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "Product",
              "position": 1,
              "name": "Graphics Cards",
              "description": "High-performance graphics cards including RTX, RTX 50 series, and gaming GPUs",
              "category": "Electronics > Computers > PC Components",
              "brand": {
                "@type": "Brand",
                "name": "NVIDIA, AMD"
              }
            },
            {
              "@type": "Product",
              "position": 2,
              "name": "PC Cases",
              "description": "Gaming cases and professional PC cases for build projects",
              "category": "Electronics > Computers > PC Components"
            },
            {
              "@type": "Product",
              "position": 3,
              "name": "CPU Coolers",
              "description": "Advanced CPU cooling solutions for gaming and workstation builds",
              "category": "Electronics > Computers > PC Components"
            },
            {
              "@type": "Product",
              "position": 4,
              "name": "Motherboards",
              "description": "Latest motherboards for gaming and professional builds",
              "category": "Electronics > Computers > PC Components"
            },
            {
              "@type": "Product",
              "position": 5,
              "name": "Storage Solutions",
              "description": "Fast SSDs and storage drives for gaming performance",
              "category": "Electronics > Computers > PC Components"
            }
          ]
        })
      }} />

      {/* LocalBusiness Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "AMS",
          "image": "https://amspakistan.com/ams-logo.png",
          "description": "Premium PC Parts Store - Graphics Cards, Cases, Coolers, and Custom PC Builds",
          "telephone": "+923348964450",
          "email": "amspakistanofficial@gmail.com",
          "url": "https://amspakistan.com",
          "serviceArea": {
            "@type": "Country",
            "name": "Pakistan"
          },
          "priceRange": "$$"
        })
      }} />

      {/* BreadcrumbList Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://amspakistan.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Graphics Cards",
              "item": "https://amspakistan.com#products"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "PC Cases",
              "item": "https://amspakistan.com#products"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "CPU Coolers",
              "item": "https://amspakistan.com#products"
            }
          ]
        })
      }} />
    </div >
  )
}
