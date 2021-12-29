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
const OrderConfirmaPage:FC = (props:any) => {
  const {
    promotionalImageUrl,
    goodsName,
    travelStartDate,
    travelEndDate,
    adultNum,
    childNum,
    tokenAmount,
    discountAmount,
    payAmount,
    orderNo,
    payType,
    orderTime,
    payTime
  } = props
  console.log('object :>> ', props);
  const BarsConfig = {
    showLeftLinkBtn:false,
    LeftLinkActions:[{ text: '申请售后' }],
    barLeftTitle:"再次购买",
    barRightTitle:"",
    onSelect:(type,item)=>{
        console.log('event :>> ', type,item);
    }
  }
  return (
    <div className="Order-container">
        <div className="order-main">
            {/* <ContactWcharCard/> */}
          <div className="preview_card">
          <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
          />
             <PreferCard tokenAmount={tokenAmount} discountAmount={discountAmount} payAmount={payAmount} />
          </div>
          <TravelCodeCard/>
          <IndentCard orderNo={orderNo}  payType={payType} orderTime={orderTime} payTime={payTime} />
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
