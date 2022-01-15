/* eslint-disable @typescript-eslint/ban-ts-comment */
import { clearAllCookie, printCookie } from '@/utils/cookie'
import React, { useEffect, useRef, useState } from 'react'
import './index.less'
import { Cell } from 'react-vant'
import { WXService } from '@/service/WXService'

/**
 * H5 微信环境测试
 */
const TestWXPage = () => {
  const openMiniApp = useRef<any>(null)

  const ready = (res) => {
    console.log('openMiniApp ready', res)
  }
  const launch = (res) => {
    console.log('openMiniApp launch', res)
  }
  const error = (res) => {
    console.log('openMiniApp error', res)
  }

  useEffect(() => {
    initWX()
    return () => {
      openMiniApp.current.removeEventListener('ready', ready)
      openMiniApp.current.removeEventListener('launch', launch)
      openMiniApp.current.removeEventListener('error', error)
    }
  }, [])

  const initWX = () => {
    window['wx'].ready(function () {
      console.log('wx ready')

      console.log('openMiniApp', openMiniApp)
      openMiniApp.current.addEventListener('ready', ready)
      openMiniApp.current.addEventListener('launch', launch)
      openMiniApp.current.addEventListener('error', error)
    })
    window['wx'].error(function (res) {
      console.log('wx error', res)
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
  }

  return (
    <div className="Mine">
      <div style={{ position: 'relative', height: '100px', width: '100px', background: '#cccccc' }}>
        <div style={{ height: '100px', width: '100px' }}>
          {/* 这里写页面内容 */}
          跳转小程序
        </div>
        {/* @ts-ignore */}
        <wx-open-launch-weapp
          id="launch-btn"
          ref={openMiniApp}
          username="gh_0a0abf8e5843" //小程序原始ID
          path="pages/index/index.html"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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
            ></div>
          </script>
          {/* @ts-ignore */}
        </wx-open-launch-weapp>
      </div>

      <Cell.Group title="数据">
        <Cell title="cookie">{document.cookie}</Cell>
        <Cell title="ua">{navigator.userAgent}</Cell>
        <Cell title="是否是微信环境" onClick={() => {}} />

        <Cell
          title="checkJsApi"
          onClick={() => {
            window['wx'].checkJsApi({
              jsApiList: ['chooseImage', 'scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function (res) {
                console.log(res)
              },
            })
          }}
        />
      </Cell.Group>

      <Cell
        title="chooseImage"
        onClick={() => {
          window['wx'].chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              console.log(res)
            },
          })
        }}
      />
    </div>
  )
}

export default TestWXPage
