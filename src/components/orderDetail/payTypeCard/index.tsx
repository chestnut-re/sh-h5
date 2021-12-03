import React, { useState,FC } from 'react'

import { Icon } from 'react-vant';
import './index.less'
/**
 * 支付方式卡片
 */

const PayTypeCard:FC = (props) => {

  return (
    <div className="Payment-content">
            <div className="payment_card">
                <div className="payment-name">支付方式</div>
                <div className="payment-select">微信<Icon color="#999999" name="arrow" /></div>
          </div>      
    </div>
  )
}

export default PayTypeCard
