import { useMutation, useQueryClient } from '@tanstack/react-query'

import { todoQueryKey } from '@/entities/TodoList/api/todoApi'
import { addTodo } from '@/shared/apis/todoApi/fetchers'

export const useCreateTodoItem = () => {
  const queryClient = useQueryClient()

  useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKey.list() })
    },
  })
}
