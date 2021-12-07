import React, { useState,FC } from 'react'

import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import CompleteFooter from '@/components/submitBars/completeFooter'
import TravelCodeCard from '@/components/orderDetail/travelCodeCard'
import TripPeopleCard from '@/components/orderDetail/tripPeopleCard'
import './index.less'

/**
 * 订单待确认入口页
 */
const OrderConfirmaPage:FC = (props) => {

  console.log('object :>> ', props);
  const BarsConfig = {
    showLeftLinkBtn:true,
    LeftLinkActions:[{ text: '申请售后' }],
    barLeftTitle:"再次购买",
    barRightTitle:"分享给TA",
    onSelect:(type,item)=>{
        console.log('event :>> ', type,item);
    }
  }
  return (
    <div className="Order-container">
        <div className="order-main">
            <ContactWcharCard/>
          <div className="preview_card">
              <GoodsCard/>
              <PreferCard/>
          </div>
          <TravelCodeCard/>
          <IndentCard/>
          <BackCard/>
          {
            [1,2,3].map(item=>{
                return <TripPeopleCard key={item}/>
            })
          }
          
        </div>
        <CompleteFooter {...BarsConfig}/>
    </div>
  )
}

export default OrderConfirmaPage
