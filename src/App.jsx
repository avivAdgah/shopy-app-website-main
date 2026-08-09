import React from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Navbar from './components/Navbar.jsx'
import AppRouter from './router/AppRouter.jsx'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <AppRouter />
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
