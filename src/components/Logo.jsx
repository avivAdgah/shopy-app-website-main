import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export default function Logo({ className, variant = 'dark' }) {
  return (
    <Link
      to="/"
      className={clsx(
        'flex items-center gap-2 font-display text-lg font-bold',
        variant === 'light' ? 'text-white' : 'text-gray-900',
        className,
      )}
    >
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="url(#logo-gradient)" />
        <text
          x="32"
          y="45"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontSize="34"
          fill="#ffffff"
        >
          S
        </text>
      </svg>
      Shoply
    </Link>
  )
}
