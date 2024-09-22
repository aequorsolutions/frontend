import SignOut from '@/components/SignOut'
import { authOptions } from '@/utils/authoptions'
import { getMonthGoals, getWeekGoals } from '@/actions/dataFetch'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { CreateCategoryButton } from '@/components/CreateCategoryButton'
import { ListOfCategories } from '@/components/ListOfCategories'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/')
  //   console.log("session: ")
  // console.log(session)
  const { data: weekData } = await getWeekGoals()
  const { data: monthData } = await getMonthGoals()
  // console.log(monthData)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <>
          <p> Welcome {session?.user?.name}</p>
          <SignOut />
          <div className="flex flex-row gap-12">
            <div className="flex flex-col gap-6 justify-start w-full">
              {monthData.summary?.goalsPerDay.map((item, key) => {
                return (
                  <div
                    key={item.completedAtDate}
                    className="bg-zinc-900 w-full rounded p-4 hover:scale-105 transition-all"
                  >
                    <p className="text-sm">{`${item.completedAtDate}`}</p>
                    {item.completions.map(item => {
                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-center"
                        >
                          <p className="pl-10">{item.title}</p>
                          <p className="pl-10 text-xs text-zinc-500">
                            {item.category}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col gap-6 justify-start w-full">
              {weekData.summary?.goalsPerDay?.map((item, key) => {
                return (
                  <div
                    key={item.completedAtDate}
                    className="bg-zinc-900 w-full rounded p-4 hover:scale-105 transition-all "
                  >
                    <p className="text-sm">{`${item.completedAtDate}`}</p>
                    {item.completions.map(item => {
                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-center"
                        >
                          <p className="pl-10">{item.title}</p>
                          <p className="pl-10 text-xs text-zinc-500">
                            {item.category}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <CreateCategoryButton />
            <ListOfCategories />
          </div>
        </>
      </main>
    </div>
  )
}
