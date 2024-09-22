'use client'
import { signOut } from 'next-auth/react'

export default function SignOut() {
  function handleClick() {
    signOut({ redirectTo: '/', redirect: true })
  }
  return (
    <button type="button" onClick={() => handleClick()}>
      Logout
    </button>
  )
}
