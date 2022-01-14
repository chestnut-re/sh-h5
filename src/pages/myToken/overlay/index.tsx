import React, { useEffect, useState } from 'react'
import { Overlay,Toast } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './index.less'
/**
 * 分享卡片
 */
interface OvType{
  ishow:boolean
}

const OverlayPage: React.FC<OvType> = ({isshow}) => {
 const [showEmbedded, setShowEmbedded] = useState(false)
 useEffect(()=>{
  setShowEmbedded(isshow)
 },[isshow])

  return (
    <Overlay zIndex={999} visible={showEmbedded} onClick={() => setShowEmbedded(false)}>
        <div className="task-wrapper">
          <div className="task-content">
            <div className="task-content-header">任务说明</div>
            <div className="task-content-body">
              <p>1、分享线路给好友可完权益任务； </p>
              <p>2、需累计分享10次，每次分享间隔时间24小时；</p>
              <p>3、每次分享任务需满足10个不同的好友进行访问； </p>
              <p>4、如有问题，请联系专属业务员进行处理。</p>
            </div>
          </div>
          <div className="task-close" onClick={() => setShowEmbedded(false)}></div>
        </div>
      </Overlay>
  )
}

export default OverlayPage
