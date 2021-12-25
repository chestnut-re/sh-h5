import React, { useState, FC } from 'react'

import './index.less'
/**
 * 底部支付，以及其他信息展示卡片
 */

interface FootPropsType {
  submitHandleOrder: () => void
}

const FooterCard: FC<FootPropsType> = (props) => {
  return (
    <div className="order-action">
      <div className="action-main">
        <div className="action-l">
          <div className="action-total">
            <span>¥</span> 8596
          </div>
          <div className="action-dis">已优惠2198</div>
        </div>
        <div className="action-r" onClick={props.submitHandleOrder}>
          <div className="btn-pay">立即付款</div>
        </div>
      </div>
    </div>
  )
}

export default FooterCard
