import React, { useState, useEffect, FC } from 'react'

import { Icon } from 'react-vant'
import './index.less'
/**
 * 出行人卡片多人折叠
 * 包含姓名 数量
 */
interface PreviewTripType {
  ordersTravel: any[];
  openTripLinkHandel:()=>void;
}

const PreviewtripCard: FC<PreviewTripType> = (props) => {
  const { ordersTravel } = props

  const [orderTravelList, setOrderTravelList] = useState<any[]>([])
  const [orderTravelText, setOrderTravelText] = useState<string>('')
  useEffect(() => {
    const TravelHas = ordersTravel.filter((item) => {
      return item.travelerName
    })
    const TravelText = TravelHas.reduce((sum, w) => {
      return `${w.travelerName}、${sum}`
    }, '')
    setOrderTravelList(TravelHas)
    setOrderTravelText(TravelText)
  }, [ordersTravel])

  const openTripLink = ()=>{
    props.openTripLinkHandel()
  }
  return (
    <>
    {orderTravelList.length>0?(<div className="previewtrip-content" onClick={openTripLink}>
      <div className="previewtrip-l">出行人</div>
      <div className="previewtrip-c rv-ellipsis">{orderTravelText}</div>
      <div className="previewtrip-r">
        {orderTravelList.length>2?<span>等{orderTravelList.length}人</span>:null}
        <Icon color="#999999" name="arrow" />
      </div>
    </div>):null}
    </>
  )
}

export default PreviewtripCard
