'use client'

import { Heading } from '@/ui/components/Heading'
import { useRouter } from '@/ui/router-events'

export default function Home() {
  const { push } = useRouter()

  return (
    <div className='mx-auto w-[350px] pb-20 pt-10 lg:w-[500px]'>
      <Heading level={1} className='text-center'>
        Welcome to your new app
      </Heading>
      <button
        onClick={() => {
          push('/app')
        }}
      >
        Go to Dashboard
      </button>
    </div>
  )
}
