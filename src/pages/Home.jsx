import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ArrowRight, RotateCcw, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Button from '../components/ui/Button.jsx'
import Heading from '../components/ui/Heading.jsx'
import Section from '../components/ui/Section.jsx'
import Input from '../components/ui/Input.jsx'
import Rating from '../components/ui/Rating.jsx'

const BESTSELLERS = PRODUCTS.slice(0, 4)

const CATEGORY_IMAGES = {
  Electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=450&fit=crop&auto=format&q=80',
  Fashion: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&h=450&fit=crop&auto=format&q=80',
  'Home & Living': 'https://images.unsplash.com/photo-1674600625818-94530dc168b6?w=600&h=450&fit=crop&auto=format&q=80',
  Sports: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=600&h=450&fit=crop&auto=format&q=80',
}

const CATEGORY_COLORS = {
  Electronics: 'from-primary-900/80',
  Fashion: 'from-accent-900/70',
  'Home & Living': 'from-amber-900/70',
  Sports: 'from-emerald-900/70',
}

const TRUST_POINTS = [
  { icon: Truck, title: 'Free shipping', description: 'On orders over $75' },
  { icon: RotateCcw, title: '30-day returns', description: 'No questions asked' },
  { icon: ShieldCheck, title: 'Secure checkout', description: 'Your data stays safe' },
  { icon: Sparkles, title: 'Curated quality', description: 'Hand-picked, every time' },
]

const TESTIMONIALS = [
  {
    name: 'Maya R.',
    quote: 'The checkout was so smooth and my order showed up faster than expected. Genuinely great quality for the price.',
  },
  {
    name: 'Daniel K.',
    quote: 'I was skeptical about buying electronics online, but the product page had everything I needed to decide. No regrets.',
  },
  {
    name: 'Priya S.',
    quote: "Shoply is my go-to now — the mix of home goods and fashion in one cart is exactly what I didn't know I needed.",
  },
]

export default function Home() {
  const { freeShippingThreshold } = useCart()
  const [email, setEmail] = useState('')

  const handleSubscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    toast.success('Thanks for subscribing!')
    setEmail('')
  }

  return (
    <div>
      <section className="overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col items-start text-left">
            <span className="rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
              New season, new essentials
            </span>
            <Heading level={1} className="mt-5 max-w-xl">
              Everyday products, thoughtfully made
            </Heading>
            <p className="mt-4 max-w-lg text-base text-gray-600">
              Discover electronics, fashion, home goods and sports gear curated for quality and
              value — with fast shipping and easy returns.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/shop" size="lg">
                Shop now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button as={Link} to="/shop" variant="ghost" size="lg">
                Explore categories
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-primary-600" aria-hidden="true" />
                Free shipping over ${freeShippingThreshold.toFixed(0)}
              </span>
              <span className="flex items-center gap-1.5">
                <RotateCcw className="h-4 w-4 text-primary-600" aria-hidden="true" />
                30-day returns
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary-600" aria-hidden="true" />
                Secure checkout
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(CATEGORY_IMAGES).map(([category, image], index) => (
              <div
                key={category}
                className={`overflow-hidden rounded-2xl shadow-glow ${index === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
              >
                <img src={image} alt={category} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Heading level={2}>Shop by category</Heading>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl shadow-card transition-shadow hover:shadow-card-hover"
              >
                <img
                  src={CATEGORY_IMAGES[category]}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${CATEGORY_COLORS[category]} via-black/10 to-transparent`} />
                <span className="relative z-10 p-4 text-lg font-semibold text-white">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <Section>
          <div className="flex items-center justify-between">
            <Heading level={2}>Bestsellers</Heading>
            <Link to="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {BESTSELLERS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      </section>

      <section className="border-y border-gray-100 bg-white py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
          {TRUST_POINTS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <Section>
          <Heading level={2} className="text-center">
            Loved by shoppers like you
          </Heading>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
                <Rating value={5} size="md" />
                <p className="mt-3 text-sm leading-relaxed text-gray-600">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                    {testimonial.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <section className="bg-gradient-to-br from-primary-600 to-accent-600 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <Heading level={2} className="text-white">
            Get new arrivals first
          </Heading>
          <p className="mt-2 text-sm text-primary-50">
            Join the list for early access to drops, deals, and restocks.
          </p>
          <form onSubmit={handleSubscribe} className="mt-6 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
            <div className="flex-1">
              <Input
                id="home-newsletter"
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="bg-white"
              />
            </div>
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
