import { ref } from 'vue'

interface User {
  id: string
  name: string
  role: string
}

const currentUser = ref<User | null>(null)

const storedUser = localStorage.getItem('currentUser')
if (storedUser) {
  try {
    currentUser.value = JSON.parse(storedUser)
  } catch (e) {
    console.error('Error parsing stored user:', e)
  }
}

export function useAuth() {
  const login = (user: User) => {
    currentUser.value = user
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  const isAuthenticated = () => {
    return currentUser.value !== null
  }

  return {
    currentUser,
    login,
    logout,
    isAuthenticated
  }
}
