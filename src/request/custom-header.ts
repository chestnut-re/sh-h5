import { SHBridge } from '@/jsbridge'

// 自定义请求头
export const createHeader = () => {
  return {
    Authorization: SHBridge.getToken(),
  }
}
