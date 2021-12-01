import { common } from '@/service'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import inactiveIcon from '@/assets/img/inactive_Icon@3x.png'
import activeIcon from '@/assets/img/active_Icon@3x.png'

import { Checkbox } from 'react-vant'
import './index.less'
/**
 * 协议确认页面
 */

const ProtocolCard = observer((props) => {
  console.log('Checkbox :>> ', Checkbox)
  return (
    <div className="protocol_card">
      <div className="protocol-l">
        <Checkbox checkedColor="#4DCFC5" iconRender={({ checked: isActive }) => (
            <img alt="" className="img-icon" src={isActive ? activeIcon : inactiveIcon} />
          )} onChange={(val) => console.log(val)} />
      </div>
      <div className="protocol-r rv-ellipsis">
      点击提交订单表示同意
        <span>《占位协议名称》</span>、<span>《占位协议名称》</span>
      </div>
    </div>
  )
})

export default ProtocolCard
