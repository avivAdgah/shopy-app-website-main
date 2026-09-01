import React from 'react'
import { Star } from 'lucide-react'
import clsx from 'clsx'

export default function Rating({ value, count, size = 'sm', className }) {
  const starSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      <div className="flex items-center" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={clsx(
              starSize,
              index < Math.round(value) ? 'fill-highlight-400 text-highlight-400' : 'fill-gray-200 text-gray-200',
            )}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {value.toFixed(1)}
        {typeof count === 'number' && ` (${count})`}
      </span>
    </div>
  )
}
