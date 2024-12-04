import { ITodoItem } from './scheme'

const fakeApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

export const getTodos = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`)
  const json = (await res.json()) as ITodoItem[]

  return json
}

export const getTodo = async ({ id }: { id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`)
  const json = (await res.json()) as ITodoItem[]

  return json.find(item => item.id === id)
}

export const addTodo = async () => {
  return await fakeApi()
}

export const removeTodo = async ({ id }: { id: string }) => {
  alert(id)
  return await fakeApi()
}

export const editTodo = async ({
  title,
  description,
  done,
}: {
  title: string
  description: string
  done: boolean
}) => {
  alert(`${title}, ${description},${done}`)

  return await fakeApi()
}

// export const toggleTodo = async () => {
//   return await fakeApi()
// }
