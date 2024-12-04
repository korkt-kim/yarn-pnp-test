import {
  ComponentProps,
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { useOutsideClick } from '../hooks/useOutsideClick'
import css from './Select.module.css'

export interface ISelect extends Omit<ComponentProps<'div'>, 'onChange'> {
  options: { label: string; value: string }[]
  defaultValue?: string
  value?: string
  onChange?: (value?: string) => void
  dropdownStyle?: CSSProperties
}

// @TODO: color 설정
export const Select = ({
  options,
  defaultValue,
  onChange,
  value,
  dropdownStyle,
  ...rest
}: ISelect) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [_value, _setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)

  useOutsideClick(containerRef, () => {
    setOpen(false)
  })

  const onClickSelectItem = useCallback(
    (value?: string) => {
      onChange?.(value)
      _setValue(value)
      setOpen(false)
    },
    [onChange]
  )

  useEffect(() => {
    if (!value) return
    onClickSelectItem(value)
  }, [value, onClickSelectItem])

  return (
    <div ref={containerRef} className={css.select} {...rest}>
      <div
        className={css['selected-item-wrapper']}
        onClick={() => setOpen(prev => !prev)}>
        <span
          className={`${css['selected-item-label']} ${open ? css['select-arrow-active'] : ''}`}>
          <span>{options.find(option => option.value === _value)?.label}</span>
        </span>
      </div>
      <div
        className={`${css['select-items-wrapper']} ${open ? '' : css['select-items-wrapper-hide']}`}
        style={dropdownStyle}>
        {options.map(option => (
          <span
            onClick={() => onClickSelectItem(option.value)}
            key={option.value}
            className={`${css['select-items']} ${_value === option.value ? css['selected'] : ''}`}>
            {option.label}
          </span>
        ))}
      </div>
    </div>
  )
}
