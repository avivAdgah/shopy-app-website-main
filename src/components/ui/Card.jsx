import React from 'react'
import clsx from 'clsx'

const PADDING = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({ className, padding = 'md', children, ...props }) {
  return (
    <div
      className={clsx('rounded-2xl border border-gray-200 bg-white shadow-card', PADDING[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
}
