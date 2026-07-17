import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact AMS Pakistan | WhatsApp, Email & Store Information",
  description: "Contact AMS Pakistan for premium PC parts, custom PC builds, pricing, availability, and store information.",
}

const contactItems = [
  {
    label: "WhatsApp",
    value: "+923348964450",
    href: "https://wa.me/923348964450",
    icon: MessageCircle,
  },
  {
    label: "Email",
    value: "amspakistanofficial@gmail.com",
    href: "mailto:amspakistanofficial@gmail.com",
    icon: Mail,
  },
  {
    label: "Business Hours",
    value: "Monday - Saturday, 10:00 AM - 8:00 PM",
    icon: Clock,
  },
  {
    label: "Store Address",
    value: "123 Tech Street, Gaming District, Pakistan",
    icon: MapPin,
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-primary hover:bg-primary/10"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>

        <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4">
              AMS Pakistan
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
              Contact Our PC Hardware Team
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium mb-8">
              Reach out for premium PC components, custom build guidance, pricing, product availability, and upgrade support.
            </p>

            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                Business Information
              </h2>
              <p className="text-gray-400 leading-relaxed font-medium">
                AMS Pakistan supplies premium gaming hardware, PC cases, cooling, fans, monitors, and custom build support for enthusiasts across Pakistan.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-4 bg-[#111111] border border-[#1a1a1a] rounded-lg p-5 md:p-6 transition-all hover:border-primary/40 hover:bg-[#151515]">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-semibold leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </div>
              )

              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={item.label}>
                  {content}
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-14 grid lg:grid-cols-[1fr_0.75fr] gap-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#1a1a1a] bg-[#111111]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff6b0014_1px,transparent_1px),linear-gradient(to_bottom,#8a2be214_1px,transparent_1px)] bg-[size:42px_42px]" />
            <div className="absolute inset-0 bg-radial-[circle_at_50%_50%,_var(--tw-gradient-stops)] from-primary/20 via-transparent to-transparent" />
            <div className="relative z-10 h-full min-h-[360px] flex flex-col items-center justify-center text-center p-8">
              <MapPin className="w-12 h-12 text-primary mb-5" />
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-3">
                Google Maps Placeholder
              </h2>
              <p className="text-gray-400 max-w-md font-medium">
                Embedded Google Maps location will appear here when the verified AMS store map link is available.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-lg p-8 md:p-10 flex flex-col justify-between">
            <div>
              <Phone className="w-10 h-10 text-primary mb-6" />
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                Need a Fast Reply?
              </h2>
              <p className="text-gray-400 leading-relaxed font-medium mb-8">
                WhatsApp is the quickest way to ask about current stock, pricing, and build compatibility.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-none bg-green-600 text-white hover:bg-green-700 font-black uppercase tracking-tighter"
            >
              <a href="https://wa.me/923348964450" target="_blank" rel="noreferrer">
                <MessageCircle className="w-5 h-5" />
                Open WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
