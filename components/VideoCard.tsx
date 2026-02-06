"use client"

import React, { useEffect, useRef, useState } from "react"

interface VideoCardProps {
    src: string
    fallbackSrc: string
}

export function VideoCard({ src, fallbackSrc }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        if (videoRef.current) {
            observer.observe(videoRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!videoRef.current) return

        if (isIntersecting) {
            videoRef.current.play().catch(() => {
                // Handle autoplay block
            })
        } else {
            videoRef.current.pause()
        }
    }, [isIntersecting])

    return (
        <div className="flex-shrink-0 w-[270px] aspect-[9/16] bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden relative hover:border-primary/50 transition-colors">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
            >
                <source src={src} type="video/mp4" />
                <source src={fallbackSrc} type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            </div>
        </div>
    )
}
