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
}

const OverlayPage: React.FC<OvType> = ({ isShow, shareData, onshareChange, onclose }) => {
  //  const [showEmbedded, setShowEmbedded] = useState(isShow);

  // //  const {} = shareData;
  //  useEffect(()=>{
  //   setShowEmbedded(isShow)
  //  },[isShow])
  setTimeout(() => {
    onshareChange({ ...shareData })
  }, 800)

  return (
    <Overlay zIndex={999} visible={isShow}>
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
          {/* <div className="share-content-btn">
            <div
              className="share-btn-item"
              onClick={() => {
                onshareChange({ ...shareData })
              }}
            >
              立即分享
            </div>
          </div> */}
        </div>
      </div>
    </Overlay>
  )
}

export default OverlayPage
