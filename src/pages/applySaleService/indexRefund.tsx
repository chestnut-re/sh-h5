import React, { useState,useEffect, FC } from 'react'

import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import BackCard from '@/components/orderDetail/backthatCard'
import ApplyRefundCard from '@/components/applySale/applyRefundCard'

import './index.less'

interface IndexRefundType{
  orderInfo:any
}

/**
 * 申请退款入口
 * type 1 申请退款
 */
const IndexRefund: FC<IndexRefundType> = ({orderInfo}) => {
  
  useEffect(() => {
    // const {goodsName} = orderInfo
    console.log('objectpropspropspropsprops :>> ', orderInfo);
  }, [])
  // const {goodsName,travelStartDate,travelEndDate,adultNum,childNum,promotionalImageUrl} = props.orderInfo
  return (
    <div className="refund-container">
      <div className="refund-main">
        <div className="refund-card">
          {/* <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
          /> */}
          <PreferCard />
        </div>
        <ApplyRefundCard />
        <BackCard />
      </div>
    </div>
  )
}

export default IndexRefund
