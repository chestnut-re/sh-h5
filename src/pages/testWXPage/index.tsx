/* eslint-disable @typescript-eslint/ban-ts-comment */
import { clearAllCookie, printCookie } from '@/utils/cookie'
import React, { useEffect, useState } from 'react'
import './index.less'
import { Button, Cell, Toast } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { isApp, isMini } from '@/jsbridge/env'
import { FileService } from '@/service/FileService'
import { generateUrl } from '@/utils'
import { JSONStringify } from 'lib/tool'
import { WXService } from '@/service/WXService'

/**
 * H5 微信环境测试
 */
const TestWXPage = () => {
  useEffect(() => {
    console.log('load data')
  }, [])

  return (
    <div className="Mine">
      <div style={{ position: 'relative', height: '100px', width: '100px', background: '#cccccc' }}>
        <div style={{ height: '100px', width: '100px' }}>{/* 这里写页面内容 */}</div>
        {/* @ts-ignore */}
        <wx-open-launch-weapp
          username="gh_0a0abf8e5843"
          path="pages/index/index.html"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#ffff00' }}
        >
          <script type="text/wxtag-template">
            {/* 这里唤起小程序的点按区域 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
              }}
            />
          </script>
          {/* @ts-ignore */}
        </wx-open-launch-weapp>
      </div>

      <Cell.Group title="数据">
        <Cell title="cookie">{document.cookie}</Cell>
        <Cell title="ua">{navigator.userAgent}</Cell>

        <Cell title="是否是微信环境" onClick={() => {}} />
        <Cell
          title="初始化 JSSDK"
          onClick={() => {
            window['wx'].ready(function () {
              console.log('wx ready')
            })

            WXService.getSignature(`${window.location.origin}${window.location.pathname}`).then((res) => {
              console.log(res)
              window['wx'].config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appID, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                signature: res.data.signature, // 必填，签名
                jsApiList: ['checkJsApi', 'chooseImage', 'scanQRCode'], // 必填，需要使用的JS接口列表
                openTagList: ['wx-open-launch-weapp'],
              })
            })
          }}
        />
      </Cell.Group>
    </div>
  )
}

export default TestWXPage
