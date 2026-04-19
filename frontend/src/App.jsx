import React, { lazy, Suspense } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
// import Login from './Pages/Login'
const Login = lazy(() => import('./Pages/Login'))
// import Register from './Pages/Register'
const Register = lazy(() => import('./Pages/Register'))
import { Toaster } from 'react-hot-toast'
// import Dashboard from './Pages/Dashboard'
const Dashboard = lazy(() => import('./Pages/Dashboard'))
// import Profile from './Pages/Profile'
const Profile = lazy(() => import('./Pages/Profile'))
// import Upload from './Pages/Upload'
const Upload = lazy(() => import('./Pages/Upload'))
// import Results from './Pages/Results'
const Results = lazy(() => import('./Pages/Results'))
// import Pricing from './Pages/Pricing'
const Pricing = lazy(() => import('./Pages/Pricing'))
// import LandingPage from './Pages/LandingPage'
const LandingPage = lazy(() => import('./Pages/LandingPage'))
import { AuthProvider } from './Context/AuthContext'
import ProtectedRouteWrapper from './ProtectWrappers/ProtectedRouteWrapper'
import LoadingRouteWrapper from './ProtectWrappers/LoadingRouteWrapper'
import LoadingScreen from './Components/LoadingScreen'


const App = () => {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Suspense fallback={<LoadingScreen/>}>
          <Routes>
            <Route path='*' element={<div className="text-center py-20 text-white text-2xl">404 Not Found</div>} />
            <Route path='/' element={
              <>
                <LoadingRouteWrapper>
                  <Navbar />
                  <LandingPage />
                </LoadingRouteWrapper>
              </>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/dashboard' element={
              <ProtectedRouteWrapper>
                <Dashboard />
              </ProtectedRouteWrapper>
            }>
              <Route path='profile' element={
                <ProtectedRouteWrapper>
                  <Profile />
                </ProtectedRouteWrapper>
              } />
              <Route path='upload' element={
                <ProtectedRouteWrapper>
                  <Upload />
                </ProtectedRouteWrapper>
              } />
              <Route path='results' element={
                <ProtectedRouteWrapper>
                  <Results />
                </ProtectedRouteWrapper>
              } />
              <Route path='pricing' element={
                <ProtectedRouteWrapper>
                  <Pricing />
                </ProtectedRouteWrapper>
              } />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  )
}

export default App