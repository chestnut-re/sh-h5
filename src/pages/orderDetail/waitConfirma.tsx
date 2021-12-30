import React, { useState,FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import CompleteFooter from '@/components/submitBars/completeFooter'
import TravelCodeCard from '@/components/orderDetail/travelCodeCard'
import TripPeopleCard from '@/components/orderDetail/tripPeopleCard'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
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
    payTime,
    ordersTravel
  } = props
  const { search } = useLocation()
  const { orderId } = qs.parse(search.slice(1))
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

  const openTravelList = ()=>{

    SHBridge.jump({
      url: generateUrl(`/order-travel?orderId=${orderId}`),
      newWebView: true,
      replace: false,
      title: '出行确认码',
    })
    console.log('dakia :>> ',);
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
          
          <div className='order-qrbox'>
              {ordersTravel.length&&<TravelCodeCard {...ordersTravel[0]} />}
              <div className='order-more-icon' onClick={openTravelList}>展开</div>
          </div>
          <IndentCard orderNo={orderNo}  payType={payType} orderTime={orderTime} payTime={payTime} />
          <BackCard/>
          {
            ordersTravel.map((item,index)=>{
                return <TripPeopleCard openTravelClick={openTravelList} {...item} key={index}/>
            })
          }
          
        </div>
        <CompleteFooter {...BarsConfig}/>
    </div>
  )
}

export default OrderConfirmaPage
