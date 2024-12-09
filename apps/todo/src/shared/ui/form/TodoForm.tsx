import { useFormContext } from 'react-hook-form'

export interface TodoForm {
  title: string
}

export const TodoForm = () => {
  const { register } = useFormContext()
  return (
    <input
      style={{
        width: '100%',
        height: '38px',
        border: '1px solid var(--primary)',
        borderRadius: '5px',
        padding: '11px 16px',
      }}
      type='text'
      placeholder='Input your note...'
      {...register('title', { required: true })}
    />
  )
}
