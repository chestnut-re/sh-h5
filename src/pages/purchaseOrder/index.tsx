import { common } from '@/service'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import StepperCard from '@/components/orderDetail/stepperCard'

import PayTypeCard from '@/components/orderDetail/payTypeCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import ProtocolCard from '@/components/orderDetail/protocolCard'
import CalendarCard from '@/components/orderDetail/calendarCard'


import { Checkbox } from 'react-vant'
import './index.less'
/**
 * 提交订单页面
 */

const PuOrderPage = observer((props) => {
  console.log('Checkbox :>> ', Checkbox);
  return (
    <div className="Puorder-container">
      <div className="container-fluid">
        <ContactWcharCard />
        <div className="preview_card">
          <GoodsCard />
          <CalendarCard />
        </div>
        <div className="stepper_card">
          <StepperCard />
        </div>
        <PayTypeCard />
        <BackCard />

        <ProtocolCard/>
      </div>

      <FooterCard/>
    </div>
  )
})

export default PuOrderPage
