'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ProductAccordionProps {
  description?: string | null
  details?: Record<string, string>
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ProductAccordion({ description, details }: ProductAccordionProps) {
  return (
    <div className="border-t">
      {description && (
        <AccordionItem title="Product Details" defaultOpen>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </AccordionItem>
      )}

      <AccordionItem title="Safety & Materials">
        <ul className="space-y-2">
          <li>Made from premium, durable ABS plastic — BPA-free and non-toxic</li>
          <li>CE certified (European safety standard)</li>
          <li>ASTM F963 certified (US toy safety standard)</li>
          <li>Suitable for children aged 3 years and above</li>
          <li>No small detachable parts that pose choking hazards</li>
          <li>Paints are lead-free and child-safe</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Shipping & Returns">
        <ul className="space-y-2">
          <li>Free standard US shipping on orders over $50</li>
          <li>Estimated delivery: 3–5 business days</li>
          <li>Express shipping available at checkout</li>
          <li>Free returns within 30 days of delivery</li>
          <li>All items ship in collector-grade, gift-ready packaging</li>
        </ul>
      </AccordionItem>

      {details && Object.keys(details).length > 0 && (
        <AccordionItem title="Specifications">
          <ul className="space-y-2">
            {Object.entries(details).map(([key, value]) => (
              <li key={key}>
                <strong className="text-foreground">{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </AccordionItem>
      )}
    </div>
  )
}
