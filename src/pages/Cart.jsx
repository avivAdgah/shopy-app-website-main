import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext.jsx'
import { PRODUCTS } from '../data/products.js'
import CartItemRow from '../components/CartItemRow.jsx'
import CartSummary from '../components/CartSummary.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import Heading from '../components/ui/Heading.jsx'
import Section from '../components/ui/Section.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

export default function Cart() {
  const { items, couponCode, applyCoupon } = useCart()
  const navigate = useNavigate()
  const [couponInput, setCouponInput] = useState(couponCode)
  const cartProductIds = new Set(items.map((item) => item.productId))
  const upsellProducts = PRODUCTS.filter((product) => !cartProductIds.has(product.id)).slice(0, 4)

  const handleApplyCoupon = (event) => {
    event.preventDefault()
    const result = applyCoupon(couponInput)
    if (result.ok) toast.success(result.message)
    else toast.error(result.message)
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        description="Looks like you haven't added anything yet. Start browsing to find something you'll love."
        actionLabel="Continue shopping"
        actionTo="/shop"
      />
    )
  }

  return (
    <Section size="lg">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <Heading level={1} className="mt-4 !text-2xl">
        Your cart
      </Heading>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItemRow key={item.productId} item={item} />
          ))}
          <Link to="/shop" className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700">
            &larr; Continue shopping
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <form onSubmit={handleApplyCoupon} className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                id="coupon"
                label="Coupon code"
                placeholder="e.g. SAVE10"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary">
              Apply
            </Button>
          </form>

          <CartSummary>
            <Button className="mt-6 w-full" onClick={() => navigate('/checkout')}>
              Proceed to checkout
            </Button>
          </CartSummary>
        </div>
      </div>

      {upsellProducts.length > 0 && (
        <div className="mt-16">
          <Heading level={3}>You might also like</Heading>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {upsellProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
