import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import Logo from '../components/Logo.jsx'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/

const PERKS = [
  { icon: Truck, label: 'Free shipping over $75' },
  { icon: RotateCcw, label: '30-day returns' },
  { icon: ShieldCheck, label: 'Secure checkout' },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Name must be at least 2 characters long.'
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
      const user = await register(form.name, form.email, form.password)
      toast.success(`Welcome, ${user.name}!`)
      navigate('/', { replace: true })
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
          <h1 className="mt-6 text-2xl font-semibold text-gray-900 lg:mt-0">Create your account</h1>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Log in
            </Link>
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <Input
              id="name"
              label="Full name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
              placeholder="Jane Doe"
            />
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
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              placeholder="At least 6 characters"
              trailingIcon={showPassword ? EyeOff : Eye}
              trailingIconLabel={showPassword ? 'Hide password' : 'Show password'}
              onTrailingIconClick={() => setShowPassword((prev) => !prev)}
            />
            <Button type="submit" className="mt-2 w-full" loading={isSubmitting}>
              Create account
            </Button>
          </form>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-accent-600 to-primary-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <Logo variant="light" />
        <div className="text-white">
          <p className="max-w-md font-display text-2xl font-semibold leading-snug">
            Join thousands finding everyday products, thoughtfully made.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {PERKS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-primary-50">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
