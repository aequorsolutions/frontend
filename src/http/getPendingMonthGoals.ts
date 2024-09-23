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

export async function getPendingMonthGoals(): Promise<PedingGoals> {
  const session = await auth()
  if (!session) throw new Error()
  const response = await fetch(
    `${process.env.NEXT_BACKEND_URL}/pending-goals/month`,
    {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    }
  )
  const data = await response.json()
  //   console.log(data)
  return data
}
