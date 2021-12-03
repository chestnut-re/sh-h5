import React, { useState,FC } from 'react'

import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import PreviewTripCard from '@/components/orderDetail/previewTrip'
import './index.less'

/**
 * 订单已完成入口页
 */
const OrderDonePage:FC = (props) => {

  console.log('object :>> ', props);

  return (
    <div className="Order-container">
        <div className="order-main">
            <ContactWcharCard/>
          <div className="preview_card">
              <GoodsCard/>
              <PreferCard/>
          </div>
          <PreviewTripCard />
          <IndentCard/>
          <BackCard/>
        </div>
        <FooterCard/>
    </div>
  )
}

export default OrderDonePage
