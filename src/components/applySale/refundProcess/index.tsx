import React, { useState,FC } from 'react'

import { Icon } from 'react-vant';
import './index.less'
/**
 * 退改说明卡片
 */

const RefundProcessCard:FC = (props) => {
  return (
    <div className="refuaproce-card">
      <div className="refuaproce-name">
      <Icon name="cart-o" color="#1989fa" />
        <span className="refuaproce-text">退款处理中</span>
      </div>
      <div className="refuaproce-r">
      为您处理中，请稍等
      </div>
    </div>
  )
}

export default RefundProcessCard
