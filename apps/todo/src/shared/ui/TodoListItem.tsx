import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { Button } from './Button'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'
import css from './TodoListItem.module.css'
import { Check } from './Check'

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
  onChange,
  onDelete,
  onEdit,
}: ITodoListItem) => {
  const [_checked, _setChecked] = useState(checked)

  return (
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
        onChange={({ value }) => onChange?.({ id, value })}
      />
      <span>
        <Button
          className={css.button}
          icon={<BsPencil />}
          buttonType='text'
          onClick={() => onEdit?.({ id })}
        />
        <Button
          className={css.button}
          icon={<FaRegTrashAlt />}
          buttonType='text'
          onClick={() => onDelete?.({ id })}
        />
      </span>
    </span>
  )
}
