import React from 'react'
import { useCart } from '../context/CartContext.jsx'
import Card from './ui/Card.jsx'

export default function CartSummary({ children }) {
  const { subtotal, discount, discountRate, shipping, total, freeShippingThreshold } = useCart()

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>

      <dl className="mt-4 flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500">Subtotal</dt>
          <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <dt className="text-gray-500">Discount ({Math.round(discountRate * 100)}%)</dt>
            <dd className="font-medium text-green-600">-${discount.toFixed(2)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-gray-500">Shipping</dt>
          <dd className="font-medium text-gray-900">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </dd>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-gray-400">
            Free shipping on orders over ${freeShippingThreshold.toFixed(0)}
          </p>
        )}
      </dl>

      <div className="mt-4 flex justify-between border-t border-gray-100 pt-4">
        <span className="font-semibold text-gray-900">Total</span>
        <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
      </div>

      {children}
    </Card>
  )
}
