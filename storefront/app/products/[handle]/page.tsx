import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
import { medusaServerClient } from '@/lib/medusa-client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Star } from 'lucide-react'
import ProductActions from '@/components/product/product-actions'
import ProductAccordion from '@/components/product/product-accordion'
import BundleOffer from '@/components/product/bundle-offer'
import UrgencyTimer from '@/components/product/urgency-timer'
import TrustBadges from '@/components/product/trust-badges'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { getProductPlaceholder } from '@/lib/utils/placeholder-images'
import { type VariantExtension } from '@/components/product/product-price'

const BUNDLE_PRODUCT_ID = 'prod_01KPE7BJVZB186B8GFN66T80AT'
const BUNDLE_HANDLE = 'revracers-mega-fleet-pack-5-car-collection-set'

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getBundleProduct() {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) return null

    const response = await medusaServerClient.store.product.list({
      handle: BUNDLE_HANDLE,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch {
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        allow_backorder: v.allow_backorder ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      ...(product.thumbnail ? { images: [{ url: product.thumbnail }] } : {}),
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const [product, bundleProduct] = await Promise.all([getProduct(handle), getBundleProduct()])

  if (!product) notFound()

  const variantExtensions = await getVariantExtensions(product.id)

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []).filter((img: { url: string }) => img.url !== product.thumbnail),
  ]
  const displayImages =
    allImages.length > 0 ? allImages : [{ url: getProductPlaceholder(product.id) }]

  const isBundle = product.id === BUNDLE_PRODUCT_ID
  const firstVariant = (product.variants?.[0] as { id: string; calculated_price?: { calculated_amount?: number; currency_code?: string } } | undefined)
  const singlePrice = firstVariant?.calculated_price?.calculated_amount ?? 1899
  const currency = firstVariant?.calculated_price?.currency_code || 'usd'
  const bundleVariant = (bundleProduct?.variants?.[0] as { id: string; calculated_price?: { calculated_amount?: number } } | undefined)
  const bundlePrice = bundleVariant?.calculated_price?.calculated_amount ?? 4999

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Product Images ── */}
          <div className="space-y-3">
            <div className="relative aspect-[4/4] overflow-hidden bg-muted rounded-2xl shadow-lg">
              <Image
                src={displayImages[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Safety badge overlay */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow text-xs font-semibold" style={{ color: 'var(--brand-primary)' }}>
                CE &amp; ASTM Certified
              </div>
            </div>
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.slice(1, 5).map((image: { url: string }, idx: number) => (
                  <div key={idx} className="relative aspect-square overflow-hidden bg-muted rounded-lg">
                    <Image
                      src={image.url}
                      alt={`${product.title} view ${idx + 2}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Title */}
            <div>
              {product.subtitle && (
                <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  {product.subtitle}
                </p>
              )}
              <h1 className="text-h2 font-heading font-semibold" style={{ color: 'var(--brand-secondary)' }}>
                {product.title}
              </h1>
              {/* Star rating */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" style={{ color: 'var(--brand-primary)' }} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.9 <span className="text-foreground font-medium">(1,247 reviews)</span></span>
              </div>
            </div>

            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={product.variants?.[0]?.id || null}
              currency={currency}
              value={singlePrice}
            />

            {/* Urgency Timer */}
            <UrgencyTimer />

            {/* Variant Selector + Price + Add to Cart */}
            {isBundle ? (
              <ProductActions product={product} variantExtensions={variantExtensions} />
            ) : (
              <>
                <ProductActions product={product} variantExtensions={variantExtensions} />

                {/* Bundle Offer — displayed below standard add-to-cart for single car pages */}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide">
                      Upgrade Your Order
                    </h3>
                    <span
                      className="text-xs font-semibold rounded-full px-2.5 py-1 text-white"
                      style={{ backgroundColor: 'var(--brand-primary)' }}
                    >
                      Save up to $20
                    </span>
                  </div>
                  <BundleOffer
                    singleVariantId={firstVariant?.id || ''}
                    bundleProductHandle={BUNDLE_HANDLE}
                    bundleVariantId={bundleVariant?.id}
                    singlePrice={singlePrice}
                    bundlePrice={bundlePrice}
                    currency={currency}
                  />
                </div>
              </>
            )}

            {/* Trust Badges */}
            <TrustBadges />

            {/* Accordion Sections */}
            <ProductAccordion
              description={product.description}
              details={product.metadata as Record<string, string> | undefined}
            />
          </div>
        </div>
      </div>
    </>
  )
}
