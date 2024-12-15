import { ITodoItem } from './scheme'

const fakeApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

export const getTodos = async ({
  search,
  done,
}: {
  search?: string
  done?: boolean
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`)
  const json = (await res.json()) as ITodoItem[]

  let ret = json

  if (search) {
    ret = ret.filter(item => item.title.includes(search))
  }

  if (typeof done !== 'undefined') {
    ret = ret.filter(item => item.done === done)
  }

  return ret
}

export const getTodo = async ({ id }: { id: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`)
  const json = (await res.json()) as ITodoItem[]

  return json.find(item => item.id === id)
}

export const addTodo = async ({ title, done }: Omit<ITodoItem, 'id'>) => {
  alert(`create ${title}, ${done}`)

  return await fakeApi()
}

export const removeTodo = async ({ id }: { id: string }) => {
  alert(id)
  return await fakeApi()
}

export const editTodo = async ({ title, description, done }: ITodoItem) => {
  alert(`edit ${title}, ${description},${done}`)

  return await fakeApi()
}

// export const toggleTodo = async () => {
//   return await fakeApi()
// }
