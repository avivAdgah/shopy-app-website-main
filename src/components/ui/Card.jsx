import React from 'react'
import clsx from 'clsx'

export default function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx('rounded-2xl border border-gray-200 bg-white shadow-card', className)}
      {...props}
    >
      {children}
    </div>
  )
}
