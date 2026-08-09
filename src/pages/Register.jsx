import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <h1 className="text-center text-2xl font-semibold text-gray-900">Create your account</h1>
      <p className="mt-2 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
          Log in
        </Link>
      </p>

      <Card className="mt-8 p-6 sm:p-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
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
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
            placeholder="At least 6 characters"
          />
          <Button type="submit" className="mt-2 w-full" loading={isSubmitting}>
            Create account
          </Button>
        </form>
      </Card>
    </div>
  )
}
