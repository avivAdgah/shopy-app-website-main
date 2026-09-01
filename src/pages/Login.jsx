import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import Rating from '../components/ui/Rating.jsx'
import Logo from '../components/Logo.jsx'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname ?? '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!EMAIL_REGEX.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.name}!`)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden">
            <Logo className="justify-center" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-gray-900 lg:mt-0">Log in to your account</h1>
          <p className="mt-2 text-sm text-gray-500">
            New here?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
              Create an account
            </Link>
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <Input
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
              placeholder="you@example.com"
            />
            <Input
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              placeholder="••••••••"
              trailingIcon={showPassword ? EyeOff : Eye}
              trailingIconLabel={showPassword ? 'Hide password' : 'Show password'}
              onTrailingIconClick={() => setShowPassword((prev) => !prev)}
            />
            <Button type="submit" className="mt-2 w-full" loading={isSubmitting}>
              Log in
            </Button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Demo store — your data stays on this device.
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary-600 to-accent-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Logo variant="light" />
        <div className="text-white">
          <Rating value={5} size="md" className="[&_span]:text-primary-50" />
          <p className="mt-4 max-w-md font-display text-2xl font-semibold leading-snug">
            &ldquo;Everyday products, thoughtfully made — Shoply is where I start every gift list.&rdquo;
          </p>
          <p className="mt-3 text-sm text-primary-50">Priya S. · Verified shopper</p>
        </div>
      </div>
    </div>
  )
}
