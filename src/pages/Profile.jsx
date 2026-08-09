import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <Card className="p-6 sm:p-8">
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

        <p className="mt-4 text-sm text-gray-500">
          Order history will show up here once you place your first order.
        </p>

        <Button variant="secondary" className="mt-6 w-full" onClick={handleLogout}>
          Log out
        </Button>
      </Card>
    </div>
  )
}
