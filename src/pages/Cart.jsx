import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext.jsx'
import CartItemRow from '../components/CartItemRow.jsx'
import CartSummary from '../components/CartSummary.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'

export default function Cart() {
  const { items, couponCode, applyCoupon } = useCart()
  const navigate = useNavigate()
  const [couponInput, setCouponInput] = useState(couponCode)

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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-gray-900">Your cart</h1>

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
    </div>
  )
}
