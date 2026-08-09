import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Minus, Plus } from 'lucide-react'
import { getProductById } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import Button from '../components/ui/Button.jsx'

export default function Product() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <Navigate to="/404" replace />
  }

  const handleAddToCart = () => {
    addItem(product.id, quantity)
    toast.success(`${quantity} × ${product.name} added to cart`)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-gray-500">
        <Link to="/shop" className="hover:text-primary-600">
          Shop
        </Link>{' '}
        / <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wide text-primary-600">
            {product.category}
          </span>
          <h1 className="mt-2 text-2xl font-semibold text-gray-900">{product.name}</h1>
          <p className="mt-3 text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <p className="mt-4 leading-relaxed text-gray-600">{product.description}</p>
          <p className="mt-3 text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-xl border border-gray-300">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2.5 text-gray-600 hover:text-gray-900"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="p-2.5 text-gray-600 hover:text-gray-900"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
