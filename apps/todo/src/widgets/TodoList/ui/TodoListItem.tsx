import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { Button } from '../../../shared/ui/Button'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'
import css from './TodoListItem.module.css'
import { Check } from '../../../shared/ui/Check'
import { useModal } from '@/shared/hooks/Modal/useModal'
import { UpdateTodoItemForm } from '@/features/editTodoItem/ui/UpdateTodoItemForm'
import { useDeleteTodoItem } from '@/features/removeTodoItem/api/removeTodoItem'
import { useUpdateTodoItem } from '@/features/editTodoItem/api/editTodoItem'
import { useGetTodoItem } from '@/entities/TodoList/api/todoApi'

export interface ITodoListItem {
  id: string
  label: string
  checked?: boolean
  disabled?: boolean
  onChange?: (props: { id: string; value: boolean }) => unknown
  onDelete?: (props: { id: string }) => unknown
  onEdit?: (props: { id: string }) => unknown
  style?: CSSProperties
  error?: boolean
}

export const TodoListItem = ({
  id,
  label,
  checked,
  disabled,
}: ITodoListItem) => {
  const deleteTodoListMutation = useDeleteTodoItem()
  const updateTodoListMutation = useUpdateTodoItem()
  const data = useGetTodoItem(id)
  const { openDialog, ModalArea } = useModal()
  const [_checked, _setChecked] = useState(checked)

  if (data.isLoading || typeof data.data === 'undefined') {
    return null
  }

  return (
    <>
      <span
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Check
          disabled={disabled}
          id={id}
          label={label}
          onChange={({ value }) => {
            if (!data.data) {
              return
            }

            updateTodoListMutation.mutateAsync({
              ...data.data,
              id,
              done: value,
            })
          }}
        />
        <span>
          <Button
            className={css.button}
            icon={<BsPencil />}
            buttonType='text'
            onClick={() => openDialog(<UpdateTodoItemForm id={id} />)}
          />
          <Button
            className={css.button}
            icon={<FaRegTrashAlt />}
            buttonType='text'
            onClick={() => deleteTodoListMutation.mutateAsync({ id })}
          />
        </span>
      </span>
      {ModalArea}
    </>
  )
}
