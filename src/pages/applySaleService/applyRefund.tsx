import React, { useState, FC } from 'react'

import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import RefundReasonCard from '@/components/applySale/refundReasonCard'
import RefundPieceCard from '@/components/applySale/refundPieceCard'
import RefundAmountCard from '@/components/applySale/refundAmount'
import CancelTripCard from '@/components/applySale/cancelTripCard'
import RefundInstrucCard from '@/components/applySale/refundInstrucCard'

import { Overlay } from 'react-vant'
import './index.less'

/**
 * 申请退款入口
 * type 1 申请退款
 */
const RefundFailure: FC = (props: any) => {
  const [showEmbedded, setShowEmbedded] = useState(true)

  console.log('object :>> ', props)
  // const {location:{search}} = props;
  // const {type} = qs.parse(search.slice(1))
  return (
    <div className="refund-container">
      <div className="refund-main">
        <div className="refund-card">
          <GoodsCard />
          <PreferCard />
        </div>
        <RefundReasonCard />
        <RefundPieceCard />
        <CancelTripCard />
        <RefundAmountCard />
        <RefundInstrucCard />
        <div className="refund-btn">
          <div className="refund-btnitem">申请退款</div>
        </div>
      </div>
      <Overlay visible={showEmbedded}>
        <div className="refund-wrapper">
          <div className="refund-block">
            <div className="block-text">当前线路已享优惠购买，申请退款将错过本期优惠</div>
            <div className="block-content">
              <div className="block-left btn-item" onClick={() => setShowEmbedded(false)}>
                放弃优惠
              </div>
              <div className="block-right btn-item">再考虑一下</div>
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  )
}

export default RefundFailure
