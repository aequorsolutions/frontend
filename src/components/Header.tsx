import { auth } from '@/auth'
import SignOut from './SignOut'
import Avatar from './ui/avatar'
import { User } from 'lucide-react'

export async function Header() {
  const session = await auth()
  if (!session) return null

  return (
    <div className="flex mx-auto justify-between items-center py-4 w-full max-w-screen-lg px-4">
      {!session?.user?.image ? (
        <User />
      ) : (
        <Avatar imgSrc={session?.user?.image} />
      )}{' '}
      {session?.user?.name} <SignOut />
    </div>
  )
}
