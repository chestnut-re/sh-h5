import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import TravelCodeCard from '@/components/orderDetail/travelCodeCard'
import TripPeopleCard from '@/components/orderDetail/tripPeopleCard'
import './index.less'

/**
 * 订单待确认入口页
 */
const OrderConfirmaPage = observer((props) => {

  console.log('object :>> ', props);

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
        <FooterCard/>
    </div>
  )
})

export default OrderConfirmaPage
