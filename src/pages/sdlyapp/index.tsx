import React, { useState } from 'react'
import './index.less'

import jian from '@/assets/img/downImgs/jian.png'
import mask from '@/assets/img/downImgs/mask.png'
import dian from '@/assets/img/downImgs/dian.png'

import background from '@/assets/img/sdlydownImgs/background.png'
import Android from '@/assets/img/downImgs/Android.png'
import iPhone from '@/assets/img/downImgs/iPhone.png'
import { isWeChat } from '@/jsbridge/env'
import { useTitle } from 'ahooks'

/**
 * c app 下载落地页
 */
const SDLYCApp: React.FC = () => {
  const [showMask, setShowMask] = useState(false)
  useTitle('申德旅游', { restoreOnUnmount: true })

  /**下载 Android */
  const _downloadAndroid = () => {
    isWeChat().then((res) => {
      if (res) {
        setShowMask(true)
      } else {
        const androidApk = 'https://travel-h5.oss-cn-beijing.aliyuncs.com/apk/sdly-1.apk'
        window.location.href = androidApk
      }
    })
  }

  /**下载 ios */
  const _downloadiOS = () => {
    // isWeChat().then((res) => {
    //   if (res) {
    //     setShowMask(true)
    //   } else {
    //     window.location.href = 'https://testflight.apple.com/join/MkVJEq1O'
    //   }
    // })
  }

  return (
    <div className="bg">
      <div className="background-box">
        <img src={background} alt="" />
        <div className="btn-box">
          <div className="text-content">
            <span>申德旅游</span>
            <span>世界那样美好，待你游历细品</span>
          </div>
          <div className="android-box" onClick={_downloadAndroid}>
            <img className="imgs" src={Android} alt="" />
          </div>
          {/* <div className="iphone-box" onClick={_downloadiOS}>
            <a href="#">
              <img className="imgs" src={iPhone} alt="" />
            </a>
          </div> */}
        </div>

        {/* 下面是遮罩层 */}
        {showMask && (
          <div className="mask-box">
            <img className="mask-img" src={mask} alt="" />
            <img className="jian-img" src={jian} alt="" />
            <div className="dian-back">
              <img src={dian} alt="" />
              <div className="text-box">
                <p>请点击右上角</p>
                <p>选择在浏览器中打开</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SDLYCApp
