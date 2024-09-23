'use client'
import { CheckCheckIcon, Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion } from '@/actions/dataFetch'
import { getPendingMonthGoals } from '@/http/getPendingMonthGoals'

export function PendingMonthGoals({ category }: { category: string }) {
  // const { data: session } = useSession()
  // console.log(session)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pending-goals-month'],
    queryFn: async () => await getPendingMonthGoals(),
  })
  // console.log(data)

  if (isLoading || !data) {
    return null
  }
  async function handleCreateGoalCompletion(goalId: string) {
    const res = await createGoalCompletion({ goalId })
    console.log(res)
    queryClient.invalidateQueries({ queryKey: ['pending-goals-month'] })
    queryClient.invalidateQueries({ queryKey: ['summary-month'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.pendingGoals?.map(goal => {
        if (category === 'all') {
          return (
            <OutlineButton
              key={goal.id}
              onClick={() => handleCreateGoalCompletion(goal.id)}
              disabled={goal.completionCount >= goal.desiredFrequency}
            >
              {goal.completionCount >= goal.desiredFrequency ? (
                <CheckCheckIcon className="size-4 text-zinc-600" />
              ) : (
                <Plus className="size-4 text-zinc-600" />
              )}
              {goal.title} ({goal.completionCount}/{goal.desiredFrequency})
            </OutlineButton>
          )
        }
        if (goal.category === category) {
          return (
            <OutlineButton
              key={goal.id}
              onClick={() => handleCreateGoalCompletion(goal.id)}
              disabled={goal.completionCount >= goal.desiredFrequency}
            >
              {goal.completionCount >= goal.desiredFrequency ? (
                <CheckCheckIcon className="size-4 text-zinc-600" />
              ) : (
                <Plus className="size-4 text-zinc-600" />
              )}
              {goal.title} ({goal.completionCount}/{goal.desiredFrequency})
            </OutlineButton>
          )
        }
      })}
    </div>
  )
}
