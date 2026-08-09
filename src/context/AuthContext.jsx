import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginUser, registerUser, saveSession, clearSession, readSession } from '../services/authStorage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession())

  useEffect(() => {
    if (user) saveSession(user)
    else clearSession()
  }, [user])

  const login = async (email, password) => {
    const loggedInUser = await loginUser({ email, password })
    setUser(loggedInUser)
    return loggedInUser
  }

  const register = async (name, email, password) => {
    const newUser = await registerUser({ name, email, password })
    setUser(newUser)
    return newUser
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
