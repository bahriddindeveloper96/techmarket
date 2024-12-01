import { auth } from '../firebase/config'

// Protected routes that require authentication
const protectedRoutes = ['/profile', '/orders', '/settings']

// Auth guard for protected routes
export const requireAuth = (to, from, next) => {
  if (!auth.currentUser && protectedRoutes.includes(to.path)) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

// Guard for login page
export const requireNoAuth = (to, from, next) => {
  if (auth.currentUser) {
    next(to.query.redirect || '/')
  } else {
    next()
  }
}
