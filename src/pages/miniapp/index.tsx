/* eslint-disable @typescript-eslint/ban-ts-comment */
import useQuery from '@/hooks/useQuery'
import useWXInit from '@/hooks/useWXInit'
import { isWeChat } from '@/jsbridge/env'
import './index.less'
import React, { useEffect, useState } from 'react'

/**
 * 跳转页面
 * 测试地址: https://travel.mountainseas.cn/miniapp?action=go&data=%7B%22path%22%3A%22https%3A%2F%2Ftravel.mountainseas.cn%2Fgoods-detail%3Fid%3D1473544142729728000%26goodsPriceId%3D1476429118139760644%26userId%3D1478274355669729280%26isRebate%3D1%26isPurchase%3D1%26isPurchaseAdd%3D1%22%2C%22type%22%3A%22web%22%7D
 */
const MiniAppPage: React.FC = () => {
  const query = useQuery()
  const wxRef = useWXInit()
  const [weChat, setWeChat] = useState(false)
  const pathURL = `/pages/home/index.html?q=${encodeURIComponent(window.location.href)}`
  useEffect(() => {
    isWeChat().then((res) => {
      console.log(res)
      setWeChat(res)
    })
    const data = query.get('data')
    if (data) {
      try {
        const d = JSON.parse(decodeURIComponent(data ?? ''))
        if (d.type === 'web') {
          window.location.replace(d.path)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [])
  return weChat ? (
    <div className="MiniAppPage__root">
      {/* @ts-ignore */}
      <wx-open-launch-weapp
        ref={wxRef}
        username="gh_0a0abf8e5843"
        path={pathURL}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* <script type="text/wxtag-template"> */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
          }}
        ></div>
        {/* </script> */}
        {/* @ts-ignore */}
      </wx-open-launch-weapp>
    </div>
  ) : (
    <div className="MiniAppPage__root">....</div>
  )
}

export default MiniAppPage
