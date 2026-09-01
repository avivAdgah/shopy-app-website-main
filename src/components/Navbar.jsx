import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import clsx from 'clsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { CATEGORIES } from '../data/products.js'
import Logo from './Logo.jsx'

const NAV_LINKS = [{ to: '/', label: 'Home', end: true }]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [mobileSearchValue, setMobileSearchValue] = useState('')

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const submitSearch = (value) => {
    const query = value.trim()
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    submitSearch(searchValue)
  }

  const handleMobileSearchSubmit = (event) => {
    event.preventDefault()
    submitSearch(mobileSearchValue)
    setMenuOpen(false)
  }

  const linkClass = ({ isActive }) =>
    clsx(
      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900',
    )

  const mobileLinkClass = ({ isActive }) =>
    clsx(
      'flex items-center rounded-xl px-3.5 py-3 text-sm font-medium transition-colors',
      isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50',
    )

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}

          <div className="group relative">
            <NavLink to="/shop" end className={clsx(linkClass({ isActive: false }), 'flex items-center gap-1')}>
              Shop
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </NavLink>
            <div className="invisible absolute left-0 top-full z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 opacity-0 shadow-glow transition-all group-hover:visible group-hover:opacity-100">
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  to={`/shop?category=${encodeURIComponent(category)}`}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <form onSubmit={handleSearchSubmit} className="hidden flex-1 max-w-sm lg:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pl-9 pr-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>
        </form>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                {user.name}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-glow transition-colors hover:bg-primary-600"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1 sm:hidden">
          <Link to="/cart" className="relative rounded-lg p-2 text-gray-600" aria-label={`Cart, ${itemCount} items`}>
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-b-2xl border-t border-gray-100 bg-white px-4 py-4 shadow-glow sm:hidden">
            <form onSubmit={handleMobileSearchSubmit} className="mb-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={mobileSearchValue}
                  onChange={(event) => setMobileSearchValue(event.target.value)}
                  placeholder="Search products…"
                  aria-label="Search products"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-9 pr-3 text-sm focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>
            </form>

            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={mobileLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/shop" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                Shop
              </NavLink>
            </nav>

            <div className="mt-1 rounded-xl bg-gray-50 p-3">
              <p className="px-0.5 text-xs font-semibold uppercase tracking-wide text-gray-400">Categories</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    to={`/shop?category=${encodeURIComponent(category)}`}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-primary-300 hover:text-primary-700"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-4">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className={mobileLinkClass({ isActive: false })}>
                    <User className="mr-2 h-4 w-4" aria-hidden="true" />
                    Profile ({user.name})
                  </Link>
                  <button type="button" onClick={handleLogout} className={mobileLinkClass({ isActive: false })}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl border border-gray-300 px-3.5 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 rounded-xl bg-primary-500 px-3.5 py-3 text-center text-sm font-medium text-white shadow-glow hover:bg-primary-600"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/40 sm:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
