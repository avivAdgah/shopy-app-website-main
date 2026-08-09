import React from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

export default function OrderSuccess() {
  const location = useLocation()
  const { orderId, orderTotal } = location.state ?? {}

  if (!orderId) {
    return <Navigate to="/shop" replace />
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
      </div>
      <h1 className="mt-4 text-2xl font-semibold text-gray-900">Order placed!</h1>
      <p className="mt-2 text-sm text-gray-500">
        Thanks for your order. A confirmation has been sent to your email.
      </p>

      <dl className="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm">
        <div className="flex justify-between py-1">
          <dt className="text-gray-500">Order number</dt>
          <dd className="font-medium text-gray-900">{orderId}</dd>
        </div>
        <div className="flex justify-between py-1">
          <dt className="text-gray-500">Total paid</dt>
          <dd className="font-medium text-gray-900">${Number(orderTotal ?? 0).toFixed(2)}</dd>
        </div>
      </dl>

      <Button as={Link} to="/shop" className="mt-8">
        Continue shopping
      </Button>
    </div>
  )
}
