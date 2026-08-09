import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold text-primary-600">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">Page not found</h1>
      <p className="mt-2 text-sm text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button as={Link} to="/" className="mt-6">
        Back to home
      </Button>
    </div>
  )
}
