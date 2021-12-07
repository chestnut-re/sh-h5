import React, { useState,FC } from 'react'

import { Icon, Popover } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import './index.less'
/**
 * 底部支付，以及其他信息展示卡片
 */

const FooterCard:FC = (props) => {
  const [reftype] = useState<number>(1)
  
  return (
    <div className="refund-footer">
      <div className="refund-footmain">
        <div className="refund-l">
          <div className="refund-dis refund-foot-btn">{reftype==1?'再次购买':"撤消申请"}</div>
        </div>
        <div className="refund-r">
          <div className="btn-pay refund-foot-btn">{reftype==1?'分享给TA':"修改申请"}</div>
        </div>
      </div>
      
    </div>
  )
}

export default FooterCard
