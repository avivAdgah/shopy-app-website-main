import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const category = searchParams.get('category') ?? 'All'
  const sort = searchParams.get('sort') ?? 'featured'

  const setCategory = (nextCategory) => {
    const next = new URLSearchParams(searchParams)
    if (nextCategory === 'All') next.delete('category')
    else next.set('category', nextCategory)
    setSearchParams(next)
  }

  const setSort = (nextSort) => {
    const next = new URLSearchParams(searchParams)
    if (nextSort === 'featured') next.delete('sort')
    else next.set('sort', nextSort)
    setSearchParams(next)
  }

  const products = useMemo(() => {
    let result = PRODUCTS

    if (category !== 'All') {
      result = result.filter((product) => product.category === category)
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase()
      result = result.filter((product) => product.name.toLowerCase().includes(query))
    }

    result = [...result]
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [category, search, sort])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">Shop all products</h1>
        <p className="text-sm text-gray-500">{products.length} products</p>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products…"
            aria-label="Search products by name"
            className="w-full rounded-xl border border-gray-300 py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-xl border border-gray-300 py-2.5 pl-3 pr-8 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {['All', ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={
              category === cat
                ? 'rounded-full bg-primary-500 px-4 py-1.5 text-sm font-medium text-white'
                : 'rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100'
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <p className="text-lg font-medium text-gray-900">No products found</p>
          <p className="mt-1 text-sm text-gray-500">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
