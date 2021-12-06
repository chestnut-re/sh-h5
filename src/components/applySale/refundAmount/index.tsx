import React, { useState,FC } from 'react'

import { Icon } from 'react-vant';
import './index.less'
/**
 * 退改说明卡片
 */

const RefundAmountCard:FC = (props) => {
  return (
    <div className="refuamount-card">
      <div className="refuamount-name">退款金额</div>
      <div className="refuamount-r">
      ¥<span>3610</span>
      </div>
    </div>
  )
}

export default RefundAmountCard
