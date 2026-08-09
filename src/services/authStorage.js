const USERS_KEY = 'shoply_users'
const SESSION_KEY = 'shoply_session'

// Demo-only hashing (Web Crypto SHA-256, no salt/pepper). There is no backend
// here, so this is not a substitute for real authentication in production.
async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export async function registerUser({ name, email, password }) {
  const users = readUsers()
  const normalizedEmail = email.trim().toLowerCase()

  if (users.some((u) => u.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.')
  }

  const passwordHash = await hashPassword(password)
  const user = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, passwordHash }
  writeUsers([...users, user])

  return { id: user.id, name: user.name, email: user.email }
}

export async function loginUser({ email, password }) {
  const users = readUsers()
  const normalizedEmail = email.trim().toLowerCase()
  const user = users.find((u) => u.email === normalizedEmail)
  const passwordHash = await hashPassword(password)

  if (!user || user.passwordHash !== passwordHash) {
    throw new Error('Invalid email or password.')
  }

  return { id: user.id, name: user.name, email: user.email }
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}
