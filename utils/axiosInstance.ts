import { SERVER_URL } from '@/utils/endpoints'
import axios, { AxiosInstance, isAxiosError } from 'axios'
import { signOut } from 'next-auth/react'

/**
 * @name ApiClient
 * @description Axios instance with interceptors (use client)
 * @returns AxiosInstance
 */
function ApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true, // send cookies when making requests.
    headers: {
      Accept: 'application/json',
    },
  })

  instance.interceptors.request.use((request) => {
    return request
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      if (isAxiosError(error)) {
        if (error?.response?.status === 401) {
          await signOut() // sign out client if server session is invalid.
        }
      } else {
        console.error(error)
      }
    },
  )
  return instance
}
export default ApiClient()
