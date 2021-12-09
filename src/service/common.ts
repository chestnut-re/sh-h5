import axios from '@/request'
import { AxiosResponse } from 'axios'

export const getUser = (): Promise<AxiosResponse> => {
  return axios.get('/api/user')
}
