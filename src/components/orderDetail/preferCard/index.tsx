import React, { useState,FC } from 'react'

import { Icon, Popover } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import './index.less'
/**
 * 积分、优惠卡片
 */

const PreferCard:FC = (props) => {
  
  return (
    <div className="Prefer-content">
      <div className="info-integral rv-hairline--bottom">
        <div className="integral-title hairline--icon">
          <Icon size="4vw" className="integra-icon" name={integralIcon} />
          <span>积分</span>
        </div>
        <div className="integral-instruction">
          使用¥340<span>-¥340</span>
        </div>
      </div>

      <div className="info-discounts">
        <div className="discounts-title hairline--icon">
          优惠<Icon className="discounts-icon" name="question-o" />
        </div>
        <div className="discounts-instruction">
          <div className="instruction-l">
            已优惠<span>¥200</span>
          </div>
          <div className="instruction-r">
            共计¥<span>5798</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferCard
