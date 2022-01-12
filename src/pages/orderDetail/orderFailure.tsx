import React, { useState, useEffect, FC } from 'react'
import GoodsCard from '@/components/orderDetail/goodsCard'
import IndentCard from '@/components/orderDetail/indentCard'
import CompleteFooter from '@/components/submitBars/completeFooter'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './index.less'

/**
 * 订单已失效入口页
 */
interface OrderFailureType {
  promotionalImageUrl?: string;
  goodsName?: string;
  travelStartDate?: string;
  travelEndDate?: string;
  adultNum?: number;
  childNum?: number;
  orderNo?: string | number;
  payType?: string | number;
  orderTime?: string;
  payTime?: string;
  goodsId?: string;
}

const OrderFailurePage: FC<OrderFailureType> = ({
  promotionalImageUrl,
  goodsName,
  travelStartDate,
  travelEndDate,
  adultNum,
  childNum,
  orderNo,
  payType,
  orderTime,
  payTime,
  goodsId,
}) => {
  const tabBarsList = {
    btnGroups: [{ name: '再次购买', key: 'ZCGM' }],
    leftBtnGroups: [{ text: '修改申请', key: 'XGSQ' }],
    onSelect: (item) => {
      const { key } = item
      switch (key) {
        case 'ZCGM':
          //再次购买处理
          SHBridge.jump({
            url: generateUrl(`/submit-order?id=${goodsId}`),
            newWebView: true,
            replace: false,
            title: '提交订单',
          })
          break
        case 'barRightTitle':
          //处理分享逻辑

          break
        default:
          break
      }
    },
    onPopoverAction: (item) => {
      console.log('item :>> ', item)
    },
  }
  return (
    <div className="Order-container">
      <div className="order-main">
        <div className="preview_card">
          <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
          />
        </div>
        <IndentCard orderNo={orderNo} payType={payType} orderTime={orderTime} payTime={payTime} />
      </div>
      <CompleteFooter {...tabBarsList} />
    </div>
  )
}

export default OrderFailurePage
