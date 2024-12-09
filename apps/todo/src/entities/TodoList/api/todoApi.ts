import { useQuery } from '@tanstack/react-query'

import { getTodo, getTodos } from '@/shared/apis/todoApi/fetchers'

export const useGetTodoList = () => {
  return useQuery({
    queryKey: todoQueryKey.list(),
    queryFn: () => getTodos(),
  })
}

export const useGetTodoItem = (id: string) => {
  return useQuery({
    queryKey: todoQueryKey.one(id),
    queryFn: () => getTodo({ id }),
  })
}

export const todoQueryKey = {
  list: () => ['todo'] as const,
  one: (id: string) => ['todo'] as const,
}
