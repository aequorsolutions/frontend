import { getCategories } from '@/actions/dataFetch'

export async function ListOfCategories() {
  const { data } = await getCategories()
  console.log(data)
  return (
    <div>
      <h1>List of Categories:</h1>
      <div className="w-36 mt-6 pl-4">
        {data.userCategories?.map(item => {
          return <p key={item.id}>{item.name}</p>
        })}
      </div>
    </div>
  )
}
