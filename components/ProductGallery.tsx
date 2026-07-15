"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ProductGalleryImage } from "@/lib/product-catalog"

interface ProductGalleryProps {
  images: ProductGalleryImage[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex] || images[0]

  return (
    <div className="space-y-4">
      <div className="relative min-h-[360px] md:min-h-[560px] bg-[#111111] border border-[#1a1a1a] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        {selectedImage && (
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-8 md:p-14"
          />
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative aspect-square bg-[#111111] border rounded-lg overflow-hidden transition-all hover:border-primary/60",
              selectedIndex === index ? "border-primary shadow-[0_0_20px_rgba(255,107,0,0.18)]" : "border-[#1a1a1a]",
            )}
            aria-label={`View ${productName} image ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="120px"
              className="object-contain p-3"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
