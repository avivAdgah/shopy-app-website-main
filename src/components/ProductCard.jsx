import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import Card from './ui/Card.jsx'
import Button from './ui/Button.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = (event) => {
    event.preventDefault()
    addItem(product.id, 1)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-card-hover">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-primary-600">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="font-medium text-gray-900 hover:text-primary-600">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}
