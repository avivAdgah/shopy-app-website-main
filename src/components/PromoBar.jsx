import React from 'react'
import { Truck } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function PromoBar() {
  const { freeShippingThreshold } = useCart()

  return (
    <div className="flex items-center justify-center gap-2 bg-gray-900 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      <Truck className="h-3.5 w-3.5 shrink-0 text-highlight-400" aria-hidden="true" />
      <span>Free shipping on orders over ${freeShippingThreshold.toFixed(0)}</span>
    </div>
  )
}
