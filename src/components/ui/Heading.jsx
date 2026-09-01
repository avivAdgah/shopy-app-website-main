import React from 'react'
import clsx from 'clsx'

const SIZES = {
  1: 'text-3xl sm:text-4xl',
  2: 'text-2xl sm:text-3xl',
  3: 'text-xl sm:text-2xl',
  4: 'text-lg',
}

export default function Heading({ as, level = 2, className, children, ...props }) {
  const Tag = as ?? `h${level}`
  return (
    <Tag className={clsx(SIZES[level], className)} {...props}>
      {children}
    </Tag>
  )
}
