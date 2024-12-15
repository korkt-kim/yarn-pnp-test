import { CSSProperties, useCallback, useState } from 'react'
import css from './Check.module.css'

export interface ICheck {
  id: string
  label: string
  checked?: boolean
  disabled?: boolean
  onChange?: (props: { value: boolean }) => unknown
  style?: CSSProperties
  error?: boolean
}

export const Check = ({
  id,
  label,
  checked,
  disabled,
  onChange,
  style,
  error,
}: ICheck) => {
  const [_checked, _setChecked] = useState(false)

  const rootStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    opacity: disabled ? 0.5 : 1,
    ...style,
  }

  // Dynamic styles based on state
  const checkboxStyle: CSSProperties = {
    width: '20px',
    height: '20px',
    border: `1px solid ${error ? '#ef4444' : 'var(--primary)'}`,
    borderRadius: '4px',
    backgroundColor: (checked ?? _checked) ? 'var(--primary)' : '#ffffff',
    transition: 'all 0.2s ease',
  }

  const checkIconStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) scale(${(checked ?? _checked) ? 1 : 0})`,
    opacity: (checked ?? _checked) ? 1 : 0,
    transition: 'all 0.2s ease',
    color: '#ffffff',
  }

  const labelTextStyle: CSSProperties = {
    color: error ? '#ef4444' : 'inherit',
  }

  const handleChange = useCallback(
    (value: boolean) => {
      if (disabled) return

      _setChecked(value)

      onChange?.({ value })
    },
    [disabled, onChange]
  )

  return (
    <span
      style={rootStyle}
      onClick={() => handleChange(!(checked ?? _checked))}>
      <div className={css['checkbox-container']}>
        <input
          type='checkbox'
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
          checked={checked ?? _checked}
          onChange={e => handleChange(e.target.checked)}
          disabled={disabled}
          id={id}
        />
        <div style={checkboxStyle}>
          <svg
            style={checkIconStyle}
            width='12'
            height='12'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <polyline points='20 6 9 17 4 12' />
          </svg>
        </div>
      </div>
      {label && <span style={labelTextStyle}>{label}</span>}
    </span>
  )
}
