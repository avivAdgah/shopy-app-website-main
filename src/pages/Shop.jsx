import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import Input from '../components/ui/Input.jsx'
import Select from '../components/ui/Select.jsx'
import Heading from '../components/ui/Heading.jsx'
import Section from '../components/ui/Section.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import PriceRangeFilter from '../components/PriceRangeFilter.jsx'
import Button from '../components/ui/Button.jsx'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'All'
  const sort = searchParams.get('sort') ?? 'featured'
  const search = searchParams.get('q') ?? ''
  const minPrice = searchParams.get('minPrice') ?? ''
  const maxPrice = searchParams.get('maxPrice') ?? ''

  const hasActiveFilters = category !== 'All' || Boolean(search) || Boolean(minPrice) || Boolean(maxPrice)

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

  const setSearch = (nextSearch) => {
    const next = new URLSearchParams(searchParams)
    if (!nextSearch) next.delete('q')
    else next.set('q', nextSearch)
    setSearchParams(next, { replace: true })
  }

  const setPriceRange = (nextMin, nextMax) => {
    const next = new URLSearchParams(searchParams)
    if (!nextMin) next.delete('minPrice')
    else next.set('minPrice', nextMin)
    if (!nextMax) next.delete('maxPrice')
    else next.set('maxPrice', nextMax)
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => setSearchParams({})

  const products = useMemo(() => {
    let result = PRODUCTS

    if (category !== 'All') {
      result = result.filter((product) => product.category === category)
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase()
      result = result.filter((product) => product.name.toLowerCase().includes(query))
    }

    if (minPrice) result = result.filter((product) => product.price >= Number(minPrice))
    if (maxPrice) result = result.filter((product) => product.price <= Number(maxPrice))

    result = [...result]
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [category, search, sort, minPrice, maxPrice])

  return (
    <Section>
      <Breadcrumbs items={[{ label: 'Shop' }]} />

      <div className="mt-4 flex flex-col gap-2">
        <Heading level={1}>Shop all products</Heading>
        <p className="text-sm text-gray-500">{products.length} products</p>
      </div>

      <div className="mt-6 w-full sm:max-w-xs">
        <Input
          id="search"
          type="search"
          icon={Search}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products…"
          aria-label="Search products by name"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Category</h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              {['All', ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                  className={
                    category === cat
                      ? 'rounded-lg bg-primary-50 px-3 py-2 text-left text-sm font-medium text-primary-700'
                      : 'rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 hover:bg-gray-100'
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <PriceRangeFilter min={minPrice} max={maxPrice} onChange={setPriceRange} />
        </aside>

        <div>
          <div className="flex items-center justify-end gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="sort" className="sr-only">
                Sort products
              </label>
              <Select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {products.length === 0 ? (
            <EmptyState icon={Search} title="No products found" description="Try a different search term or category.">
              <Button variant="secondary" className="mt-6" onClick={clearFilters}>
                Clear filters
              </Button>
            </EmptyState>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
