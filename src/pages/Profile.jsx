import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Package, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Section from '../components/ui/Section.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'

export default function Profile() {
  const { user, logout } = useAuth()
  const { orders } = useOrders()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Section size="sm" className="!py-16">
      <Breadcrumbs items={[{ label: 'Profile' }]} />
      <Card padding="none" className="mt-4 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <User className="h-7 w-7" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <dl className="mt-8 divide-y divide-gray-100 border-t border-gray-100">
          <div className="flex justify-between py-3 text-sm">
            <dt className="text-gray-500">Name</dt>
            <dd className="font-medium text-gray-900">{user.name}</dd>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900">{user.email}</dd>
          </div>
        </dl>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="text-sm font-semibold text-gray-900">Order history</h2>

          {orders.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              Order history will show up here once you place your first order.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {orders.map((order) => {
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0)
                return (
                  <li key={order.id}>
                    <Link
                      to={`/order-success/${order.id}`}
                      className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4 text-sm transition-colors hover:border-primary-300 hover:bg-primary-50/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                          <Package className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-gray-500">
                            {new Date(order.placedAt).toLocaleDateString()} · {itemCount}{' '}
                            {itemCount === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Delivered
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <Button variant="secondary" className="mt-6 w-full" onClick={handleLogout}>
          Log out
        </Button>
      </Card>
    </Section>
  )
}
