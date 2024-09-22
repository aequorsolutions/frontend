'use server'
import z from 'zod'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

interface Summary {
  completed: number
  total: number
  goalsPerDay: GoalPerDay[]
}

interface GoalPerDay {
  completedAtDate: string // A data de conclusão da meta
  completions: Completion[] // Lista de metas concluídas nesse dia
}

interface Completion {
  id: string
  title: string
  type: string // Tipo da meta (ex: semanal, mensal, etc.)
  category: string // Nome da categoria
  completedAt: string // Data e hora da conclusão da meta
}

interface SummaryResponse {
  summary: Summary
}

export async function getWeekGoals() {
  const session = await auth()
  if (!session) throw new Error()
  //   console.log("session: ")
  //   console.log(session)
  //   console.log({ Authorization: `Bearer ${session?.accessToken}` })
  const response = await fetch('http://localhost:3333/summary', {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  })
  const data: SummaryResponse = await response.json()
  return { data }
}

export async function getMonthGoals() {
  const session = await auth()
  if (!session) throw new Error()
  //   console.log("session: ")
  //   console.log(session)
  //   console.log({ Authorization: `Bearer ${session?.accessToken}` })
  const response = await fetch('http://localhost:3333/summary/month', {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  })
  const data: SummaryResponse = await response.json()
  return { data }
}

type cateoryIdType = { categoryId: string }
export async function createCategory(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error()

  const schema = z.object({
    name: z.string().min(1),
  })
  const parse = schema.safeParse({
    name: formData.get('name'),
  })

  if (!parse.success) {
    console.log('not ok')
    return { message: 'Failed to create todo' }
  }

  const name = parse.data
  console.log(JSON.stringify({ name: name.name }))
  const response = await fetch('http://localhost:3333/categories', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name.name }),
  })
  const data: cateoryIdType = await response.json()
  revalidatePath('/dashboard')
  return { data, error: { message: '' } }
}

type cateoryListType = {
  userCategories: {
    id: string
    name: string
    createdAt: string
  }[]
}
export async function getCategories() {
  const session = await auth()
  if (!session) throw new Error()
  //   console.log("session: ")
  //   console.log(session)
  //   console.log({ Authorization: `Bearer ${session?.accessToken}` })
  const response = await fetch('http://localhost:3333/categories', {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  })
  const data: cateoryListType = await response.json()
  return { data }
}
