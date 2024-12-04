import Head from 'next/head'
import { BsPencil } from 'react-icons/bs'
import { FaPlus, FaRegMoon, FaRegSun, FaRegTrashAlt } from 'react-icons/fa'

import { Button } from '@/shared/ui/Button'
import { Select } from '@/shared/ui/Select'
import { BaseLayout } from '@/widgets/layouts/ui/BaseLayout'

const Page = () => {
  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name='description' content='Todo List FSD' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
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
        <Button icon={<FaRegTrashAlt />} type='text' />
        <Button icon={<FaRegSun />} />
        <Button icon={<FaRegMoon />} />
        <Button icon={<FaPlus />} />
        <Button icon={<BsPencil />} type='text' />
        <Button icon={<FaRegSun />}>This is Sun Icon</Button>
      </div>
    </>
  )
}

Page.getLayout = BaseLayout

export default Page
