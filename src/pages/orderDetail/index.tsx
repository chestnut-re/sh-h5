import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

import { CountDown } from 'react-vant';
import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import PayTypeCard from '@/components/orderDetail/payTypeCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import './index.less'

/**
 * 订单详情入口页
 */
const OrderDetailPage = observer((props) => {

  console.log('object :>> ', props);

  return (
    <div className="Order-container">
        <div className="order-count">
        <CountDown 
          time={30 * 60 * 60 * 2000} 
          format="剩 DD 天 HH:mm:ss" 
        />
        </div>
        <div className="order-main">
            <ContactWcharCard/>
          <div className="preview_card">
              <GoodsCard/>
              <PreferCard/>
          </div>
          <PayTypeCard/>
          <IndentCard/>
          <BackCard/>
        </div>
        <FooterCard/>
    </div>
  )
})

export default OrderDetailPage
