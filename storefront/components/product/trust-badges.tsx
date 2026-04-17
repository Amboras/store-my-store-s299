import { Shield, Award, Truck, RotateCcw, Lock } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    label: 'CE & ASTM Certified',
    sub: 'Safety tested for ages 3+',
  },
  {
    icon: Award,
    label: 'Premium Quality',
    sub: 'BPA-free, non-toxic plastics',
  },
  {
    icon: Truck,
    label: 'Free US Shipping',
    sub: 'On orders over $50',
  },
  {
    icon: RotateCcw,
    label: '30-Day Returns',
    sub: 'No questions asked',
  },
  {
    icon: Lock,
    label: 'Secure Checkout',
    sub: '256-bit SSL encryption',
  },
]

export default function TrustBadges() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {badges.slice(0, 4).map((b) => {
          const Icon = b.icon
          return (
            <div
              key={b.label}
              className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-background px-3 py-2.5"
            >
              <div
                className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: 'rgba(232,91,4,0.1)' }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: 'var(--brand-primary)' }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight">{b.label}</p>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{b.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
      {/* Secure checkout full-width */}
      <div
        className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs text-muted-foreground"
        style={{ borderColor: 'rgba(232,91,4,0.2)', backgroundColor: 'rgba(232,91,4,0.03)' }}
      >
        <Lock className="h-3.5 w-3.5" style={{ color: 'var(--brand-primary)' }} />
        <span>Secure checkout powered by 256-bit SSL encryption</span>
      </div>
    </div>
  )
}
