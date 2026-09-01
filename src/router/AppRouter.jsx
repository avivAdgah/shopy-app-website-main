import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Shop from '../pages/Shop.jsx'
import Product from '../pages/Product.jsx'
import Cart from '../pages/Cart.jsx'
import Checkout from '../pages/Checkout.jsx'
import OrderSuccess from '../pages/OrderSuccess.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Profile from '../pages/Profile.jsx'
import NotFound from '../pages/NotFound.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-success/:orderId"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
