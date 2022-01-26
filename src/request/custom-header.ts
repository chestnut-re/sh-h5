import { SHBridge } from '@/jsbridge'

// 自定义请求头
export const createHeader = () => {
  const ret = {}
  if (SHBridge.getToken()) {
    ret['Authorization'] = SHBridge.getToken()
  }

  if (SHBridge.getCId()) {
    ret['cId'] = SHBridge.getCId()
  }

  return ret
}
