import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProductById } from '../data/products.js'

const CartContext = createContext(null)

const CART_KEY = 'shoply_cart'
const COUPON_KEY = 'shoply_coupon'

const COUPONS = {
  SAVE10: 0.1,
  SAVE20: 0.2,
}

const FREE_SHIPPING_THRESHOLD = 75
const SHIPPING_FLAT_RATE = 6.99

function readStoredItems() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) ?? []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredItems)
  const [couponCode, setCouponCode] = useState(() => localStorage.getItem(COUPON_KEY) ?? '')

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (couponCode) localStorage.setItem(COUPON_KEY, couponCode)
    else localStorage.removeItem(COUPON_KEY)
  }, [couponCode])

  const addItem = (productId, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { productId, quantity }]
    })
  }

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeItem(productId)
    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setItems([])
    setCouponCode('')
  }

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase()
    if (!normalized) {
      setCouponCode('')
      return { ok: true, message: 'Coupon removed.' }
    }
    if (!COUPONS[normalized]) {
      return { ok: false, message: 'That coupon code is not valid.' }
    }
    setCouponCode(normalized)
    return { ok: true, message: `Coupon "${normalized}" applied.` }
  }

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.productId)
          if (!product) return null
          return { ...item, product, subtotal: product.price * item.quantity }
        })
        .filter(Boolean),
    [items],
  )

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const subtotal = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.subtotal, 0),
    [detailedItems],
  )

  const discountRate = couponCode && COUPONS[couponCode] ? COUPONS[couponCode] : 0
  const discount = subtotal * discountRate
  const shipping = subtotal === 0 || subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE
  const total = subtotal - discount + shipping

  const value = {
    items: detailedItems,
    itemCount,
    subtotal,
    discount,
    discountRate,
    couponCode,
    shipping,
    total,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
