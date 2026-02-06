"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronDown, Phone, Mail, MapPin, Clock, Cpu, HardDrive, Monitor, Headphones, Zap, Shield, Package } from 'lucide-react'
import { GamerHeroBackground } from "@/components/GamerHeroBackground"
import { InfiniteProductScroller } from "@/components/InfiniteProductScroller"
import { HERO_PRODUCTS, FEATURED_CATEGORIES } from "@/lib/products"
import { VideoCard } from "@/components/VideoCard"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<0 | 1>(0)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const rafRef = useRef<number | null>(null)
  const lastPhaseRef = useRef<number>(0)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      const newPhase: 0 | 1 = progress < 0.25 ? 0 : 1

      if (newPhase !== lastPhaseRef.current) {
        lastPhaseRef.current = newPhase
        setPhase(newPhase)
      }

      rafRef.current = null
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [handleScroll])

  const products = HERO_PRODUCTS

  // Fixed symmetrical positions for 6 cards
  const finalPositions = [
    { x: -500, y: -250 }, // Top Left
    { x: -550, y: 50 },   // Mid Left
    { x: -450, y: 320 },  // Bottom Left
    { x: 500, y: -250 },  // Top Right
    { x: 550, y: 50 },    // Mid Right
    { x: 450, y: 320 },   // Bottom Right
  ]

  const mobilePositions = [
    { x: -140, y: -220 }, // Top Left
    { x: 140, y: -180 },  // Top Right
    { x: -150, y: 30 },   // Mid Left
    { x: 150, y: 60 },    // Mid Right
    { x: -130, y: 280 },  // Bottom Left
    { x: 130, y: 310 },   // Bottom Right
  ]

  const positions = isMobile ? mobilePositions : finalPositions
  const displayProducts = isMobile ? products.slice(0, 6) : products

  if (!mounted) return null

  return (
    <div className="bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <img
            src="/ams-logo.png"
            alt="AMS"
            className="h-10 w-auto"
          />
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-10 text-gray-400 text-sm font-medium tracking-widest uppercase">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#products" className="hover:text-primary transition-colors">Products</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
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

      {/* Hero Section */}
      <div id="home" ref={containerRef} className="relative" style={{ height: "170vh" }}>
        <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Background Animation */}
            <GamerHeroBackground phase={phase} />

            {/* Product Cards - CSS transitions handle all movement */}
            {displayProducts.map((product, index) => {
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
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    loading="eager"
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
                <img
                  src="/ams-logo.png"
                  alt="AMS"
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
                transform: phase === 1 ? 'scale(1)' : 'scale(0.9)',
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

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-[#0a0a0a] relative overflow-hidden">
        {/* bg1 Positioning - Full Section Coverage */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 animate-float">
          <Image
            src="/backgrounds/bg5.webp"
            alt="AMS background 1"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
              WHY CHOOSE <span className="text-[#ff6b00]">AMS</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto italic px-4">
              Your trusted partner for premium PC components and gaming hardware in Pakistan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111111] border-l-4 border-[#ff6b00] rounded-none p-8 hover:bg-[#1a1a1a] transition-all group">
              <div className="w-14 h-14 bg-[#ff6b00]/10 rounded-none flex items-center justify-center mb-6 group-hover:bg-[#ff6b00]/20 transition-colors">
                <Shield className="w-7 h-7 text-[#ff6b00]" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">Authentic Products</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                100% genuine components sourced directly from authorized distributors with full manufacturer warranty.
              </p>
            </div>

            <div className="bg-[#111111] border-l-4 border-[#8a2be2] rounded-none p-8 hover:bg-[#1a1a1a] transition-all group">
              <div className="w-14 h-14 bg-[#8a2be2]/10 rounded-none flex items-center justify-center mb-6 group-hover:bg-[#8a2be2]/20 transition-colors">
                <Zap className="w-7 h-7 text-[#8a2be2]" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">Expert Support</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Our team of PC enthusiasts provides personalized guidance to help you build the perfect system.
              </p>
            </div>

            <div className="bg-[#111111] border-l-4 border-[#ff6b00] rounded-none p-8 hover:bg-[#1a1a1a] transition-all group">
              <div className="w-14 h-14 bg-[#ff6b00]/10 rounded-none flex items-center justify-center mb-6 group-hover:bg-[#ff6b00]/20 transition-colors">
                <Cpu className="w-7 h-7 text-[#ff6b00]" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">Latest Hardware</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Stay ahead with the newest GPUs, CPUs, and components from top brands like NVIDIA, AMD, and Intel.
              </p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Products Grid Section */}
      <section id="products" className="py-24 px-8 bg-[#0a0a0a] relative overflow-hidden">
        {/* bg2 Positioning - Covering larger area */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 animate-float-delayed">
          <Image
            src="/backgrounds/bg4.jpg"
            alt="AMS background 2"
            fill
            className="object-cover scale-110"
          />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
              AMS <span className="text-[#ff6b00]">PRODUCTS</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto italic font-medium">
              Filter by category to find your perfect component
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
            {FEATURED_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 md:px-8 py-2 md:py-3 font-bold uppercase tracking-tighter transition-all duration-300 border-2 ${selectedCategory === cat.id
                  ? 'bg-[#ff6b00] border-[#ff6b00] text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] scale-110'
                  : 'bg-transparent border-[#2a2a2a] text-gray-500 hover:border-[#ff6b00] hover:text-[#ff6b00]'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <InfiniteProductScroller selectedCategory={selectedCategory} />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Custom PC Builds</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Let our experts help you design and build your dream gaming PC. We offer complete assembly services with cable management and testing.
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-black bg-transparent"
                onClick={() => window.open("https://wa.me/923348964450?text=I%20wanted%20guidance%20on%20the%20build%20something%20like%20this", "_blank")}
              >
                Learn More
              </Button>
            </div>

            <div className="bg-gradient-to-br from-gray-800/20 to-transparent border border-gray-700/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Upgrade Services</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Already have a PC? We can help upgrade your existing system with the latest components for maximum performance gains.
              </p>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                onClick={() => window.open("https://wa.me/923348964450?text=I%20wanted%20guidance%20on%20the%20build%20something%20like%20this", "_blank")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section >

      {/* Contact & Reviews Wrapper */}
      <div className="relative overflow-hidden">
        {/* bg3 Positioning - Covering both Contact and Reviews */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none z-0 animate-float-slow">
          <Image
            src="/backgrounds/bg6.jpg"
            alt="AMS background 3"
            fill
            className="object-cover"
          />
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-8 bg-transparent relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  GET IN <span className="text-primary italic">TOUCH</span>
                </h2>
                <p className="text-gray-400 text-base md:text-lg mb-8 px-2">
                  Have questions about our products or need help with your build? Reach out to us!
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Phone</p>
                      <p className="text-white font-medium">+923348964450</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="text-white font-medium">amspakistanofficial@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Location</p>
                      <p className="text-white font-medium">123 Tech Street, Gaming District</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Send us a message</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <Button
                    className="flex-1 bg-primary text-white hover:bg-orange-600 font-bold py-4 text-base md:text-lg rounded-lg shadow-[0_0_15px_rgba(255,107,0,0.2)]"
                    onClick={() => window.open("mailto:amspakistanofficial@gmail.com", "_blank")}
                  >
                    Email Us
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 text-white hover:bg-green-700 font-bold py-4 text-base md:text-lg rounded-lg"
                    onClick={() => window.open("https://wa.me/923348964450", "_blank")}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* Customer Reviews Section */}
        <section id="reviews" className="py-20 px-8 bg-transparent border-t border-[#1a1a1a] relative z-10">
          <div className="max-w-[1400px] mx-auto">
            {/* Section heading and description */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Customer Reviews</h2>
            <p className="text-gray-400 text-center mb-12 text-lg max-w-2xl mx-auto">Trusted by gamers and PC enthusiasts</p>

            {/* Horizontally scrolling review carousel */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4 w-max">
                {/* Review 1 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">AMS has the best selection of graphics cards in Pakistan. Their expertise and support are unmatched. Highly recommend!</p>
                  <p className="text-white font-semibold">Ahmed Khan</p>
                  <p className="text-gray-500 text-sm">RTX 4090</p>
                </div>

                {/* Review 2 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">Built my dream gaming rig with AMS custom PC building service. The build quality is exceptional and they explained everything.</p>
                  <p className="text-white font-semibold">Hassan Ali</p>
                  <p className="text-gray-500 text-sm">Custom Build</p>
                </div>

                {/* Review 3 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">Great selection of cooling solutions and cases. Fast delivery and excellent customer service. AMS is my go-to for all PC components.</p>
                  <p className="text-white font-semibold">Fatima Malik</p>
                  <p className="text-gray-500 text-sm">PC Coolers & Cases</p>
                </div>

                {/* Review 4 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">The processor I bought from AMS performs amazing. Fast shipping and quality was exactly as described. Definitely ordering again!</p>
                  <p className="text-white font-semibold">Ali Raza</p>
                  <p className="text-gray-500 text-sm">Intel i9 Processor</p>
                </div>

                {/* Review 5 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">Excellent customer support. They helped me choose the right components for my budget. AMS is the best in Pakistan.</p>
                  <p className="text-white font-semibold">Zain Ahmed</p>
                  <p className="text-gray-500 text-sm">Budget Build</p>
                </div>

                {/* Review 6 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">The SSD and storage options available at AMS are incredible. Prices are competitive and quality is premium. Highly satisfied!</p>
                  <p className="text-white font-semibold">Maria Khan</p>
                  <p className="text-gray-500 text-sm">Storage Solutions</p>
                </div>

                {/* Review 7 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">My gaming PC is running smoothly thanks to AMS. The components work perfectly together. Thanks for the amazing service!</p>
                  <p className="text-white font-semibold">Bilal Hassan</p>
                  <p className="text-gray-500 text-sm">Gaming Build</p>
                </div>

                {/* Review 8 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">AMS upgraded my old PC and the performance boost is incredible. Professional advice and excellent execution. Highly recommended!</p>
                  <p className="text-white font-semibold">Saira Ali</p>
                  <p className="text-gray-500 text-sm">PC Upgrade</p>
                </div>

                {/* Review 9 */}
                <div className="flex-shrink-0 w-72 md:w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">Best cooling solutions for my build! The case fans and CPU cooler keep my system running cool. AMS is reliable and trustworthy.</p>
                  <p className="text-white font-semibold">Hassan Malik</p>
                  <p className="text-gray-500 text-sm">Cooling Solutions</p>
                </div>

                {/* Review 10 */}
                <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">Fantastic experience from start to finish. AMS delivered exactly what they promised. Best PC parts store in Pakistan without doubt!</p>
                  <p className="text-white font-semibold">Farah Ahmed</p>
                  <p className="text-gray-500 text-sm">Complete Build</p>
                </div>
              </div>
            </div>
          </div>
        </section >
      </div>

      {/* Footer */}
      < footer className="py-12 px-8 bg-[#050505] border-t border-[#1a1a1a]" >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/ams-logo.png"
                alt="AMS"
                className="h-8 w-auto opacity-70"
              />
            </div>
            <p className="text-gray-600 text-sm">
              2025 AMS PC Parts. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer >

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
