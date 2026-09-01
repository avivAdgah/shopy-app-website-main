import React from 'react'
import clsx from 'clsx'

const VARIANTS = {
  sale: 'bg-accent-500 text-white',
  new: 'bg-primary-500 text-white',
  low: 'bg-highlight-100 text-highlight-700',
  in: 'bg-green-100 text-green-700',
  out: 'bg-gray-100 text-gray-500',
  neutral: 'bg-gray-100 text-gray-700',
}

export default function Badge({ variant = 'neutral', className, children, ...props }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
