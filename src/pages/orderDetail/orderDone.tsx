import React, { useState, FC } from 'react'
import { withRouter } from 'react-router-dom'
import ContactWcharCard from '@/components/orderDetail/contactCard'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'

import CompleteFooter from '@/components/submitBars/completeFooter'
import PreviewTripCard from '@/components/orderDetail/previewTrip'
import './index.less'

/**
 * 订单已完成入口页
 */
const OrderDonePage: FC = (props: any) => {
  console.log('object :>> ', props)
  const BarsConfig = {
    barLeftTitle: '再次购买',
    barRightTitle: '分享给TA',
    onSelect: (type, item) => {
      switch (type) {
        case 'barLeftTitle':
          //再次购买处理
          props.history.push('/submit-order')
          break
        case 'barRightTitle':
          //处理分享逻辑
          console.log('点击了分享按钮 :>> ')
          break
        default:
          break
      }
    },
  }
  return (
    <div className="Order-container">
      <div className="order-main">
        <ContactWcharCard />
        <div className="preview_card">
          <GoodsCard />
          <PreferCard />
        </div>
        <PreviewTripCard />
        <IndentCard />
        <BackCard />
      </div>
      <CompleteFooter {...BarsConfig} />
    </div>
  )
}

export default withRouter(OrderDonePage)
