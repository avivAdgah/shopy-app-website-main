import React from 'react'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrdersProvider } from './context/OrdersContext.jsx'
import Navbar from './components/Navbar.jsx'
import PromoBar from './components/PromoBar.jsx'
import Footer from './components/Footer.jsx'
import AppRouter from './router/AppRouter.jsx'

export default function App() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <PromoBar />
            <Navbar />
            <main className="flex-1">
              <AppRouter />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  )
}
