import type { Metadata } from "next"
import { Cpu, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "About AMS Pakistan | Premium PC Hardware",
  description: "Learn about AMS Pakistan, a premium PC hardware brand for gaming components, custom builds, and expert support.",
}

const values = [
  {
    title: "Authentic Products",
    description: "Genuine PC components selected for gaming builds, upgrades, and workstation performance.",
    icon: Shield,
    accent: "#ff6b00",
  },
  {
    title: "Expert Guidance",
    description: "Practical build advice from a team focused on compatibility, thermals, and long-term value.",
    icon: Zap,
    accent: "#8a2be2",
  },
  {
    title: "Latest Hardware",
    description: "Curated cases, cooling, fans, monitors, and hardware for modern AMS gaming setups.",
    icon: Cpu,
    accent: "#ff6b00",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <section className="text-center mb-14">
          <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">
            AMS Pakistan
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Premium PC Hardware For Serious Builds
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium max-w-3xl mx-auto">
            AMS Pakistan helps gamers and PC enthusiasts choose dependable components, plan balanced builds, and upgrade with confidence.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          {values.map((value) => {
            const Icon = value.icon

            return (
              <div
                key={value.title}
                className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 transition-all hover:border-primary/30 hover:bg-[#151515]"
              >
                <div
                  className="w-14 h-14 rounded-none flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${value.accent}1a` }}
                >
                  <Icon className="w-7 h-7" style={{ color: value.accent }} />
                </div>
                <h2 className="text-xl font-black text-white mb-3 uppercase tracking-tighter">
                  {value.title}
                </h2>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {value.description}
                </p>
              </div>
            )
          })}
        </section>
      </div>
    </main>
  )
}
