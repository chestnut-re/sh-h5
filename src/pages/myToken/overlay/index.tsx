import React, { useEffect, useState } from 'react'
import { Overlay,Image } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import Slogan from '@/assets/img/token/share_slogo@3x.png';
import './index.less'
/**
 * 分享卡片
 */
interface OvType{
  isShow:boolean
}

const OverlayPage: React.FC<OvType> = ({isShow}) => {
 const [showEmbedded, setShowEmbedded] = useState(false)
 useEffect(()=>{
  setShowEmbedded(isShow)
 },[isShow])

  return (
    <Overlay zIndex={999} visible={showEmbedded} onClick={() => setShowEmbedded(false)}>
        <div className="share-wrapper">
        <div className="share-close" onClick={() => setShowEmbedded(false)}></div>
          <div className="share-content">
            <div className="share-content-header">分享线路给好友</div>
            <div className='share-content-slogan'>
              <img src={Slogan} />
            </div>
            <div className="share-content-body">
                <Image width="100%" height="100%" fit="cover"  src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div className='share-content-btn'></div>
          </div>
         
        </div>
      </Overlay>
  )
}

export default OverlayPage
