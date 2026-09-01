import React from 'react'
import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
  decreaseLabel = 'Decrease quantity',
  increaseLabel = 'Increase quantity',
  disableDecrease = false,
  disableIncrease = false,
}) {
  return (
    <div className="flex items-center rounded-xl border border-gray-300">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disableDecrease}
        className="p-2.5 text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-gray-600"
        aria-label={decreaseLabel}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-medium" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disableIncrease}
        className="p-2.5 text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-gray-600"
        aria-label={increaseLabel}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
