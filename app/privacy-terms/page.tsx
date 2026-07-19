import type { Metadata } from "next"
import { PolicyPage } from "@/components/PolicyPage"

export const metadata: Metadata = {
  title: "Privacy & Terms | AMS Pakistan",
  description: "Privacy and terms information for AMS Pakistan customers browsing and ordering PC hardware, gaming components, and custom build services.",
}

const privacyTermsSections = [
  {
    title: "Introduction",
    content: [
      "This Privacy & Terms page explains how AMS Pakistan handles customer information and sets out the basic conditions for using our website, browsing products, requesting quotes, and placing orders.",
      "By using the AMS website or contacting AMS through WhatsApp, email, or any listed business channel, you agree to these privacy practices and website terms.",
    ],
  },
  {
    title: "About AMS",
    content: [
      "AMS Pakistan is a PC hardware and gaming components brand focused on cases, cooling solutions, fans, monitors, custom build guidance, and related computer hardware.",
      "Our website is designed to help customers explore products, compare categories, request availability, and contact the AMS team for pricing or build advice.",
    ],
  },
  {
    title: "Privacy Policy",
    content: [
      "AMS respects customer privacy and uses personal information only for legitimate business purposes such as responding to inquiries, confirming orders, arranging delivery, and supporting warranty requests.",
      "We do not sell customer personal information. Information may be shared only where needed to operate the business, complete an order, comply with legal duties, or use trusted service providers.",
    ],
  },
  {
    title: "Information We Collect",
    content: [
      "We may collect your name, phone number, email address, delivery city or address, order details, product interests, quote requests, and messages sent to AMS.",
      "The website may also collect basic technical information such as device type, browser, viewed pages, and general usage patterns to improve performance and product browsing.",
    ],
  },
  {
    title: "How Customer Information Is Used",
    content: [
      "Customer information is used to reply to inquiries, share product availability, provide pricing, process orders, arrange delivery or pickup, and recommend compatible components.",
      "We may use aggregated or non-sensitive insights to improve product categories, stock planning, website speed, and the overall customer experience.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "The AMS website may use cookies or similar technologies to keep pages working properly, understand site performance, and improve navigation and product discovery.",
      "Customers can control cookies through browser settings, but disabling them may affect certain website features or analytics accuracy.",
    ],
  },
  {
    title: "Product Information",
    content: [
      "AMS aims to display accurate product names, categories, images, descriptions, features, and specifications for PC hardware and gaming components.",
      "Product images, included accessories, packaging, specifications, and availability may change due to supplier updates, manufacturer revisions, or stock changes. Customers should confirm final product details before ordering.",
    ],
  },
  {
    title: "Orders & Payments",
    content: [
      "Orders are confirmed only after AMS verifies product availability, current pricing, customer details, and delivery or pickup arrangements.",
      "Prices may change because of supplier pricing, exchange rates, promotions, or stock movement. Any payment instructions provided by AMS should be followed carefully, and customers should keep proof of payment where applicable.",
    ],
  },
  {
    title: "Warranty & Returns",
    content: [
      "Warranty coverage depends on the product, manufacturer, distributor policy, and condition of the item. AMS will guide customers through the warranty process where applicable.",
      "Returns or warranty claims may be declined for physical damage, misuse, improper installation, electrical damage, liquid exposure, unauthorized repairs, missing accessories, or other conditions excluded by the manufacturer or distributor.",
    ],
  },
  {
    title: "User Responsibilities",
    content: [
      "Customers are responsible for providing accurate contact, order, and delivery information and for confirming compatibility before purchase, especially for PC cases, cooling, power requirements, and custom builds.",
      "Customers should use purchased hardware according to manufacturer instructions and avoid installation practices that may damage components or void warranty coverage.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "The AMS name, website presentation, written content, graphics, product organization, and brand materials belong to AMS unless otherwise owned by manufacturers, suppliers, or partners.",
      "Website content may not be copied, reproduced, redistributed, or used commercially without written permission from AMS.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "AMS is not responsible for indirect, incidental, or consequential losses arising from website use, product delays, third-party service interruptions, or compatibility choices made without confirmation.",
      "Where liability applies, it is limited to the product or service supplied by AMS and subject to applicable warranty, supplier, and legal requirements.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "AMS uses reasonable technical and administrative measures to protect customer information from unauthorized access, misuse, loss, or alteration.",
      "No online platform can be guaranteed completely secure, so customers should avoid sending unnecessary sensitive information through public or unsecured channels.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "AMS may use third-party services such as WhatsApp, hosting providers, analytics tools, payment or delivery partners, and embedded website services to operate the business.",
      "These third parties may process limited information according to their own policies when customers interact with those services.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These privacy and website terms are governed by the applicable laws of Pakistan. Any concern should first be raised with AMS so both parties can seek a practical resolution.",
    ],
  },
  {
    title: "Contact Information",
    content: [
      "For privacy questions, order support, warranty guidance, or questions about these terms, contact AMS Pakistan at amspakistanofficial@gmail.com or WhatsApp +92 334 8964450.",
    ],
  },
]

export default function PrivacyTermsPage() {
  return (
    <PolicyPage
      eyebrow="AMS Policy"
      title="Privacy & Terms"
      description="Privacy practices and website terms for AMS Pakistan customers browsing, requesting quotes, and ordering premium PC hardware."
      updatedAt="July 19, 2026"
      sections={privacyTermsSections}
    />
  )
}
