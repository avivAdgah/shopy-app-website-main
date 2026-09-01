import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const OrdersContext = createContext(null)

const ORDERS_KEY = 'shoply_orders'

function readStoredOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) ?? []
  } catch {
    return []
  }
}

export function OrdersProvider({ children }) {
  const { user } = useAuth()
  const [allOrders, setAllOrders] = useState(readStoredOrders)

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(allOrders))
  }, [allOrders])

  const addOrder = (order) => {
    const newOrder = { ...order, userId: user?.id ?? null, placedAt: new Date().toISOString() }
    setAllOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const orders = useMemo(
    () => allOrders.filter((order) => order.userId === user?.id),
    [allOrders, user],
  )

  const getOrderById = (orderId) => allOrders.find((order) => order.id === orderId)

  const value = { orders, addOrder, getOrderById }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) throw new Error('useOrders must be used within an OrdersProvider')
  return context
}
