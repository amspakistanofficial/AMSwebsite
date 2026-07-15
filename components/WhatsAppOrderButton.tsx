"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppOrderButtonProps {
  productName: string
  category: string
}

const AMS_WHATSAPP_NUMBER = "923348964450"

function buildOrderMessage(productName: string, category: string, productLink: string) {
  return `Hello AMS,

I would like to order the following product.

Product:
${productName}

Category:
${category}

Product Link:
${productLink}

Please share:

Price
Availability

Thank you.`
}

export function WhatsAppOrderButton({ productName, category }: WhatsAppOrderButtonProps) {
  const handleOrder = () => {
    const productLink = window.location.href
    const message = buildOrderMessage(productName, category, productLink)
    const whatsappUrl = `https://wa.me/${AMS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      type="button"
      size="lg"
      onClick={handleOrder}
      className="rounded-none bg-linear-to-r from-primary to-accent text-white hover:bg-orange-600 font-black uppercase tracking-tighter"
    >
      <MessageCircle className="w-5 h-5" />
      Order Now
    </Button>
  )
}
