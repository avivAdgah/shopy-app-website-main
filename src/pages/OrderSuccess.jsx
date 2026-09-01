import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CheckCircle2, Home, Package, Truck } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import { useOrders } from '../context/OrdersContext.jsx'

const STEPS = [
  { icon: CheckCircle2, label: 'Order placed' },
  { icon: Package, label: 'Processing' },
  { icon: Truck, label: 'Shipped' },
  { icon: Home, label: 'Delivered' },
]

export default function OrderSuccess() {
  const { orderId } = useParams()
  const { getOrderById } = useOrders()
  const order = getOrderById(orderId)

  if (!order) {
    return <Navigate to="/shop" replace />
  }

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
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
          <dd className="font-medium text-gray-900">{order.id}</dd>
        </div>
        <div className="flex justify-between py-1">
          <dt className="text-gray-500">Items</dt>
          <dd className="font-medium text-gray-900">{itemCount}</dd>
        </div>
        <div className="flex justify-between py-1">
          <dt className="text-gray-500">Total paid</dt>
          <dd className="font-medium text-gray-900">${Number(order.total ?? 0).toFixed(2)}</dd>
        </div>
      </dl>

      <div className="mt-8 w-full rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isDone = index === 0
            return (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={
                      isDone
                        ? 'flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white'
                        : 'flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400'
                    }
                  >
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className={isDone ? 'text-xs font-medium text-gray-900' : 'text-xs text-gray-400'}>
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && <div className="mx-1 h-px flex-1 bg-gray-200" aria-hidden="true" />}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <Button as={Link} to="/shop" className="mt-8">
        Continue shopping
      </Button>
    </div>
  )
}
