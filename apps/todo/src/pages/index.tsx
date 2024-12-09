import Head from 'next/head'
import { FaPlus } from 'react-icons/fa'

import { Button } from '@/shared/ui/Button'
import { BaseLayout } from '@/widgets/layouts/ui/BaseLayout'
import { useGetTodoList } from '@/entities/TodoList/api/todoApi'
import { CreateTodoItemForm } from '@/features/addTodoItem/ui/CreateTodoItemForm'
import { useModal } from '@/shared/hooks/Modal/useModal'
import { Dialog } from '@radix-ui/react-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Modal'
import { useEffect, useState } from 'react'

const Page = () => {
  const { data, isLoading } = useGetTodoList()

  const { openDialog, ModalArea } = useModal()

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
        {/* <Dialog open={open}>
          <DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
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
