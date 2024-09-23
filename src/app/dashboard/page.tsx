'use client'
import { getCategories, getMonthGoals, getWeekGoals } from '@/actions/dataFetch'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { WeeklySummary } from '@/components/WeeklySummary'
import { MonthSummary } from '@/components/MonthSummary'
import { EmptyGoals } from '@/components/EmptyGoals'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { CreateGoal } from '@/components/CreateGoal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreateCategoryForm } from '@/components/CreateCategoryForm'

export default function Home() {
  // const session = await auth()
  const session = useSession()
  const route = useRouter()
  // console.log(session)
  if (session.status === 'unauthenticated') route.push('/')
  // const queryClient = useQueryClient()

  const { data: weekData, isLoading: load1 } = useQuery({
    queryKey: ['summary-week'],
    queryFn: async () => await getWeekGoals(),
  })
  const { data: monthData, isLoading: load2 } = useQuery({
    queryKey: ['summary-month'],
    queryFn: async () => await getMonthGoals(),
  })
  const { data: categoriesData, isLoading: load3 } = useQuery({
    queryKey: ['summary-categories'],
    queryFn: async () => await getCategories(),
  })

  const [isOpen, setIsOpen] = useState(false)
  if (load1 || !weekData || load2 || !monthData || load3 || !categoriesData) {
    return null
  }
  //   console.log("session: ")
  // console.log(session)
  // const { data: weekData } = await getWeekGoals()
  // const { data: monthData } = await getMonthGoals()
  // console.log(monthData)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col h-screen justify-start max-w-screen-lg mx-auto">
        <div className="flex justify-between gap-4">
          <div className="flex-1">Resumo de Metas</div>

          <CreateCategoryForm />
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4" />
              Cadastrar meta
            </Button>
          </DialogTrigger>
        </div>

        {weekData?.data.summary.total > 0 ||
        monthData?.data.summary.total > 0 ? (
          <div className="flex flex-col md:flex-row">
            <WeeklySummary
              summary={weekData?.data.summary}
              categories={categoriesData.data}
            />
            <MonthSummary
              summary={monthData?.data.summary}
              categories={categoriesData.data}
            />
          </div>

          // <EmptyGoals />
        ) : (
          <EmptyGoals />
        )}
        {/* <DialogContent>
        <h1>Eita!</h1>
      </DialogContent> */}
        <CreateGoal categories={categoriesData.data} setIsOpen={setIsOpen} />
      </div>
    </Dialog>
  )
}
