import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 px-8 bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/ams-logo.png"
              alt="AMS"
              width={32}
              height={32}
              loading="lazy"
              sizes="32px"
              className="h-8 w-auto opacity-70"
            />
          </div>
          <p className="text-gray-600 text-sm">
            2025 AMS PC Parts. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <Link href="/privacy-terms" className="hover:text-primary transition-colors">
              Privacy & Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
