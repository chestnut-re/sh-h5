import React, { useState, FC } from 'react'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import GoodsCard from '@/components/orderDetail/goodsCard'
import RefuIndentCard from '@/components/applySale/refuIndentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import RefundProcessCard from '@/components/applySale/refundProcess'
import CompleteFooter from '@/components/submitBars/completeFooter'
import './index.less'
/**
 * 退款失败入口
 * type 3 退款失败（refundFailure）
 */

interface IndexRefundType {
  orderInfo: any
}
const RefundFailure: FC<IndexRefundType> = ({ orderInfo }) => {
  const {
    goodsName,
    id,
    goodsId,
    travelStartDate,
    travelEndDate,
    adultNum,
    childNum,
    promotionalImageUrl,
    tokenAmount,
    discountAmount,
    payAmount,
  } = orderInfo
  const BarsConfig = {
    btnGroups:[{name:"咨询",key:"ZX"},{name:"再次购买",key:"ZCGM"},{name:"撤销申请",key:"CXSQ"}],
    leftBtnGroups:[{text:"修改申请",key:'XGSQ'}],
    onSelect: (item) => {
      const {key} = item;
      switch (key) {
        case 'ZX':
          //再次购买处理
          // SHBridge.jump({
          //   url: generateUrl(`/submit-order?id=${goodsId}`),
          //   newWebView: true,
          //   replace: false,
          //   title: '提交订单',
          // })
          break
        case 'ZCGM':
          //再次购买处理
          SHBridge.jump({
            url: generateUrl(`/submit-order?id=${goodsId}`),
            newWebView: true,
            replace: false,
            title: '提交订单',
          })
          break
        case 'CXSQ':
          // FillTraveHandelfun()
          break
        default:
          break
      }
    },
    onPopoverAction:(item)=>{
      console.log('item :>> ', item);
    }
  }
  return (
    <div className="refund-container">
      <div className="refund-main">
        <RefundProcessCard />
        <div className="refund-card">
          <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
          />
          <RefuIndentCard />
        </div>
        <BackCard />
      </div>
      <CompleteFooter {...BarsConfig} />
    </div>
  )
}

export default RefundFailure
