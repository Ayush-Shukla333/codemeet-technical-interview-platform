import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to CodeMeet</h1>
      <SignedOut><SignInButton mode="modal"/></SignedOut>
      <SignedIn><SignOutButton/></SignedIn>

      <UserButton/>
    </>
  )
}

export default App
