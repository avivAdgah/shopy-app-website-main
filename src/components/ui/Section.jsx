import React from 'react'
import clsx from 'clsx'

const MAX_WIDTHS = {
  sm: 'max-w-xl',
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
}

export default function Section({ size = 'xl', className, children, ...props }) {
  return (
    <div className={clsx('mx-auto px-4 py-10 sm:px-6', MAX_WIDTHS[size], className)} {...props}>
      {children}
    </div>
  )
}
