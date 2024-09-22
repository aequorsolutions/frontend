import SignIn from '@/components/SignIn'
import SignOut from '@/components/SignOut'
import { authOptions } from '@/utils/authoptions'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import logo from '@/app/assets/logo-in-orbit.svg'
import rocketLaunchIllustration from '@/app/assets/lets-start-illustration.svg'
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession(authOptions)

  // console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {session ? (
        <div className="flex flex-col justify-center items-center gap-12 w-full">
          <div className="flex gap-6 w-full items-center justify-between px-10">
            <p> Welcome {session.user?.name}</p>
            <Link href={'/dashboard'}>Dashboard </Link> <SignOut />
          </div>
          <Image src={logo} alt="in.orbit" />

          <Image
            src={rocketLaunchIllustration}
            alt="Ilustração de uma mulher controlando um lançamento de um foguete através de um controle remoto"
          />
        </div>
      ) : (
        <SignIn />
      )}
    </main>
  )
}
