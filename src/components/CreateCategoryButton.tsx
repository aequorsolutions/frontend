import { createCategory } from '@/actions/dataFetch'

export function CreateCategoryButton() {
  // useActionState is available with React 19 (Next.js App Router)
  //   const [state, formAction] = useActionState(createCategory, initialState)

  return (
    <form action={createCategory} method="POST">
      <label htmlFor="name">Enter Category</label>
      <input type="text" id="name" name="name" required />
      <button type="submit">Add</button>

      {/* <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p> */}
    </form>
  )
}
