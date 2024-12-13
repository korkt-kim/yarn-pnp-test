import { TodoForm } from '@/shared/ui/form/TodoForm'
import { FormProvider, useForm } from 'react-hook-form'
import { useCreateTodoItem } from '../api/addTodoItem'
import { ITodoItem } from '@/shared/apis/todoApi/scheme'
import css from './CreateTodoItemForm.module.css'
import { Button } from '@/shared/ui/Button'
import { ACTION_AREA_STYLE } from '@/shared/ui/form/formStyle'
import { DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Modal'
import { useModalControl } from '@/shared/hooks/Modal/useModalControl'

export const CreateTodoItemForm = () => {
  const methods = useForm<ITodoItem>()
  const createTodoItem = useCreateTodoItem()
  const { closeDialog } = useModalControl()

  const onSubmit = ({ title }: Pick<ITodoItem, 'title'>) => {
    return createTodoItem.mutateAsync({ title, done: false, description: '' })
  }

  return (
    <DialogContent hideCloseButton>
      <DialogHeader>
        <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>
          NEW NOTE
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
