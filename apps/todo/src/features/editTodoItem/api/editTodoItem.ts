import { useMutation, useQueryClient } from '@tanstack/react-query'

import { todoQueryKey } from '@/entities/TodoList/api/todoApi'
import { editTodo } from '@/shared/apis/todoApi/fetchers'
import { ITodoItem } from '@/shared/apis/todoApi/scheme'

export const useUpdateTodoItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, title, description, done }: ITodoItem) =>
      editTodo({ id, title, description, done }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKey.list() })
    },
  })
}
