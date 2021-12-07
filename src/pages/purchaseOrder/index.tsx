import React, { useState, FC } from 'react'
import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import StepperCard from '@/components/orderDetail/stepperCard'

import PayTypeCard from '@/components/orderDetail/payTypeCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import ProtocolCard from '@/components/orderDetail/protocolCard'
import CalendarCard from '@/components/orderDetail/calendarCard'
import KnownCalendarCard from '@/components/orderDetail/knownCalendarCard'

import './index.less'
/**
 * 提交订单页面
 */

const PuOrderPage: FC = (props) => {
  return (
    <div className="puorder-container">
      <div className="puorder-main">
        <div className="puorder-fluid">
          <ContactWcharCard />
          <div className="puorder-card">
            <GoodsCard />
            {/* <CalendarCard /> */}
            <KnownCalendarCard/>
          </div>
          <div className="puorder-stepper">
            <StepperCard />
          </div>
          <PayTypeCard />
          <BackCard />

          <ProtocolCard />
        </div>
      </div>
      <FooterCard />
    </div>
  )
}

export default PuOrderPage
