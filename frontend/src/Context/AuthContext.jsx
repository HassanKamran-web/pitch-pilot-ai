import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUserData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (response.status === 200) {
        setUser(response.data.user)

      }
    } catch (error) {
      setUser(null)
      toast.error(error.response?.data?.message || "Auth error")
    } finally {
      setLoading(false)
    }
  }
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }
  useEffect(() => {
    const publicPaths = ["/", "/login", "/signup"];

    if (user && publicPaths.includes(window.location.pathname)) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (token) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, setUser, setLoading, loading, setToken, token, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)