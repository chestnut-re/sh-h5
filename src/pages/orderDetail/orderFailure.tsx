import React, { useState,FC } from 'react'

import GoodsCard from '@/components/orderDetail/goodsCard'
import IndentCard from '@/components/orderDetail/indentCard'
import FooterCard from '@/components/orderDetail/footerCard'
import './index.less'

/**
 * 订单已失效入口页
 */
const OrderFailurePage:FC = (props) => {

  console.log('object :>> ', props);

  return (
    <div className="Order-container">
       
        <div className="order-main">
          <div className="preview_card">
              <GoodsCard/>
          </div>
          <IndentCard/>
          
        </div>
        <FooterCard/>
    </div>
  )
}

export default OrderFailurePage
