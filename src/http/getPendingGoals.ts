'use server'
import { auth } from '@/auth'

export interface PedingGoals {
  pendingGoals: {
    id: string
    title: string
    category: string
    desiredFrequency: number
    completionCount: number
  }[]
}

export async function getPendingWeekGoals(): Promise<PedingGoals> {
  const session = await auth()
  if (!session) throw new Error()
  //   const { data: session } = useSession()

  //   if (!session) throw new Error()
  //   console.log(session)
  // console.log({ Authorization: `Bearer ${session.accessToken}` })
  const response = await fetch('http://localhost:3333/pending-goals', {
    headers: { Authorization: `Bearer ${session.accessToken}` },
  })
  const data = await response.json()
  //   console.log(data)
  return data
}

// export async function getPendingMonthGoals() {
//   const session = await auth()
//   if (!session) throw new Error()
//   //   console.log("session: ")
//   //   console.log(session)
//   //   console.log({ Authorization: `Bearer ${session?.accessToken}` })
//   const response = await fetch('http://localhost:3333/pending-goals/month', {
//     headers: { Authorization: `Bearer ${session?.accessToken}` },
//   })
//   const data: PedingGoals = await response.json()
//   return { data }
// }
