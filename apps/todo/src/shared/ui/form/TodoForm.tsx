import { ACTION_AREA_STYLE, FORM_STYLE } from './formStyle'

export const TodoForm = () => {
  return (
    <form style={FORM_STYLE}>
      <input
        type='text'
        placeholder='Input your note...'
        style={{ width: '100%' }}
      />
      <div style={ACTION_AREA_STYLE}></div>
    </form>
  )
}
