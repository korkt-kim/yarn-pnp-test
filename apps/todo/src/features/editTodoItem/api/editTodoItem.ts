import { useMutation, useQueryClient } from '@tanstack/react-query'

import { todoQueryKey } from '@/entities/TodoList/api/todoApi'
import { editTodo } from '@/shared/apis/todoApi/fetchers'

export const useUpdateTodoItem = ({
  title,
  description,
  done,
}: {
  title: string
  description: string
  done: boolean
}) => {
  const queryClient = useQueryClient()

  useMutation({
    mutationFn: () => editTodo({ title, description, done }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKey.list() })
    },
  })
}
