import { Navigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import LoadingScreen from "../Components/LoadingScreen"
import { useState } from "react"

const ProtectedRouteWrapper = ({ children }) => {
  const { user, loading } = useAuth()
  const [defaultpage, setDefaultpage] = useState(false)
  if (!user) {
    setDefaultpage(true)
  } else {
    setDefaultpage(false)
  }

  if (defaultpage) {
    return <LoadingScreen />
  }
  if (loading) {
    return <LoadingScreen />
  }

  if (!user) return <Navigate to="/" replace />

  return children
}

export default ProtectedRouteWrapper