'use client'

import { useState } from 'react'
import { Package, Tag, Check } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface BundleOfferProps {
  singleVariantId: string
  bundleProductHandle: string
  bundleVariantId?: string
  singlePrice: number
  bundlePrice: number
  currency: string
}

const BUNDLE_PRODUCT_ID = 'prod_01KPE7BJVZB186B8GFN66T80AT'

export default function BundleOffer({
  singleVariantId,
  bundleVariantId,
  singlePrice,
  bundlePrice,
  currency,
}: BundleOfferProps) {
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'bundle'>('single')
  const { addItem, isAddingItem } = useCart()

  const fmt = (cents: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100)

  const savings = bundlePrice < 6999 ? 6999 - bundlePrice : 2000

  const handleAddToCart = () => {
    if (selectedPlan === 'single') {
      addItem(
        { variantId: singleVariantId, quantity: 1 },
        {
          onSuccess: () => toast.success('Added to bag'),
          onError: (e: Error) => toast.error(e.message),
        }
      )
    } else if (bundleVariantId) {
      addItem(
        { variantId: bundleVariantId, quantity: 1 },
        {
          onSuccess: () => toast.success('Mega Fleet Pack added to bag!'),
          onError: (e: Error) => toast.error(e.message),
        }
      )
    }
  }

  return (
    <div className="space-y-3">
      {/* Single unit option */}
      <button
        onClick={() => setSelectedPlan('single')}
        className={`w-full flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
          selectedPlan === 'single'
            ? 'border-foreground bg-foreground/4'
            : 'border-border hover:border-foreground/40'
        }`}
      >
        <div
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            selectedPlan === 'single'
              ? 'border-foreground bg-foreground'
              : 'border-border'
          }`}
        >
          {selectedPlan === 'single' && <Check className="h-3 w-3 text-background" strokeWidth={3} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-semibold">Single Car</span>
            <span className="text-sm font-semibold">{fmt(singlePrice)}</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">One Turbo Sprint race car</p>
        </div>
      </button>

      {/* Bundle option */}
      <button
        onClick={() => setSelectedPlan('bundle')}
        className={`relative w-full flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
          selectedPlan === 'bundle'
            ? 'border-[color:var(--brand-primary)]'
            : 'border-[color:var(--brand-primary)] border-opacity-40 hover:border-opacity-80'
        }`}
        style={{
          borderColor: selectedPlan === 'bundle' ? 'var(--brand-primary)' : 'rgba(232,91,4,0.35)',
          backgroundColor: selectedPlan === 'bundle' ? 'rgba(232,91,4,0.04)' : undefined,
        }}
      >
        {/* Best Value badge */}
        <div
          className="absolute -top-3 right-4 rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          Best Value
        </div>
        <div
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all`}
          style={{
            borderColor: selectedPlan === 'bundle' ? 'var(--brand-primary)' : undefined,
            backgroundColor: selectedPlan === 'bundle' ? 'var(--brand-primary)' : undefined,
          }}
        >
          {selectedPlan === 'bundle' && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <span className="text-sm font-semibold flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" style={{ color: 'var(--brand-primary)' }} />
              Mega Fleet Pack (5 Cars)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs line-through text-muted-foreground">{fmt(6999)}</span>
              <span className="text-sm font-bold" style={{ color: 'var(--brand-primary)' }}>{fmt(bundlePrice)}</span>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              <Tag className="h-2.5 w-2.5" />
              Save {fmt(savings)}
            </span>
            <p className="text-xs text-muted-foreground">5-car collector gift set</p>
          </div>
        </div>
      </button>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={isAddingItem || (selectedPlan === 'bundle' && !bundleVariantId)}
        className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-wide text-white rounded-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      >
        {isAddingItem ? (
          <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        ) : selectedPlan === 'bundle' ? (
          <>
            <Package className="h-4 w-4" />
            Add Fleet Pack to Bag
          </>
        ) : (
          'Add to Bag'
        )}
      </button>
    </div>
  )
}
