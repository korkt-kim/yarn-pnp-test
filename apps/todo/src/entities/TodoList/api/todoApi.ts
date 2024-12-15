import { useQuery } from '@tanstack/react-query'

import { getTodo, getTodos } from '@/shared/apis/todoApi/fetchers'

export const useGetTodoList = ({
  search,
  done,
}: {
  search?: string
  done?: boolean
}) => {
  return useQuery({
    queryKey: todoQueryKey.list(search, done),
    queryFn: () => getTodos({ search, done }),
  })
}

export const useGetTodoItem = (id: string) => {
  return useQuery({
    queryKey: todoQueryKey.one(id),
    queryFn: () => getTodo({ id }),
  })
}

export const todoQueryKey = {
  list: (search?: string, done?: boolean) => ['todo', search, done] as const,
  one: (id: string) => ['todo', id] as const,
}
