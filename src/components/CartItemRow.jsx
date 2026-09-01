import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import QuantityStepper from './QuantityStepper.jsx'

export default function CartItemRow({ item }) {
  const { updateQuantity, removeItem } = useCart()
  const { product, quantity, subtotal } = item

  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 py-5 sm:flex-row sm:items-center">
      <Link to={`/product/${product.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <Link to={`/product/${product.id}`} className="font-medium text-gray-900 hover:text-primary-600">
          {product.name}
        </Link>
        <span className="text-sm text-gray-500">${product.price.toFixed(2)} each</span>
      </div>

      <div className="flex items-center gap-3">
        <QuantityStepper
          value={quantity}
          onDecrease={() => updateQuantity(product.id, quantity - 1)}
          onIncrease={() => updateQuantity(product.id, quantity + 1)}
          decreaseLabel={`Decrease quantity of ${product.name}`}
          increaseLabel={`Increase quantity of ${product.name}`}
        />

        <span className="w-20 text-right font-semibold text-gray-900">${subtotal.toFixed(2)}</span>

        <button
          type="button"
          onClick={() => removeItem(product.id)}
          className="p-2 text-gray-400 hover:text-red-600"
          aria-label={`Remove ${product.name} from cart`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
