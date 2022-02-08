import React, { useState, useEffect, FC } from 'react'

import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import BackCard from '@/components/orderDetail/backthatCard'
import ApplyRefundCard from '@/components/applySale/applyRefundCard'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'

import './index.less'

interface IndexRefundType {
  orderInfo: any
}

/**
 * 申请退款入口
 * type 1 申请退款
 */
const IndexRefund: FC<IndexRefundType> = ({ orderInfo }) => {
  const {
    goodsName,
    id,
    travelStartDate,
    travelEndDate,
    adultNum,
    childNum,
    promotionalImageUrl,
    tokenAmount,
    discountAmount,
    payAmount,
    travelId,
    goodsId,
  } = orderInfo
  useEffect(() => {
    SHBridge.setTitle(`申请售后`)
    // const {goodsName} = orderInfo
    console.log('objectpropspropspropsprops :>> ', orderInfo)
  }, [])

  const changeApplyHandle = () => {
    SHBridge.jump({
      url: generateUrl(`/apply-sales?orderId=${id}&type=1`),
      newWebView: false,
      replace: true,
      title: '申请退款',
    })
    console.log('object :>> ')
  }
  //
  return (
    <div className="refund-container">
      <div className="refund-main">
        <div className="refund-card">
          <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
            travelId={travelId}
            payAmount={payAmount}
            goodsId={goodsId}
            tokenAmount={tokenAmount}
            discountAmount={discountAmount}
          />
          {/* <PreferCard
            tokenAmount={tokenAmount}
            adultNum={adultNum}
            goodsId={goodsId}
            childNum={childNum}
            travelId={travelId}
            discountAmount={discountAmount}
            payAmount={payAmount}
          /> */}
        </div>
        <ApplyRefundCard changeApply={changeApplyHandle} />
        <BackCard goodsId={goodsId} />
      </div>
    </div>
  )
}

export default IndexRefund
