import React, { useState,FC } from 'react'

import { Icon } from 'react-vant';
import './index.less'
/**
 * 申请退款卡片
 */
interface ApplyRefundType{
  changeApply:()=>void
}
const ApplyRefundCard:FC<ApplyRefundType> = ({changeApply}) => {
  return (
    <div className="backthat_card" onClick={changeApply}>
      <div className="backthat-name">申请退款</div>
      <div className="backthat-select">
        <Icon color="#999999" name="arrow" />
      </div>
    </div>
  )
}

export default ApplyRefundCard
