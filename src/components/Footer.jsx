import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, ShieldCheck, Twitter, Youtube } from 'lucide-react'
import { toast } from 'react-toastify'
import { CATEGORIES } from '../data/products.js'
import Logo from './Logo.jsx'
import Input from './ui/Input.jsx'
import Button from './ui/Button.jsx'

const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
]

const COMPANY_LINKS = ['About', 'Contact', 'FAQ']

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    toast.success('Thanks for subscribing!')
    setEmail('')
  }

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-sm text-gray-500">
            Everyday products, thoughtfully made. Electronics, fashion, home goods and sports gear curated for
            quality and value.
          </p>
          <div className="mt-2 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-primary-300 hover:text-primary-600"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">Shop</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-gray-500">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link to={`/shop?category=${encodeURIComponent(category)}`} className="hover:text-primary-600">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">Company</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-gray-500">
            {COMPANY_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="hover:text-primary-600">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">Stay in the loop</h3>
          <p className="mt-4 text-sm text-gray-500">Get new arrivals and deals sent to your inbox.</p>
          <form onSubmit={handleSubscribe} className="mt-3 flex items-start gap-2">
            <div className="flex-1">
              <Input
                id="footer-newsletter"
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <Button type="submit" size="md">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-gray-400 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Shoply. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Demo store — no real transactions are processed.
          </p>
        </div>
      </div>
    </footer>
  )
}
