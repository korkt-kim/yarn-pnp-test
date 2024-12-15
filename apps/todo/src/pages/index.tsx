import Head from 'next/head'
import { FaPlus, FaRegMoon, FaRegSun } from 'react-icons/fa'

import { Button } from '@/shared/ui/Button'
import { BaseLayout } from '@/widgets/layouts/ui/BaseLayout'
import { useGetTodoList } from '@/entities/TodoList/api/todoApi'
import { CreateTodoItemForm } from '@/features/addTodoItem/ui/CreateTodoItemForm'
import { useModal } from '@/shared/hooks/Modal/useModal'
import { Select } from '@/shared/ui/Select'

import { useForm } from 'react-hook-form'
import { useTheme } from '@/shared/hooks/useTheme'
import { Search } from '@/shared/ui/Search'
import { TodoListItem } from '@/shared/ui/TodoListItem'
import { useState } from 'react'

import { useDeleteTodoItem } from '@/features/removeTodoItem/api/removeTodoItem'
import { UpdateTodoItemForm } from '@/features/editTodoItem/ui/UpdateTodoItemForm'
import { useUpdateTodoItem } from '@/features/editTodoItem/api/editTodoItem'

const Page = () => {
  const { register, handleSubmit } = useForm<{ search: string }>()
  const [query, setQuery] = useState<{ search?: string; done?: boolean }>({})

  const { data, isLoading } = useGetTodoList(query)
  const deleteTodoListMutation = useDeleteTodoItem()
  const updateTodoListMutation = useUpdateTodoItem()

  const [theme, toggleTheme] = useTheme()

  const { openDialog, ModalArea } = useModal()

  const onSearch = async ({ search }: { search: string }) => {
    setQuery({ ...query, search })
  }

  if (isLoading) {
    return null
  }

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name='description' content='Todo List FSD' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <form
            style={{ position: 'relative' }}
            onSubmit={handleSubmit(onSearch)}>
            <Search {...register('search')} />
          </form>
          <Select
            onChange={value =>
              setQuery({
                ...query,
                done: value === 'all' ? undefined : value === 'complete',
              })
            }
            defaultValue='all'
            style={{
              border: '1px solid var(--primary)',
              width: '122px',
              height: '38px',
              backgroundColor: '#534CC2',
              color: 'white',
            }}
            dropdownStyle={{
              color: 'black',
              border: '1px solid var(--primary)',
              background: 'var(--white)',
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Complete', value: 'complete' },
              { label: 'Incomplete', value: 'incomplete' },
            ]}
          />
          {
            <Button
              style={{ width: 38, height: 38 }}
              icon={theme === 'light' ? <FaRegSun /> : <FaRegMoon />}
              onClick={() => {
                toggleTheme()
              }}
            />
          }
        </div>

        <Button
          style={{
            position: 'fixed',
            bottom: '50px',
            right: '50px',
            borderRadius: '100%',
          }}
          onClick={() => {
            openDialog(<CreateTodoItemForm />)
          }}
          icon={<FaPlus />}
        />
        {data?.map(item => (
          <TodoListItem
            id={item.id}
            key={item.id}
            label={item.title}
            checked={item.done}
            onChange={({ value }) =>
              updateTodoListMutation.mutateAsync({ ...item, done: value })
            }
            onEdit={() => openDialog(<UpdateTodoItemForm id={item.id} />)}
            onDelete={() => deleteTodoListMutation.mutateAsync({ id: item.id })}
          />
        ))}
      </div>
      {ModalArea}
    </>
  )
}

Page.getLayout = BaseLayout

export default Page
