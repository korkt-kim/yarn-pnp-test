import { useMutation, useQueryClient } from '@tanstack/react-query'

import { todoQueryKey } from '@/entities/TodoList/api/todoApi'
import { removeTodo } from '@/shared/apis/todoApi/fetchers'

export const useUpdateTodoItem = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()

  useMutation({
    mutationFn: () => removeTodo({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKey.list() })
    },
  })
}
