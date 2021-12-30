import React, { useState,FC } from 'react'

import { Icon, Popover } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import './index.less'
/**
 * 积分、优惠卡片
 */
const RMB_CON = 100;

interface PreferType{
  tokenAmount:number;
  discountAmount:number;
  payAmount:number;
}

const PreferCard:FC<PreferType> = (props) => {
  const {tokenAmount,discountAmount,payAmount} = props;
  return (
    <div className="Prefer-content">
      {tokenAmount>0?<div className="info-integral rv-hairline--bottom">
        <div className="integral-title hairline--icon">
          <Icon size="4vw" className="integra-icon" name={integralIcon} />
          <span>积分</span>
        </div>
        <div className="integral-instruction">
          使用¥{tokenAmount}<span>-¥{tokenAmount}</span>
        </div>
      </div>:null}

      <div className="info-discounts">
        <div className="discounts-title hairline--icon">
          优惠<Icon className="discounts-icon" name="question-o" />
        </div>
        <div className="discounts-instruction">
          <div className="instruction-l">
            已优惠<span>¥{discountAmount/RMB_CON}</span>&nbsp;
            共计<span>¥{payAmount/RMB_CON}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferCard
