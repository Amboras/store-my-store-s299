'use client'

import Link from 'next/link'
import { Car, Globe, Share2, PlayCircle } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const footerLinks = {
  shop: [
    { label: 'All Toys', href: '/products' },
    { label: 'New Arrivals', href: '/products?sort=newest' },
    { label: 'Collections', href: '/collections' },
    { label: 'Bundle Deals', href: '/products' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Track Your Order', href: '/account/orders' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [
    { label: 'About', href: '/about' },
  ]

  if (policies?.privacy_policy) {
    companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  }
  if (policies?.terms_of_service) {
    companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  }
  if (policies?.refund_policy) {
    companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  }
  if (policies?.cookie_policy) {
    companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })
  }

  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--brand-secondary)' }}>
      <div className="container-custom py-section-sm">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-sm"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                <Car className="h-4 w-4 text-white" strokeWidth={2} />
              </div>
              <span className="font-heading text-xl font-semibold text-white">
                RevRacers
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
              High-quality plastic car toys built for curious young minds. Hours of imaginative play, engineered to last.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" aria-label="Social" className="hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Website" className="hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Video" className="hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <PlayCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-sm p-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-xs font-semibold text-white mb-1">Age Safety Rating</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>All toys suitable for ages 3+</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>CE & ASTM certified</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            &copy; {new Date().getFullYear()} RevRacers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs hover:text-white transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Manage Cookies
            </button>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Powered by Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
