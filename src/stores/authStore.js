import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    user: null
  }),

  getters: {
    isAuthenticated: (state) => {
      console.log('Checking auth state:', !!state.token)
      return !!state.token
    },
    getToken: (state) => state.token,
    getUser: (state) => state.user
  },

  actions: {
    async login(email, password) {
      try {
        console.log('Attempting login with:', { email, password })
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        console.log('Login response:', data)

        if (!response.ok) {
          throw new Error(data.message || data.error || 'Invalid credentials')
        }

        // Save token
        const token = data.access_token
        if (!token) {
          throw new Error('No token received')
        }

        console.log('Setting token:', token)
        this.token = token
        localStorage.setItem('access_token', token)
        
        return true
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    logout() {
      console.log('Logging out')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
    },

    async logoutApi() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.getToken}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Logout failed');
        }

        // Clear token and user data
        localStorage.removeItem('access_token');
        this.token = null;
        // router.push('/login'); // This line is commented out because router is not defined in this context
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },

    checkAuth() {
      const hasToken = !!this.token
      console.log('Checking auth:', hasToken)
      return hasToken
    }
  }
})
