import { common } from '@/service'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

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
        <Checkbox iconSize="3.86vw" checkedColor="#4DCFC5" onChange={(val) => console.log(val)}>
          点击提交订单表示同意
        </Checkbox>
      </div>
      <div className="protocol-r rv-ellipsis">
        <span>《占位协议名称》</span>、<span>《占位协议名称》</span>
      </div>
    </div>
  )
})

export default ProtocolCard
