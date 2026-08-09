import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import CartSummary from '../components/CartSummary.jsx'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [shipping, setShipping] = useState({
    fullName: user?.name ?? '',
    address: '',
    city: '',
    postalCode: '',
  })
  const [errors, setErrors] = useState({})
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handleChange = (field) => (event) => {
    setShipping((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (shipping.fullName.trim().length < 2) nextErrors.fullName = 'Enter your full name.'
    if (shipping.address.trim().length < 3) nextErrors.address = 'Enter a valid address.'
    if (shipping.city.trim().length < 2) nextErrors.city = 'Enter your city.'
    if (shipping.postalCode.trim().length < 3) nextErrors.postalCode = 'Enter a valid postal code.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handlePlaceOrder = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setIsPlacingOrder(true)
    const orderId = `SH-${Date.now().toString(36).toUpperCase()}`
    const orderTotal = total

    await new Promise((resolve) => setTimeout(resolve, 500))

    clearCart()
    setIsPlacingOrder(false)
    navigate('/order-success', { state: { orderId, orderTotal }, replace: true })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">Shipping details</h2>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handlePlaceOrder} noValidate>
            <Input
              id="fullName"
              label="Full name"
              value={shipping.fullName}
              onChange={handleChange('fullName')}
              error={errors.fullName}
            />
            <Input
              id="address"
              label="Address"
              value={shipping.address}
              onChange={handleChange('address')}
              error={errors.address}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="city"
                label="City"
                value={shipping.city}
                onChange={handleChange('city')}
                error={errors.city}
              />
              <Input
                id="postalCode"
                label="Postal code"
                value={shipping.postalCode}
                onChange={handleChange('postalCode')}
                error={errors.postalCode}
              />
            </div>
            <Button type="submit" className="mt-2 w-full" loading={isPlacingOrder}>
              Place order
            </Button>
          </form>
        </Card>

        <CartSummary />
      </div>
    </div>
  )
}
