import { SERVER_URL, AUTHCOOKIE } from '@/utils/endpoints'
import { IS_DEV } from '@/utils/is_dev'
import { IS_SERVER } from '@/utils/is_server'
import axios, { AxiosInstance } from 'axios'
import { getCookies, getCookie } from 'cookies-next'

/**
 * @description Axios instance with interceptors
 */
function ApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
    },
  })

  instance.interceptors.request.use(async (request) => {
    let token
    // checking if the code is running on the server or client to get the cookie from server headers.
    if (IS_SERVER) {
      const { cookies } = await import('next/headers')
      token = cookies().get(AUTHCOOKIE)?.value
      // if the code is running on the client, get the cookie from the browser.
      request.headers.set('Cookie', `${AUTHCOOKIE}=${token}`)
    } else {
      instance.defaults.withCredentials = true
    }

    return request
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // intercept the error on the response.
    },
  )
  return instance
}
export default ApiClient()
