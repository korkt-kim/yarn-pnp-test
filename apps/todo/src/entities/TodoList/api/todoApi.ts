import { useQuery } from '@tanstack/react-query'

import { getTodos } from '@/shared/apis/todoApi/fetchers'

export const useGetTodoList = () => {
  useQuery({
    queryKey: todoQueryKey.list(),
    queryFn: () => getTodos(),
  })
}

export const todoQueryKey = {
  list: () => ['todo'] as const,
}
