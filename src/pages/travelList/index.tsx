import React, { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import TravelCodeCard from '@/components/orderDetail/travelCodeCard'
import { OrderApi } from '@/service/OrderDetailApi'

import './index.less'

/**
 * 出行确认码
 * 二维码显示条件 姓名不存在不显示二维码
 */

const SubmitOrderPage: FC = () => {
  const { search } = useLocation()
  const { orderId } = qs.parse(search.slice(1))
  //出行人数据
  const [ordersTravel, setOrdersTravel] = useState([])
  useEffect(() => {
    OrderApi.suborders({
      orderId: orderId,
    })
      .then((result:any) => {
        const { code, data } = result;
        if (code === '200' && data) {
          setOrdersTravel(data)
        }
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })
  }, [])

  return (
    <div className="travel-container">
      {ordersTravel.map((item, index) => {
        return item.travelerName?(
          <div className="travel-item" key={item.id}>
            <TravelCodeCard {...item} />
          </div>
        ):null
      })}
    </div>
  )
}

export default SubmitOrderPage
