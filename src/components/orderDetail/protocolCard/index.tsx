import React, { useState,useEffect, FC } from 'react'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import inactiveIcon from '@/assets/img/inactive_Icon@3x.png'
import activeIcon from '@/assets/img/active_Icon@3x.png'

import { Checkbox,Toast } from 'react-vant'
import './index.less'
/**
 * 协议确认页面
 */
interface ProtocolType{
  changeProtocolStatus:(val)=>void;
}

const ProtocolCard: FC<ProtocolType> = (props) => {
  
  const [protocolStatus,setProtocolStatus] = useState(false)
  useEffect(() => {
    props.changeProtocolStatus(protocolStatus)
  }, [protocolStatus])

  const openProtocolLink = (type)=>{
    if (type==1) {
      SHBridge.jump({
        url: generateUrl(`/protocol/platform-service`),
        newWebView: true,
        replace: false,
        title: '平台服务协议',
      })
    }else if(type == 2){
      SHBridge.jump({
        url: generateUrl(`/protocol/travel`),
        newWebView: true,
        replace: false,
        title: '预订出行须知',
      })
    }
  }

  return (
    <div className="protocol_card">
      <div className="protocol-l">
        <Checkbox
          checkedColor="#4DCFC5"
          iconRender={({ checked: isActive }) => (
            <img alt="" className="img-icon" src={isActive ? activeIcon : inactiveIcon} />
          )}
          onChange={(val) =>  setProtocolStatus(val)}
        />
      </div>
      <div className="protocol-r">
        点击提交订单表示同意
        <span onClick={()=>{openProtocolLink(1)}}>《平台服务协议》</span>、<span onClick={()=>{openProtocolLink(2)}}>《预订出行须知》</span>
      </div>
    </div>
  )
}

export default ProtocolCard
