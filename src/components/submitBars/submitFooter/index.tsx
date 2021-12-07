import React, { useState,FC } from 'react'

import './index.less'
/**
 * 底部支付，以及其他信息展示卡片
 */

const SubmitBarCard:FC = (props) => {
  
  return (
    <div className="submitbar-action">
      <div className="submitbar-main">
        <div className="submitbar-l">
          <div className="submitbar-total">
            <span>¥</span> 8596
          </div>
          <div className="submitbar-dis">已优惠2198</div>
        </div>
        <div className="submitbar-r">
          <div className="btn-pay">立即付款</div>
        </div>
      </div>
    </div>
  )
}

export default SubmitBarCard
