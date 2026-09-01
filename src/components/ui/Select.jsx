import React from 'react'
import clsx from 'clsx'

export default function Select({ label, id, error, className, children, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={clsx(
          'rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/40',
          error ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-primary-500',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
