  import { Navigate, Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage.jsx'
import ProblemsPage from './pages/ProblemsPage.jsx'
import ProblemDetail from './pages/ProblemDetail.jsx'  // Add this line
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/DashboardPage.jsx'

  function App() {

    const {isSignedIn, isLoaded} = useUser()

    if (!isLoaded) return null; //this is to prevent flickering of pages while clerk is loading the user state
    return (
      <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <Homepage /> : <Navigate to = {"/dashboard"} />}/>
        <Route path = "/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problems/:id" element={isSignedIn ? <ProblemDetail/> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
      </>
    )
  }
  export default App