'use client'

import { signIn } from 'next-auth/react'

const SignIn = () => {
  return (
    <div className="h-screen flex items-center justify-center mx-auto">
      <div className="max-w-lg w-full flex flex-col items-center gap-2">
        {/* <Image src={logoImg} alt="Logo da NLW Copa"/> */}
        <h1 className="text-3xl font-semibold text-center text-white mt-4">
          Entre para participar do <br /> Bolão da Copa NLW!
        </h1>

        <div className="flex flex-col p-6">
          <button
            type="button"
            className="text-lg text-white font-semibold bg-red-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2 hover:bg-red-600"
            onClick={() => signIn('google')}
          >
            Entre com o Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
