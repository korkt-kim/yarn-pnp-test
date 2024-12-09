import { useGetTodoItem } from '@/entities/TodoList/api/todoApi'
import { TodoForm } from '@/shared/ui/form/TodoForm'
import { FormProvider, useForm } from 'react-hook-form'
import { useUpdateTodoItem } from '../api/editTodoItem'
import { ITodoItem } from '@/shared/apis/todoApi/scheme'
import { useEffect } from 'react'
import css from './UpdateTodoItemForm.module.css'
import { DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Modal'
import { ACTION_AREA_STYLE } from '@/shared/ui/form/formStyle'
import { Button } from '@/shared/ui/Button'
import { useModalControl } from '@/shared/hooks/Modal/useModalControl'

export interface IUpdateTodoItemForm {
  id: string
}

const DEFAULT_VALUE = {
  title: '',
}

export const UpdateTodoItemForm = ({ id }: IUpdateTodoItemForm) => {
  const methods = useForm<ITodoItem>()
  const data = useGetTodoItem(id)
  const updateTodoItem = useUpdateTodoItem()
  const { closeDialog } = useModalControl()

  const onSubmit = ({ title }: Pick<ITodoItem, 'title'>) => {
    if (!data.data) {
      return
    }

    return updateTodoItem.mutateAsync({ ...data.data, id, title })
  }

  useEffect(() => {
    if (data.isLoading) {
      return
    }

    methods.setValue('title', data.data?.title ?? DEFAULT_VALUE.title)
  }, [data])

  return (
    <DialogContent hideCloseButton>
      <DialogHeader>
        <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>
          EDIT NOTE
        </DialogTitle>
      </DialogHeader>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TodoForm />
          <div style={ACTION_AREA_STYLE}>
            <Button
              type='button'
              onClick={closeDialog}
              className={`${css.button} ${css['close-button']}`}>
              CANCEL
            </Button>

            <Button
              type='submit'
              className={`${css.button} ${css['apply-button']}`}>
              APPLY
            </Button>
          </div>
        </form>
      </FormProvider>
    </DialogContent>
  )
}
