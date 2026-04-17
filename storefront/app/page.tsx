'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Award,
  Zap,
  Package,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=80'

const categories = [
  {
    title: 'Race Cars',
    subtitle: 'Built for speed',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80',
  },
  {
    title: 'Truck Fleet',
    subtitle: 'Heavy-duty play',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&q=80',
  },
  {
    title: 'Collector Sets',
    subtitle: 'Premium bundles',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
]

const features = [
  {
    icon: Shield,
    title: 'Safety Certified',
    desc: 'CE & ASTM approved — safe for ages 3 and up',
  },
  {
    icon: Award,
    title: 'Premium Materials',
    desc: 'Durable, non-toxic ABS plastic built to last',
  },
  {
    icon: Zap,
    title: 'Vivid Detail',
    desc: 'High-fidelity paint, working wheels & moving parts',
  },
  {
    icon: Package,
    title: 'Gift-Ready',
    desc: 'Every order ships in collector-grade packaging',
  },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setSubmitted(true)
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-muted/40 stripe-bg">
        <div className="container-custom grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-28">
          {/* Text */}
          <div className="space-y-6 animate-fade-in-up">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              <Zap className="h-3 w-3" fill="currentColor" />
              New 2025 Collection
            </div>
            <h1 className="text-display font-heading font-semibold text-balance leading-none" style={{ color: 'var(--brand-secondary)' }}>
              Rev Up the&nbsp;
              <span style={{ color: 'var(--brand-primary)' }}>Fun.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Premium plastic car toys engineered for endless adventure. Durable, detailed, and
              designed to ignite imagination in every young driver.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="btn-brand-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-opacity"
                prefetch={true}
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide border transition-colors hover:bg-foreground hover:text-background"
                style={{ borderColor: 'var(--brand-secondary)', color: 'var(--brand-secondary)' }}
                prefetch={true}
              >
                Our Story
              </Link>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                    style={{ backgroundColor: `hsl(${i * 40}, 60%, 70%)` }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" style={{ color: 'var(--brand-primary)' }} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">4.9</strong> from 1,200+ happy parents
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-muted rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt="RevRacers — Premium Car Toy Collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg px-4 py-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ages</p>
                <p className="text-2xl font-heading font-semibold" style={{ color: 'var(--brand-primary)' }}>3+</p>
              </div>
              {/* Discount ribbon */}
              <div
                className="absolute bottom-4 left-4 rounded-xl px-4 py-2 text-white text-sm font-bold shadow-lg"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Up to 30% off bundles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="border-y" style={{ backgroundColor: 'var(--brand-secondary)' }}>
        <div className="container-custom py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex items-center gap-3 justify-center md:justify-center py-3">
              <Truck className="h-5 w-5 flex-shrink-0 text-white" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-white">Free Shipping</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center py-3">
              <RotateCcw className="h-5 w-5 flex-shrink-0 text-white" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-white">30-Day Returns</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Hassle-free guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center py-3">
              <Shield className="h-5 w-5 flex-shrink-0 text-white" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-white">Safety Certified</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>CE & ASTM approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category Grid ─── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">Shop by Category</p>
            <h2 className="text-h2 font-heading font-semibold" style={{ color: 'var(--brand-secondary)' }}>
              Find the Perfect Ride
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-muted block"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--brand-primary)' }}>{cat.subtitle}</p>
                  <h3 className="text-h3 font-heading font-semibold text-white">{cat.title}</h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/80 group-hover:text-white transition-colors">
                    <span>Shop now</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Dynamic Collections ─── */}
      {isLoading ? null : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ─── Features / Why RevRacers ─── */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">Why RevRacers</p>
            <h2 className="text-h2 font-heading font-semibold" style={{ color: 'var(--brand-secondary)' }}>
              Built Different. Built Better.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-background rounded-xl p-6 border border-border/60 hover:border-accent/40 transition-colors">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-lg mb-4"
                    style={{ backgroundColor: 'rgba(232,91,4,0.1)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: 'var(--brand-primary)' }} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Lifestyle / Editorial ─── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Kids playing with RevRacers cars"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute bottom-6 left-6 right-6 bg-white/95 rounded-xl px-5 py-4 backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-current" style={{ color: 'var(--brand-primary)' }} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">1,200+ verified reviews</span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">
                  &ldquo;My son hasn&apos;t put them down since Christmas!&rdquo;
                </p>
                <p className="mt-1 text-xs text-muted-foreground">— Sarah M., verified buyer</p>
              </div>
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Our Philosophy</p>
              <h2 className="text-h2 font-heading font-semibold" style={{ color: 'var(--brand-secondary)' }}>
                Toys That Earn a Place in Every Childhood Memory
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At RevRacers, we believe great toys do more than entertain. Every car we design
                stimulates creativity, develops fine motor skills, and sparks the kind of focused
                play that parents love and kids crave.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We use only premium, safety-certified plastics — free from BPA and harmful
                chemicals — so you can hand them over with complete peace of mind.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide link-underline pb-0.5"
                style={{ color: 'var(--brand-primary)' }}
                prefetch={true}
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="py-section" style={{ backgroundColor: 'var(--brand-secondary)' }}>
        <div className="container-custom max-w-xl text-center">
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-full mb-4"
            style={{ backgroundColor: 'rgba(232,91,4,0.2)' }}
          >
            <Zap className="h-5 w-5" style={{ color: 'var(--brand-primary)' }} />
          </div>
          <h2 className="text-h2 font-heading font-semibold text-white">
            First Dibs on New Drops
          </h2>
          <p className="mt-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Join the RevRacers crew. Get exclusive deals, early access, and play-time inspiration delivered to your inbox.
          </p>
          {submitted ? (
            <div className="mt-8 rounded-xl border px-6 py-4" style={{ borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <p className="text-white font-semibold">You&apos;re in the race!</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Check your inbox for a welcome gift.</p>
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-lg px-4 py-3 text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:border-white/50 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold uppercase tracking-wide rounded-lg text-white whitespace-nowrap hover:opacity-90 transition-opacity"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                Join Now
              </button>
            </form>
          )}
          <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  )
}
