import React from 'react'
import clsx from 'clsx'

export default function Input({
  label,
  id,
  error,
  icon: Icon,
  trailingIcon: TrailingIcon,
  onTrailingIconClick,
  trailingIconLabel,
  className,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
        <input
          id={id}
          className={clsx(
            'w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition-colors',
            'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40',
            error ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-primary-500',
            Icon && 'pl-9',
            TrailingIcon && 'pr-9',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {TrailingIcon && (
          <button
            type="button"
            onClick={onTrailingIconClick}
            tabIndex={onTrailingIconClick ? 0 : -1}
            aria-label={trailingIconLabel}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            <TrailingIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
