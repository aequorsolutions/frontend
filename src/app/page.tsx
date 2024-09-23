import SignIn from '@/components/SignIn'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  // console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {session ? redirect('/dashboard') : <SignIn />}
    </main>
  )
}
