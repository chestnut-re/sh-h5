import React, { useState, FC } from 'react'
import 'react-vant/lib/styles/base.less'

import './index.less'
/**
 * 底部支付，以及其他信息展示卡片
 */

const SubmitBarCard: FC = (props) => {
  return (
    <div className="submitIntegral-action">
      <div className="submitIntegral-header rv-hairline--bottom">
        <div className="header-left">
          积分 <span>共346000</span>
        </div>
        <div className="header-right">
          <div className="header-righttot">已抵扣¥34.6</div>
          <div className="header-rightbot">
            已优惠 <span>¥2198</span>
          </div>
        </div>
      </div>
      <div className="submitIntegral-main">
        <div className="submitIntegral-l">
          <div className="submitIntegral-total">
            <span>¥</span> 8596
          </div>
          <div className="submitIntegral-dis">已优惠2198</div>
        </div>
        <div className="submitIntegral-r">
          <div className="btn-pay">立即付款</div>
        </div>
      </div>
    </div>
  )
}

export default SubmitBarCard
