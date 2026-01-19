"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Phone, Mail, MapPin, Clock, Cpu, HardDrive, Monitor, Headphones, Zap, Shield, Package } from 'lucide-react'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<0 | 1 | 2>(0) // 0: logo only, 1: cards popping, 2: cards settled
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef<number | null>(null)
  const lastPhaseRef = useRef<number>(0)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleScroll = useCallback(() => {
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) {
        rafRef.current = null
        return
      }

      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollableDistance = containerHeight - viewportHeight
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)

      // Determine phase based on scroll progress
      let newPhase: 0 | 1 | 2
      if (progress < 0.33) {
        newPhase = 0
      } else if (progress < 0.66) {
        newPhase = 1
      } else {
        newPhase = 2
      }

      // Only update state if phase changed
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

  const products = [
    { image: "/products/1.png", name: "Graphics Cards", category: "GPU" },
    { image: "/products/2.png", name: "PC Cases", category: "Cases" },
    { image: "/products/3.png", name: "CPU Coolers", category: "Cooling" },
    { image: "/products/4.png", name: "Motherboards", category: "Components" },
    { image: "/products/5.png", name: "Memory", category: "RAM" },
    { image: "/products/6.png", name: "Storage", category: "SSD" },
    { image: "/products/7.png", name: "Power Supplies", category: "PSU" },
    { image: "/products/8.png", name: "Case Fans", category: "Cooling" },
  ]

  // Fixed positions for cards around the screen
  const finalPositions = [
    { x: -450, y: -280 },
    { x: -320, y: 180 },
    { x: -550, y: 50 },
    { x: 450, y: -260 },
    { x: 320, y: 200 },
    { x: 520, y: -50 },
    { x: -180, y: -350 },
    { x: 380, y: 350 },
  ]

  const mobilePositions = [
    { x: -120, y: -200 },
    { x: 120, y: -180 },
    { x: -140, y: 50 },
    { x: 130, y: 80 },
    { x: -100, y: 220 },
    { x: 110, y: 250 },
  ]

  const positions = isMobile ? mobilePositions : finalPositions
  const displayProducts = isMobile ? products.slice(0, 6) : products

  if (!mounted) return null

  return (
    <div className="bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img
              src="/ams-logo.png"
              alt="AMS"
              className="h-10 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-gray-400 text-sm font-medium tracking-wide">
            <a href="#home" className="hover:text-[#f5d742] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#f5d742] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#f5d742] transition-colors">Contact</a>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-[#f5d742] text-black hover:bg-[#e5c732] font-semibold px-5 tracking-wide"
          onClick={() => window.open("https://wa.me/923348964450", "_blank")}
        >
          Get Quote
        </Button>
      </nav>

      {/* Hero Section - 3 scroll heights */}
      <div id="home" ref={containerRef} className="relative" style={{ height: "300vh" }}>
        <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Product Cards - CSS transitions handle all movement */}
            {displayProducts.map((product, index) => {
              const pos = positions[index] || { x: 0, y: 0 }
              const delay = index * 50 // stagger animation

              return (
                <div
                  key={index}
                  className="absolute w-40 h-40 md:w-52 md:h-52 flex items-center justify-center group cursor-pointer"
                  style={{
                    transform: phase === 0
                      ? 'translate(0px, 0px) scale(0.3)'
                      : `translate(${pos.x}px, ${pos.y}px) scale(1)`,
                    opacity: phase === 0 ? 0 : 1,
                    transition: `transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 600ms ease ${delay}ms`,
                    willChange: 'transform, opacity',
                    zIndex: phase >= 1 ? 10 : 1,
                  }}
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(245,215,66,0.15)] hover:drop-shadow-[0_0_35px_rgba(245,215,66,0.3)] transition-all duration-300 hover:scale-110"
                    loading="eager"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center whitespace-nowrap">
                    <span className="text-[#f5d742] text-xs font-semibold tracking-wider uppercase bg-black/80 px-3 py-1 rounded-full">{product.name}</span>
                  </div>
                </div>
              )
            })}

            {/* Centered Logo - visible at start, fades when cards appear */}
            <div
              className="absolute z-10 flex flex-col items-center justify-center pointer-events-none"
              style={{
                opacity: phase === 0 ? 1 : 0,
                transform: phase === 0 ? 'scale(1)' : 'scale(0.8)',
                transition: 'opacity 500ms ease, transform 500ms ease',
                willChange: 'transform, opacity',
              }}
            >
              <img
                src="/ams-logo.png"
                alt="AMS"
                className="h-40 md:h-56 w-auto drop-shadow-2xl"
              />
              <p className="text-lg md:text-xl text-gray-500 mt-6 tracking-widest uppercase font-light">Premium PC Parts</p>
            </div>

            {/* Headline and CTA - appears after cards settle */}
            <div
              className="absolute z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
              style={{
                opacity: phase === 2 ? 1 : 0,
                transform: phase === 2 ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 600ms ease 200ms, transform 600ms ease 200ms',
                willChange: 'transform, opacity',
                pointerEvents: phase === 2 ? 'auto' : 'none',
              }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-tight tracking-tight">
                BUILD YOUR
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold text-[#f5d742] mb-6 leading-tight tracking-tight">
                DREAM RIG
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl mx-auto">
                Premium gaming hardware and PC components for enthusiasts
              </p>
              <Button
                size="lg"
                className="bg-[#f5d742] text-black hover:bg-[#e5c732] font-bold text-base px-10 py-6 rounded tracking-wide"
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
                <span className="tracking-widest uppercase text-xs">Scroll to explore</span>
                <ChevronDown className="w-5 h-5 text-[#f5d742]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              WHY CHOOSE <span className="text-[#f5d742]">AMS</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your trusted partner for premium PC components and gaming hardware
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 hover:border-[#f5d742]/30 transition-colors">
              <div className="w-14 h-14 bg-[#f5d742]/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-[#f5d742]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Authentic Products</h3>
              <p className="text-gray-400 leading-relaxed">
                100% genuine components sourced directly from authorized distributors with full manufacturer warranty.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 hover:border-[#f5d742]/30 transition-colors">
              <div className="w-14 h-14 bg-[#f5d742]/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-[#f5d742]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Expert Support</h3>
              <p className="text-gray-400 leading-relaxed">
                Our team of PC enthusiasts provides personalized guidance to help you build the perfect system.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 hover:border-[#f5d742]/30 transition-colors">
              <div className="w-14 h-14 bg-[#f5d742]/10 rounded-lg flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-[#f5d742]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Latest Hardware</h3>
              <p className="text-gray-400 leading-relaxed">
                Stay ahead with the newest GPUs, CPUs, and components from top brands like NVIDIA, AMD, and Intel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-24 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              SEE US IN <span className="text-[#f5d742]">ACTION</span>
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
              {[...Array(2)].map((_, setIndex) => (
                <>
                  {/* Video 1: RTX Unboxing */}
                  <div key={`v1-${setIndex}`} className="flex-shrink-0 w-[270px] aspect-[9/16] bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden relative hover:border-[#f5d742]/50 transition-colors">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/products/gpu-1.jpg"
                    >
                      {/* Replace with your video: src="/videos/your-video-1.mp4" */}
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-writing-with-a-pen-in-a-notebook-41437-large.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-semibold text-sm">RTX 4090 Unboxing</p>
                    </div>
                  </div>

                  {/* Video 2: Custom Build */}
                  <div key={`v2-${setIndex}`} className="flex-shrink-0 w-[270px] aspect-[9/16] bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden relative hover:border-[#f5d742]/50 transition-colors">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/products/case-1.jpg"
                    >
                      {/* Replace with your video: src="/videos/your-video-2.mp4" */}
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-laptop-in-a-pink-neon-atmosphere-50261-large.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-semibold text-sm">Custom Build Showcase</p>
                    </div>
                  </div>

                  {/* Video 3: Cooling Solutions */}
                  <div key={`v3-${setIndex}`} className="flex-shrink-0 w-[270px] aspect-[9/16] bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden relative hover:border-[#f5d742]/50 transition-colors">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/products/cooler-1.jpg"
                    >
                      {/* Replace with your video: src="/videos/your-video-3.mp4" */}
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-working-on-a-laptop-in-slow-motion-24-large.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-semibold text-sm">Cooling Setup</p>
                    </div>
                  </div>

                  {/* Video 4: GPU Installation */}
                  <div key={`v4-${setIndex}`} className="flex-shrink-0 w-[270px] aspect-[9/16] bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden relative hover:border-[#f5d742]/50 transition-colors">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/products/motherboard-1.jpg"
                    >
                      {/* Replace with your video: src="/videos/your-video-4.mp4" */}
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-computer-and-smartphone-in-a-workspace-top-shot-50235-large.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-semibold text-sm">GPU Installation Guide</p>
                    </div>
                  </div>

                  {/* Video 5: Build Review */}
                  <div key={`v5-${setIndex}`} className="flex-shrink-0 w-[270px] aspect-[9/16] bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden relative hover:border-[#f5d742]/50 transition-colors">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster="/products/ram-1.jpg"
                    >
                      {/* Replace with your video: src="/videos/your-video-5.mp4" */}
                      <source src="https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-home-4839-large.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-semibold text-sm">Build Review</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          {/* Custom scrollbar hide styles */}
          <style>{`
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
      <section id="services" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              OUR <span className="text-[#f5d742]">PRODUCTS</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From high-end GPUs to premium cases, we have everything you need
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Monitor, name: "Graphics Cards", desc: "RTX & RX Series" },
              { icon: HardDrive, name: "Storage", desc: "SSDs & HDDs" },
              { icon: Cpu, name: "Processors", desc: "Intel & AMD" },
              { icon: Package, name: "Cases", desc: "Gaming & Professional" },
            ].map((item, index) => (
              <div key={index} className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/50 hover:bg-[#151515] transition-all cursor-pointer group">
                <item.icon className="w-10 h-10 text-[#f5d742] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#f5d742]/10 to-transparent border border-[#f5d742]/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Custom PC Builds</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Let our experts help you design and build your dream gaming PC. We offer complete assembly services with cable management and testing.
              </p>
              <Button
                variant="outline"
                className="border-[#f5d742] text-[#f5d742] hover:bg-[#f5d742] hover:text-black bg-transparent"
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                GET IN <span className="text-[#f5d742]">TOUCH</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Have questions about our products or need help with your build? Reach out to us!
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f5d742]/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#f5d742]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <p className="text-white font-medium">+923348964450</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f5d742]/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#f5d742]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-white font-medium">amspakistanofficial@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f5d742]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#f5d742]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <p className="text-white font-medium">123 Tech Street, Gaming District</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-12">
              <h3 className="text-3xl font-bold text-white mb-8">Send us a message</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <Button
                  className="flex-1 bg-[#f5d742] text-black hover:bg-[#e5c732] font-bold py-4 text-lg rounded-lg"
                  onClick={() => window.open("mailto:amspakistanofficial@gmail.com", "_blank")}
                >
                  Email Us
                </Button>
                <Button
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 font-bold py-4 text-lg rounded-lg"
                  onClick={() => window.open("https://wa.me/923348964450", "_blank")}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section - Horizontally scrolling with 10 reviews */}
      <section id="reviews" className="py-20 px-6 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          {/* Section heading and description */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Customer Reviews</h2>
          <p className="text-gray-400 text-center mb-12 text-lg max-w-2xl mx-auto">Trusted by gamers and PC enthusiasts</p>

          {/* Horizontally scrolling review carousel */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4 w-max">
              {/* Review 1 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">AMS has the best selection of graphics cards in Pakistan. Their expertise and support are unmatched. Highly recommend!</p>
                <p className="text-white font-semibold">Ahmed Khan</p>
                <p className="text-gray-500 text-sm">RTX 4090</p>
              </div>

              {/* Review 2 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">Built my dream gaming rig with AMS custom PC building service. The build quality is exceptional and they explained everything.</p>
                <p className="text-white font-semibold">Hassan Ali</p>
                <p className="text-gray-500 text-sm">Custom Build</p>
              </div>

              {/* Review 3 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">Great selection of cooling solutions and cases. Fast delivery and excellent customer service. AMS is my go-to for all PC components.</p>
                <p className="text-white font-semibold">Fatima Malik</p>
                <p className="text-gray-500 text-sm">PC Coolers & Cases</p>
              </div>

              {/* Review 4 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">The processor I bought from AMS performs amazing. Fast shipping and quality was exactly as described. Definitely ordering again!</p>
                <p className="text-white font-semibold">Ali Raza</p>
                <p className="text-gray-500 text-sm">Intel i9 Processor</p>
              </div>

              {/* Review 5 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">Excellent customer support. They helped me choose the right components for my budget. AMS is the best in Pakistan.</p>
                <p className="text-white font-semibold">Zain Ahmed</p>
                <p className="text-gray-500 text-sm">Budget Build</p>
              </div>

              {/* Review 6 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">The SSD and storage options available at AMS are incredible. Prices are competitive and quality is premium. Highly satisfied!</p>
                <p className="text-white font-semibold">Maria Khan</p>
                <p className="text-gray-500 text-sm">Storage Solutions</p>
              </div>

              {/* Review 7 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">My gaming PC is running smoothly thanks to AMS. The components work perfectly together. Thanks for the amazing service!</p>
                <p className="text-white font-semibold">Bilal Hassan</p>
                <p className="text-gray-500 text-sm">Gaming Build</p>
              </div>

              {/* Review 8 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">AMS upgraded my old PC and the performance boost is incredible. Professional advice and excellent execution. Highly recommended!</p>
                <p className="text-white font-semibold">Saira Ali</p>
                <p className="text-gray-500 text-sm">PC Upgrade</p>
              </div>

              {/* Review 9 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">Best cooling solutions for my build! The case fans and CPU cooler keep my system running cool. AMS is reliable and trustworthy.</p>
                <p className="text-white font-semibold">Hassan Malik</p>
                <p className="text-gray-500 text-sm">Cooling Solutions</p>
              </div>

              {/* Review 10 */}
              <div className="flex-shrink-0 w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 hover:border-[#f5d742]/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#f5d742] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">Fantastic experience from start to finish. AMS delivered exactly what they promised. Best PC parts store in Pakistan without doubt!</p>
                <p className="text-white font-semibold">Farah Ahmed</p>
                <p className="text-gray-500 text-sm">Complete Build</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#050505] border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
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
              <a href="#" className="hover:text-[#f5d742] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#f5d742] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#f5d742] transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
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
      }} />

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
    </div>
  )
}
