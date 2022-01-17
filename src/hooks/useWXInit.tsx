import { WXService } from '@/service/WXService'
import { useEffect, useRef } from 'react'

export default function useWXInit(): any {
  const openMiniAppRef = useRef<any>(null)

  const ready = (res) => {
    console.log('openMiniAppRef ready', res)
  }
  const launch = (res) => {
    console.log('openMiniAppRef launch', res)
  }
  const error = (res) => {
    console.log('openMiniAppRef error', res)
  }

  useEffect(() => {
    initWX()
    return () => {
      openMiniAppRef.current.removeEventListener('ready', ready)
      openMiniAppRef.current.removeEventListener('launch', launch)
      openMiniAppRef.current.removeEventListener('error', error)
    }
  }, [])

  const initWX = () => {
    window['wx'].ready(function () {
      console.log('wx ready')
      openMiniAppRef.current.addEventListener('ready', ready)
      openMiniAppRef.current.addEventListener('launch', launch)
      openMiniAppRef.current.addEventListener('error', error)
    })
    window['wx'].error(function (res) {
      console.log('wx error', res)
    })

    WXService.getSignature(`${window.location.href}`).then((res) => {
      console.log(res)
      window['wx'].config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appID, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['checkJsApi'], // 必填，需要使用的JS接口列表
        openTagList: ['wx-open-launch-weapp'],
      })
    })
  }
  return openMiniAppRef
}
