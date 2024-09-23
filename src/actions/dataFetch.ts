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

export interface SummaryResponse {
  summary: Summary
}

interface GoalCompletion {
  id: string
  title: string
  type: string
  category: string
  completedAt: string
}

interface GoalsPerWeek {
  weekOfMonth: number
  completions: GoalCompletion[]
}

interface MonthSummary {
  completed: number
  total: number
  goalsPerWeek: GoalsPerWeek[]
}

export interface MonthSummaryResponse {
  summary: MonthSummary
  categories: cateoryListType
}
export async function getWeekGoals() {
  const session = await auth()
  if (!session) throw new Error()
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/summary`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  })
  const data: SummaryResponse = await response.json()
  return { data }
}

export async function getMonthGoals() {
  const session = await auth()
  if (!session) throw new Error()
  const response = await fetch(
    `${process.env.NEXT_BACKEND_URL}/summary/month`,
    {
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    }
  )
  const data: MonthSummaryResponse = await response.json()
  return { data }
}

type cateoryIdType = { categoryId: string }
export async function createCategory({ nameInput }: { nameInput: string }) {
  const session = await auth()
  if (!session) throw new Error()

  const schema = z.object({
    name: z.string().min(1),
  })
  const parse = schema.safeParse({
    name: nameInput,
  })

  if (!parse.success) {
    console.log('not ok')
    return { message: 'Failed to create todo' }
  }

  const name = parse.data
  console.log(JSON.stringify({ name: name.name }))
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/categories`, {
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

export type cateoryListType = {
  userCategories: {
    id: string
    name: string
    createdAt: string
  }[]
}
export async function getCategories() {
  const session = await auth()
  if (!session) throw new Error()
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/categories`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  })
  const data: cateoryListType = await response.json()
  return { data }
}

interface CreateGoalProps {
  title: string
  category: string
  type: string
  desiredWeeklyFrequency: number
}
type CreatGoalRes = {
  goalId: string
}
export async function createGoal({
  title,
  category,
  type,
  desiredWeeklyFrequency,
}: CreateGoalProps) {
  const session = await auth()
  if (!session) throw new Error()
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/goals`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      categoryId: category,
      type: type,
      desiredWeeklyFrequency: desiredWeeklyFrequency,
    }),
  })
  const data: CreatGoalRes = await response.json()
  return { data }
}

export async function createGoalCompletion({ goalId }: { goalId: string }) {
  const session = await auth()
  if (!session) throw new Error()
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ goalId: goalId }),
  })
  const data: cateoryListType = await response.json()
  return { data }
}
