import axios from 'axios'
import { session } from '../store/local-storage'

//const token = $ref(session.value)

const token = import.meta.env.VITE_TOKEN

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code !== undefined && res.code !== 0) {
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        return
      }
      return Promise.reject(new Error(res.message || 'System Error'))
    }

    return response
  },
  (error) => {
    return error.response
  }
)

export default instance
