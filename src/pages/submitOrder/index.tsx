import React, { useState, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import StepperCard from '@/components/orderDetail/stepperCard'

import PayTypeCard from '@/components/orderDetail/payTypeCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import ProtocolCard from '@/components/orderDetail/protocolCard'
import CalendarCard from '@/components/orderDetail/calendarCard'
import KnownCalendarCard from '@/components/orderDetail/knownCalendarCard'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'

import './index.less'
/**
 * 提交订单页面
 */

const SubmitOrderPage: FC = (props) => {
  const [subdata, setSubdata] = useState({
    adultNum: 0, //成人数量
    childNum: 0, //儿童数量
    goodsId: '', //商品id
    intNum: 0, //积分
    payType: '', //支付方式
  })
  //获取成人数量
  const handlechangeStepper = (info) => {
    console.log('info :>> ', info)
  }
  //处理优惠说明
  const handleDiscountsInfo = () => {
    SHBridge.jump({
      url: generateUrl(`/privilege`),
      newWebView: true,
      title: '优惠说明',
    })
  }
  return (
    <div className="puorder-container">
      <div className="puorder-main">
        <div className="puorder-fluid">
          {/* <ContactWcharCard /> */}
          <div className="puorder-card">
            <GoodsCard />
            {/* <CalendarCard /> */}
            <KnownCalendarCard />
          </div>
          <div className="puorder-stepper">
            <StepperCard handleStepper={handlechangeStepper} handleDiscounts={handleDiscountsInfo} {...props} />
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

export default SubmitOrderPage
