import React, { useState,useEffect,FC } from 'react'

import { CountDown } from 'react-vant';
import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import PayTypeCard from '@/components/orderDetail/payTypeCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import { OrderApi } from '@/service/OrderDetailApi'
import './index.less'

/**
 * 订单待付款入口页
 */
const OrderPaymentPage:FC = (props:any) => {
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
    id,
  } = props
  console.log('objectidididid :>> ', props);
  useEffect(()=>{
      setTimeout(() => {
        HandleOrdersubmit()
      }, 3000);
  },[])


  const changePayType = ()=>{
      
  }
  const HandleOrdersubmit = ()=>{
    OrderApi.toPay({
      orderId:"1476376404168785921"
    }).then((res)=>{
      console.log('res :>> ', res);
    }).catch((err)=>{
      console.log('res :>> ', err);
    })
    console.log('object :>> ', );
  }
  return (
    <div className="Order-container">
        <div className="order-count">
        <CountDown 
          time={30 * 60 * 60 * 2000} 
          format="剩 DD 天 HH:mm:ss" 
        />
        </div>
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
          {/* <PayTypeCard changePayType={changePayType}/> */}
          <IndentCard orderNo={orderNo}  payType={payType} orderTime={orderTime} payTime={payTime} />
          <BackCard/>
         
        </div>
        <FooterCard priceSetData={{priceNum:payAmount,preferPrice:discountAmount}} submitHandleOrder={HandleOrdersubmit}  />
    </div>
  )
}

export default OrderPaymentPage
