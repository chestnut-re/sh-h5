import React, { useState,FC } from 'react'
import qs from 'querystring'

import GoodsCard from '@/components/orderDetail/goodsCard'
import RefuIndentCard from '@/components/applySale/refuIndentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import RefundProcessCard from '@/components/applySale/refundProcess'
import RefundFooterCard from '@/components/applySale/refundFooterCard'
import './index.less'
/**
 * 退款失败入口
 * type 3 退款失败（refundFailure）
 */
const RefundFailure: FC = (props:any) => {
  return (
    <div className="refund-container">
    <div className="refund-main">
      <RefundProcessCard/>
      <div className="refund-card">
          <GoodsCard/>
          <RefuIndentCard />
      </div>
      <BackCard/>
     
    </div>
    <RefundFooterCard/>


</div>
  )
}

export default RefundFailure
