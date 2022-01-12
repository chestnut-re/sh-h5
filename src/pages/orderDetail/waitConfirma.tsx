import React, { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import CompleteFooter from '@/components/submitBars/completeFooter'
import TravelCodeCard from '@/components/orderDetail/travelCodeCard'
import FillTravelCodeCard from '@/components/orderDetail/fillTravelCodeCard'

import TripPeopleCard from '@/components/orderDetail/tripPeopleCard'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './index.less'

/**
 * 订单待确认入口页
 */
const OrderConfirmaPage: FC = (props:any) => {
  const {
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
    ordersTravel,
    goodsId,
    
  } = props
  const { search } = useLocation()
  const { orderId } = qs.parse(search.slice(1))
  //满足生成二维码条件数据
  const [qrCodedata, setQrCodedata] = useState()
  console.log('object :>> ', props)
  const BarsConfig = {
    btnGroups:[{name:"再次购买",key:"ZCGM"},{name:qrCodedata?'':'填写出行人信息',key:"TXCXR"}],
    leftBtnGroups:[{text:"申请售后",key:'SQSH'}],
    onSelect: (type, item) => {
      const {key} = item;
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
        case 'TXCXR':
          FillTraveHandelfun()
          break
        default:
          break
      }
    },
    onPopoverAction:(item)=>{
      SHBridge.jump({
        url: generateUrl(`/apply-sales?orderId=${orderId}&type=0`),
        newWebView: true,
        replace: false,
        title: '申请售后',
      })
    }
  }

  useEffect(() => {
    const conformData = ordersTravel.find((item) => {
      return item.travelerName
    })
    console.log('conformData :>> ', conformData)
    setQrCodedata(conformData)
  }, [ordersTravel])

  //处理展开二维码
  const openTravelList = () => {
    SHBridge.jump({
      url: generateUrl(`/order-travel?orderId=${orderId}`),
      newWebView: true,
      replace: false,
      title: '出行确认码',
    })
    console.log('dakia :>> ')
  }
  //处理出行人列表数据根据不同子订单状态跳转不同订单详情
  const openTravelListItem = (item) => {
    console.log('item :>> ', item);
    const {state} = item;
    if (state!=3) {
      SHBridge.jump({
        url: generateUrl(`/order-detail?orderId=${orderId}`),
        newWebView: true,
        replace: false,
        title: '订单详情',
      })
    }
   
    console.log('dakia :>> ')
  }
  //点击填写出行人逻辑
  const FillTraveHandelfun = () => {
    SHBridge.jump({
      url: generateUrl(`/personal-bind?id=${orderId}`),
      newWebView: false,
      replace: true,
      title: '填写出行人',
    })
    console.log('object :>>填写出行人 ')
  }

  return (
    <div className="Order-container">
      <div className="order-main">
        {/* <ContactWcharCard/> */}
        <div className="preview_card">
          <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
          />
          <PreferCard tokenAmount={tokenAmount} discountAmount={discountAmount} payAmount={payAmount} />
        </div>

        {qrCodedata ? (
          <div className="order-qrbox">
            <TravelCodeCard {...qrCodedata} />
            <div className="order-more-icon" onClick={openTravelList}>
              展开
            </div>
          </div>
        ) : (
          <FillTravelCodeCard FillTraveHandel={FillTraveHandelfun} />
        )}
        <IndentCard orderNo={orderNo} payType={payType} orderTime={orderTime} payTime={payTime} />
        <BackCard />
        {ordersTravel.map((item, index) => {
          return item.travelerName ? <TripPeopleCard openTravelClick={openTravelListItem} {...item} key={index} /> : null
        })}
      </div>
      <CompleteFooter {...BarsConfig} />
    </div>
  )
}

export default OrderConfirmaPage
