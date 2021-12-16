import React, { useState, FC } from 'react'

import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import BackCard from '@/components/orderDetail/backthatCard'
import ApplyRefundCard from '@/components/applySale/applyRefundCard'

import './index.less'

/**
 * 申请退款入口
 * type 1 申请退款
 */
const IndexRefund: FC = (props: any) => {
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
        <ApplyRefundCard />
        <BackCard />
      </div>
    </div>
  )
}

export default IndexRefund
