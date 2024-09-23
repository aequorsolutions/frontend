import SignIn from '@/components/SignIn'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full">
      {session ? redirect('/dashboard') : <SignIn />}
    </main>
  )
}
