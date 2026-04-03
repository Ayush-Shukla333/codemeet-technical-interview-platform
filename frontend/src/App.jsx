import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { useState } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'

function App() {

  const {isSignedIn} = useUser()

  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
    </Routes>

    <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App