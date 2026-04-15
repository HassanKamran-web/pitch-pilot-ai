import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { Toaster } from 'react-hot-toast'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import Upload from './Pages/Upload'
import Results from './Pages/Results'
import Pricing from './Pages/Pricing'
import ProtectedRouteWrapper from './ProtectWrappers/ProtectedRouteWrapper'
import { AuthProvider } from './Context/AuthContext'
import LandingPage from './Pages/LandingPage'


const App = () => {
  return (
    <>
    <Toaster />
    <AuthProvider>
    <Routes>
      <Route path='*' element={<div className="text-center py-20 text-white text-2xl">404 Not Found</div>}/>
      <Route path='/' element={
        <>
        <Navbar/>
        <LandingPage/>
        </>
        }/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      <Route path='/dashboard' element={
      <ProtectedRouteWrapper>
        <Dashboard/>
      </ProtectedRouteWrapper>
        }>
      <Route path='profile' element={
        <ProtectedRouteWrapper>
          <Profile/>
        </ProtectedRouteWrapper>
    }/>
      <Route path='upload' element={
        <ProtectedRouteWrapper>
          <Upload/>
        </ProtectedRouteWrapper>
    }/>
      <Route path='results' element={
        <ProtectedRouteWrapper>
          <Results/>
        </ProtectedRouteWrapper>
    }/>
      <Route path='pricing' element={
        <ProtectedRouteWrapper>
          <Pricing/>
        </ProtectedRouteWrapper>
    }/>
      </Route>
    </Routes>
    </AuthProvider>
    </>
  )
}

export default App