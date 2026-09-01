import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CreditCard, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useOrders } from '../context/OrdersContext.jsx'
import CartSummary from '../components/CartSummary.jsx'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Heading from '../components/ui/Heading.jsx'
import Section from '../components/ui/Section.jsx'

export default function Checkout() {
  const { items, subtotal, discount, shipping: shippingCost, total, clearCart } = useCart()
  const { user } = useAuth()
  const { addOrder } = useOrders()
  const navigate = useNavigate()

  const [shipping, setShipping] = useState({
    fullName: user?.name ?? '',
    address: '',
    city: '',
    postalCode: '',
  })
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvc: '' })
  const [errors, setErrors] = useState({})
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handleChange = (field) => (event) => {
    setShipping((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handlePaymentChange = (field) => (event) => {
    setPayment((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (shipping.fullName.trim().length < 2) nextErrors.fullName = 'Enter your full name.'
    if (shipping.address.trim().length < 3) nextErrors.address = 'Enter a valid address.'
    if (shipping.city.trim().length < 2) nextErrors.city = 'Enter your city.'
    if (shipping.postalCode.trim().length < 3) nextErrors.postalCode = 'Enter a valid postal code.'
    if (payment.cardNumber.replace(/\s/g, '').length < 12) nextErrors.cardNumber = 'Enter a valid card number.'
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(payment.expiry.trim())) nextErrors.expiry = 'Use MM/YY.'
    if (!/^\d{3,4}$/.test(payment.cvc.trim())) nextErrors.cvc = 'Enter a valid CVC.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handlePlaceOrder = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setIsPlacingOrder(true)
    const orderId = `SH-${Date.now().toString(36).toUpperCase()}`

    await new Promise((resolve) => setTimeout(resolve, 500))

    addOrder({
      id: orderId,
      items: items.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      subtotal,
      discount,
      shipping: shippingCost,
      total,
      shippingAddress: shipping,
    })

    clearCart()
    setIsPlacingOrder(false)
    navigate(`/order-success/${orderId}`, { replace: true })
  }

  return (
    <Section>
      <Heading level={1} className="!text-2xl">
        Checkout
      </Heading>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <form className="flex flex-col gap-8" onSubmit={handlePlaceOrder} noValidate>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Shipping details</h2>
              <div className="mt-4 flex flex-col gap-4">
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
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <CreditCard className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  Payment
                </h2>
                <span className="text-xs font-medium text-gray-400">Demo mode — no real charge will be made</span>
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <Input
                  id="cardNumber"
                  label="Card number"
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  value={payment.cardNumber}
                  onChange={handlePaymentChange('cardNumber')}
                  error={errors.cardNumber}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="expiry"
                    label="Expiry"
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onChange={handlePaymentChange('expiry')}
                    error={errors.expiry}
                  />
                  <Input
                    id="cvc"
                    label="CVC"
                    inputMode="numeric"
                    placeholder="123"
                    value={payment.cvc}
                    onChange={handlePaymentChange('cvc')}
                    error={errors.cvc}
                  />
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" loading={isPlacingOrder}>
                Place order
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Secure checkout — your details are protected
              </p>
            </div>
          </form>
        </Card>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </Section>
  )
}
