import React from 'react'
import clsx from 'clsx'

const VARIANTS = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:outline-primary-600',
  secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus-visible:outline-gray-400',
  danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50 focus-visible:outline-red-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-400',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  disabled,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-150',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </Component>
  )
}
