import React from 'react'
import Input from './ui/Input.jsx'

export default function PriceRangeFilter({ min, max, onChange }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900">Price</h3>
      <div className="mt-3 flex items-center gap-2">
        <Input
          id="min-price"
          type="number"
          min="0"
          placeholder="Min"
          aria-label="Minimum price"
          value={min}
          onChange={(event) => onChange(event.target.value, max)}
        />
        <span className="text-gray-400">–</span>
        <Input
          id="max-price"
          type="number"
          min="0"
          placeholder="Max"
          aria-label="Maximum price"
          value={max}
          onChange={(event) => onChange(min, event.target.value)}
        />
      </div>
    </div>
  )
}
