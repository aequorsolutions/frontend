'use client'

import { signIn } from 'next-auth/react'
import { Button } from './ui/button'
import logo from '@/app/assets/logo-in-orbit.svg'
import rocketLaunchIllustration from '@/app/assets/lets-start-illustration.svg'

import Image from 'next/image'
import { InOrbitIcon } from './in-orbit-icon'

const SignIn = () => {
  return (
    <div className="h-screen flex-1 flex items-center justify-center mx-auto w-full">
      <div className="flex-1 flex flex-col gap-8 justify-center items-center h-screen">
        <Image src={logo} alt="in.orbit" />

        <Image
          src={rocketLaunchIllustration}
          alt="Ilustração de uma mulher controlando um lançamento de um foguete através de um controle remoto"
        />

        <p className="text-zinc-300 leading-relaxed max-w-80 text-center text-lg">
          Crie metas e acompanhe seu progresso ao longo do tempo
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 bg-violet-500/80 h-screen w-2/5">
        <div className="flex flex-col p-6">
          <Button
            variant="login"
            className="shadow-lg gap-4"
            size="lg"
            onClick={() => signIn('google')}
          >
            <InOrbitIcon className=" animate-pulse" />
            Entre com o Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
