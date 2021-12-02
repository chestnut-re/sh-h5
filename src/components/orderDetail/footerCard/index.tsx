import { common } from '@/service'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Icon, Popover } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import './index.less'
/**
 * 底部支付，以及其他信息展示卡片
 */

const FooterCard = observer((props) => {
  const popover = () => {}
  return (
    <div className="order-action">
      <div className="action-main">
        <div className="action-l">
          <div className="action-total">
            <span>¥</span> 8596
          </div>
          <div className="action-dis">已优惠2198</div>
        </div>
        <div className="action-r">
          <div className="btn-pay">立即付款</div>
        </div>
      </div>
    </div>
  )
})

export default FooterCard
