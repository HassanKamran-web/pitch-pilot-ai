import React, { lazy, Suspense } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
const Login = lazy(() => import('./Pages/Login'))
const Register = lazy(() => import('./Pages/Register'))
const Dashboard = lazy(() => import('./Pages/Dashboard'))
const Profile = lazy(() => import('./Pages/Profile'))
const Upload = lazy(() => import('./Pages/Upload'))
const Results = lazy(() => import('./Pages/Results'))
const Pricing = lazy(() => import('./Pages/Pricing'))
const LandingPage = lazy(() => import('./Pages/LandingPage'))
import { Toaster } from 'react-hot-toast'
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