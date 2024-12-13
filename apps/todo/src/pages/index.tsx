import Head from 'next/head'
import { FaPlus, FaRegMoon, FaRegSun, FaSearch } from 'react-icons/fa'

import { Button } from '@/shared/ui/Button'
import { BaseLayout } from '@/widgets/layouts/ui/BaseLayout'
import { useGetTodoList } from '@/entities/TodoList/api/todoApi'
import { CreateTodoItemForm } from '@/features/addTodoItem/ui/CreateTodoItemForm'
import { useModal } from '@/shared/hooks/Modal/useModal'
import { Select } from '@/shared/ui/Select'

import { useForm } from 'react-hook-form'
import { useTheme } from '@/shared/hooks/useTheme'

const Page = () => {
  const { register, handleSubmit } = useForm<{ search: string }>()
  const { data, isLoading } = useGetTodoList()
  const [theme, toggleTheme] = useTheme()

  const { openDialog, ModalArea } = useModal()

  const onSearch = async ({ search }: { search: string }) => {
    console.log(search)
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
            <input
              style={{
                width: '100%',
                height: '38px',
                border: '1px solid var(--primary)',
                borderRadius: '5px',
                padding: '11px 16px',
              }}
              type='text'
              {...register('search')}
            />
            <Button
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
                aspectRatio: 1,
                background: 'transparent',
              }}
              buttonType='text'
              type='submit'>
              <FaSearch />
            </Button>
          </form>
          <Select
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
        {/* <Select
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
        <Button icon={<FaRegTrashAlt />} type='text' />
        <Button icon={<FaRegSun />} />
        <Button icon={<FaRegMoon />} />
        <Button icon={<FaPlus />} />
        <Button icon={<BsPencil />} type='text' />
        <Button icon={<FaRegSun />}>This is Sun Icon</Button> */}
        {ModalArea}
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
      </div>
    </>
  )
}

Page.getLayout = BaseLayout

export default Page
