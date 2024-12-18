import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
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

        // Save token and user data
        const token = data.access_token
        if (!token) {
          throw new Error('No token received')
        }

        this.token = token
        this.user = data.user // Save user data directly from response
        localStorage.setItem('access_token', token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        return true
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    async fetchUserData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const userData = await response.json()
        this.user = userData
        return userData
      } catch (error) {
        console.error('Error fetching user data:', error)
        this.logout()
        throw error
      }
    },

    async validateToken() {
      if (!this.token) {
        // Try to restore from localStorage
        const savedToken = localStorage.getItem('access_token')
        const savedUser = localStorage.getItem('user')
        
        if (savedToken && savedUser) {
          this.token = savedToken
          this.user = JSON.parse(savedUser)
        } else {
          return false
        }
      }
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          this.logout()
          return false
        }

        // Update user data
        const userData = await response.json()
        this.user = userData
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      } catch (error) {
        console.error('Token validation error:', error)
        this.logout()
        return false
      }
    },

    logout() {
      console.log('Logging out')
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
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
