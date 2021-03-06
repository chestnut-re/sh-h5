import React, { useState, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
// import { withRouter } from 'react-router-dom'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import ContactCard from '@/components/orderDetail/contactCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import CompleteFooter from '@/components/submitBars/completeFooter'
import PreviewTripCard from '@/components/orderDetail/previewTrip'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './index.less'
interface OrderDoneType {
  promotionalImageUrl?: string
  goodsName?: string
  travelStartDate?: string
  travelEndDate?: string
  adultNum?: string
  childNum?: string
  tokenAmount?: number
  discountAmount?: number
  payAmount?: number
  orderNo?: string
  payType?: number
  orderTime?: string
  payTime?: string
  goodsId?: string
  ordersTravel?: any
  travelId: string
}

/**
 * 订单已完成入口页
 */
const OrderDonePage: FC<OrderDoneType> = ({
  promotionalImageUrl,
  goodsName,
  travelStartDate,
  travelEndDate,
  adultNum,
  childNum,
  tokenAmount,
  discountAmount,
  payAmount,
  orderNo,
  payType,
  orderTime,
  payTime,
  goodsId,
  ordersTravel,
  travelId,
}) => {
  const { search } = useLocation()
  const { orderId } = qs.parse(search.slice(1))

  const BarsConfig = {
    btnGroups: [{ name: '再次购买', key: 'ZCGM' }],
    leftBtnGroups: [],
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
          console.log('点击了分享按钮 :>> ')
          break
        default:
          break
      }
    },
    onPopoverAction: (item) => {
      console.log('item :>> ', item)
    },
  }

  const openTripLinkHandelFun = () => {
    SHBridge.jump({
      url: generateUrl(`/order-travel?id=${orderId}`),
      newWebView: true,
      replace: false,
      title: '出行确认码',
    })
  }
  return (
    <div className="Order-container">
      <div className="order-main">
        <ContactCard type={1} id={orderId} />
        <div className="preview_card">
          <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
            travelId={travelId}
            payAmount={payAmount}
            discountAmount={discountAmount}
            goodsId={goodsId}
            tokenAmount={tokenAmount}
          />
        </div>
        <PreviewTripCard ordersTravel={ordersTravel} openTripLinkHandel={openTripLinkHandelFun} />
        <IndentCard orderNo={orderNo} payType={payType} orderTime={orderTime} payTime={payTime} />
        <BackCard goodsId={goodsId} />
      </div>
      <CompleteFooter {...BarsConfig} />
    </div>
  )
}

export default OrderDonePage
