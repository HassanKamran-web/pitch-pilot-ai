import { Navigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import LoadingScreen from "../Components/LoadingScreen"

const ProtectedRouteWrapper = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen/>
  }

  if (!user) return <Navigate to="/" replace />

  return children
}

export default ProtectedRouteWrapper