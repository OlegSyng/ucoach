'use client'

import { Heading } from '@/ui/components/Heading'
import apiClient from '@/utils/axiosInstance'
import { SERVER_URL } from '@/utils/endpoints'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiClient.get(SERVER_URL + '/users')
      // const response = await axios.get(SERVER_URL + '/users', {
      //   withCredentials: true,
      // })
      return response.data
    },
  })

  console.log(data)

  return (
    <div className='mx-auto w-[350px] pb-20 pt-10 lg:w-[500px]'>
      <Heading level={1} className='text-center'>
        Welcome to your new app
      </Heading>
    </div>
  )
}
