'use client'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function SignOut() {
  function handleClick() {
    signOut({ callbackUrl: '/', redirect: true })
  }
  return (
    <button type="button" onClick={() => handleClick()}>
      Logout
    </button>
  )
}
