import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PRODUCTS, getProductById } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import Button from '../components/ui/Button.jsx'
import Heading from '../components/ui/Heading.jsx'
import Section from '../components/ui/Section.jsx'
import Badge from '../components/ui/Badge.jsx'
import Rating from '../components/ui/Rating.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { handleImageError } from '../utils/placeholderImage.js'

export default function Product() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <Navigate to="/404" replace />
  }

  const isOnSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price)
  const relatedProducts = PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id,
  ).slice(0, 4)

  const handleAddToCart = () => {
    addItem(product.id, quantity)
    toast.success(`${quantity} × ${product.name} added to cart`)
  }

  return (
    <Section size="lg">
      <Breadcrumbs
        items={[
          { label: 'Shop', to: '/shop' },
          { label: product.category, to: `/shop?category=${encodeURIComponent(product.category)}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            onError={handleImageError(product.category)}
            className="h-full w-full object-cover"
          />
          {(isOnSale || product.isNew) && (
            <div className="absolute left-3 top-3 flex flex-col gap-1">
              {isOnSale && <Badge variant="sale">Sale</Badge>}
              {product.isNew && <Badge variant="new">New</Badge>}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wide text-primary-600">
            {product.category}
          </span>
          <Heading level={1} className="mt-2 !text-2xl">
            {product.name}
          </Heading>
          {typeof product.rating === 'number' && (
            <Rating value={product.rating} count={product.reviewCount} size="md" className="mt-2" />
          )}
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
            {isOnSale && (
              <p className="text-lg text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</p>
            )}
          </div>
          <p className="mt-4 leading-relaxed text-gray-600">{product.description}</p>
          <div className="mt-3">
            <Badge variant={product.stock > 0 ? 'in' : 'out'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Badge>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <QuantityStepper
              value={quantity}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              onIncrease={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            />

            <Button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1">
              Add to cart
            </Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <Heading level={3}>You may also like</Heading>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
