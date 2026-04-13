import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { useState } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/DashboardPage'

function App() {

  const {isSignedIn, isLoaded} = useUser()

  if (!isLoaded) return null; //this is to prevent flickering of pages while clerk is loading the user state
  return (
    <>
    <Routes>
      <Route path="/" element={!isSignedIn ? <Homepage /> : <Navigate to = {"/dashboard"} />}/>
      <Route path = "/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
      <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
    </Routes>

    <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App