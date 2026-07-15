"use client"

import React, { memo, useEffect, useRef, useState } from "react"

interface VideoCardProps {
    src: string
    fallbackSrc: string
}

export const VideoCard = memo(function VideoCard({ src, fallbackSrc }: VideoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isIntersecting, setIsIntersecting] = useState(false)
    const [shouldLoad, setShouldLoad] = useState(false)

    useEffect(() => {
        const card = cardRef.current
        if (!card) return

        const loadObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true)
                    loadObserver.disconnect()
                }
            },
            { rootMargin: "300px 0px", threshold: 0 }
        )

        const playbackObserver = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        loadObserver.observe(card)
        playbackObserver.observe(card)

        return () => {
            loadObserver.disconnect()
            playbackObserver.disconnect()
        }
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
        <div ref={cardRef} className="flex-shrink-0 w-[270px] aspect-[9/16] bg-[#111111] border border-[#1a1a1a] rounded-2xl overflow-hidden relative hover:border-primary/50 transition-colors">
            {shouldLoad && (
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
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            </div>
        </div>
    )
})
