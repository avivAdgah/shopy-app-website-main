import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, Search } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Heading from '../components/ui/Heading.jsx'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-glow">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="mt-5 font-display text-sm font-bold uppercase tracking-wide text-primary-600">404</p>
      <Heading level={2} className="mt-2">
        Looks like this page wandered off
      </Heading>
      <p className="mt-2 text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button as={Link} to="/">
          Back to home
        </Button>
        <Button as={Link} to="/shop" variant="secondary">
          <Search className="h-4 w-4" aria-hidden="true" />
          Browse the shop
        </Button>
      </div>
    </div>
  )
}
