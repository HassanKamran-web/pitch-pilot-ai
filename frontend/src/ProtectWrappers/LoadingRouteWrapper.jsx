import { Navigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import LoadingScreen from "../Components/LoadingScreen"

const LoadingRouteWrapper = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen/>
  }


  return children
}

export default LoadingRouteWrapper