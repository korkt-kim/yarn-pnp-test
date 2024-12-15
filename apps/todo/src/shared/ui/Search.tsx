import { ComponentProps } from 'react'
import css from './Search.module.css'
import { Button } from './Button'
import { FaSearch } from 'react-icons/fa'

export interface ISearch extends Omit<ComponentProps<'input'>, 'type'> {}

export const Search = ({ ...rest }: ISearch) => {
  return (
    <span>
      <input type='text' className={css['search-input']} {...rest} />
      <Button className={css['search-button']} buttonType='text'>
        <FaSearch />
      </Button>
    </span>
  )
}
