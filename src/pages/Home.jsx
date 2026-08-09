import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import Button from '../components/ui/Button.jsx'

const FEATURED = PRODUCTS.slice(0, 4)

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            New season, new essentials
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Everyday products, thoughtfully made
          </h1>
          <p className="mt-4 max-w-xl text-base text-gray-600">
            Discover electronics, fashion, home goods and sports gear curated for quality and
            value — with fast shipping and easy returns.
          </p>
          <Button as={Link} to="/shop" size="lg" className="mt-8">
            Shop now
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Featured products</h2>
          <Link to="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {FEATURED.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-gray-900">Shop by category</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 text-center font-medium text-gray-700 shadow-card transition-shadow hover:shadow-card-hover hover:text-primary-600"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-gray-900">Ready to find your next favorite thing?</h2>
        <p className="mt-2 text-sm text-gray-500">
          Browse the full catalog and filter by category, price, or search.
        </p>
        <Button as={Link} to="/shop" size="lg" className="mt-6">
          Explore the shop
        </Button>
      </section>
    </div>
  )
}
