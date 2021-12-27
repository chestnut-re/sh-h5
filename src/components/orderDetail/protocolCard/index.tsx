import React, { useState,useEffect, FC } from 'react'

import inactiveIcon from '@/assets/img/inactive_Icon@3x.png'
import activeIcon from '@/assets/img/active_Icon@3x.png'

import { Checkbox } from 'react-vant'
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
        <span>《占位协议名称》</span>、<span>《占位协议名称》</span>
      </div>
    </div>
  )
}

export default ProtocolCard
