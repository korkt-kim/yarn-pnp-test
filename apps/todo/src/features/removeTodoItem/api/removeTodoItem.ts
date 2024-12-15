import { useMutation, useQueryClient } from '@tanstack/react-query'

import { todoQueryKey } from '@/entities/TodoList/api/todoApi'
import { removeTodo } from '@/shared/apis/todoApi/fetchers'

export const useDeleteTodoItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string }) => removeTodo({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKey.list() })
    },
  })
}
