import React, { useState,FC } from 'react'

import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import BackCard from '@/components/orderDetail/backthatCard'
import ApplyRefundCard from '@/components/applySale/applyRefundCard'
import RefundReasonCard from '@/components/applySale/refundReasonCard'
import RefundPieceCard from '@/components/applySale/refundPieceCard'
import RefundAmountCard from '@/components/applySale/refundAmount'
import CancelTripCard from '@/components/applySale/cancelTripCard'
import RefundInstrucCard from '@/components/applySale/refundInstrucCard'


import './index.less'

/**
 * 申请退款入口
 * type 1 申请退款
 */
const RefundFailure: FC = (props:any) => {

  console.log('object :>> ', props);
  // const {location:{search}} = props;
  // const {type} = qs.parse(search.slice(1))
  return (
    <div className="refund-container">
        <div className="refund-main">
          <div className="refund-card">
              <GoodsCard/>
              <PreferCard/>
          </div>
          <RefundReasonCard/>
          <RefundPieceCard />
          <CancelTripCard />
          <RefundAmountCard />
          <RefundInstrucCard />
          <div className="refund-btn">
            <div className="refund-btnitem">
                申请退款
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default RefundFailure




