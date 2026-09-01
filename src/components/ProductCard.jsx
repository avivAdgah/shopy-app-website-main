import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import Card from './ui/Card.jsx'
import Button from './ui/Button.jsx'
import Badge from './ui/Badge.jsx'
import Rating from './ui/Rating.jsx'
import Skeleton from './ui/Skeleton.jsx'
import { useCart } from '../context/CartContext.jsx'
import { handleImageError } from '../utils/placeholderImage.js'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [imageLoaded, setImageLoaded] = useState(false)
  const isOnSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price)

  const handleAddToCart = (event) => {
    event.preventDefault()
    addItem(product.id, 1)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Card padding="none" className="group flex flex-col overflow-hidden transition-shadow hover:shadow-card-hover">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          {!imageLoaded && <Skeleton className="absolute inset-0" />}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(event) => {
              handleImageError(product.category)(event)
              setImageLoaded(true)
            }}
            className={clsx(
              'h-full w-full object-cover transition-all duration-300 group-hover:scale-105',
              imageLoaded ? 'opacity-100' : 'opacity-0',
            )}
          />
          {(isOnSale || product.isNew) && (
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {isOnSale && <Badge variant="sale">Sale</Badge>}
              {product.isNew && <Badge variant="new">New</Badge>}
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-primary-600">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="font-medium text-gray-900 hover:text-primary-600">
          {product.name}
        </Link>
        {typeof product.rating === 'number' && <Rating value={product.rating} count={product.reviewCount} />}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
            {isOnSale && (
              <span className="text-sm text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>
          <Button size="sm" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}
