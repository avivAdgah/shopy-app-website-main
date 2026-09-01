import React from 'react'
import { Link } from 'react-router-dom'
import Button from './ui/Button.jsx'

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionTo, children }) {
  return (
    <div className="flex flex-col items-center px-4 py-20 text-center">
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </div>
      )}
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{title}</h2>
      {description && <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>}
      {actionLabel && actionTo && (
        <Button as={Link} to={actionTo} className="mt-6">
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  )
}
