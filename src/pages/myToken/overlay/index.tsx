import React, { useEffect, useState } from 'react'
import { Overlay, Image } from 'react-vant'
import Slogan from '@/assets/img/token/share_slogo@3x.png'

import './index.less'
/**
 * 分享卡片
 */
interface OvType {
  isShow: boolean
  shareData: any
  onshareChange: (val) => void
  onclose: (val) => void
  model: string
}

const OverlayPage: React.FC<OvType> = ({ isShow, shareData, model = 'app', onclose }) => {
  return (
    <Overlay zIndex={999} visible={isShow}>
      {model == 'app' ? (
        <div className="share-wrapper">
          <div className="share-close" onClick={() => onclose(false)}></div>
          <div className="share-content">
            <div className="share-content-header">分享线路给好友</div>
            <div className="share-content-slogan">
              <img src={Slogan} />
            </div>
            <div className="share-content-body">
              <Image width="100%" height="100%" iconSize={0} fit="cover" src={shareData?.promotionalImageUrl} />
            </div>
          </div>
        </div>
      ) : (
        <div className="share-mini-wrapper">
          <div className="share-mini-content">
            <div className="share-mini-content-body">
              <Image
                width="100%"
                height="auto"
                iconSize={0}
                src="https://travel-h5.oss-cn-beijing.aliyuncs.com/img/customerqr-6486.png"
              />
            </div>
            <div className="share-mini-content-text">
              <p>长按保存图片，扫码下载APP 分享线路，完成任务</p>
            </div>
          </div>
          <div className="share-mini-close" onClick={() => onclose(false)}></div>
        </div>
      )}
    </Overlay>
  )
}

export default OverlayPage
