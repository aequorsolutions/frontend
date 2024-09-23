import { Plus } from 'lucide-react'

import logo from '@/app/assets/logo-in-orbit.svg'
import rocketLaunchIllustration from '@/app/assets/lets-start-illustration.svg'
import { Button } from './ui/button'
import Image from 'next/image'
import { DialogTrigger } from './ui/dialog'

export function EmptyGoals() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-8">
      <Image src={logo} alt="in.orbit" />

      <Image
        src={rocketLaunchIllustration}
        alt="Ilustração de uma mulher controlando um lançamento de um foguete através de um controle remoto"
      />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não criou nenhuma meta, que tal criou uma agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Criar meta
        </Button>
      </DialogTrigger>
    </main>
  )
}
