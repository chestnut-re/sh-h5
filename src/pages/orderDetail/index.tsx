import React, { useState,useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import OrderDone from './orderDone'
import OrderFailure from './orderFailure'
import OrderConfirma from './waitConfirma'
import OrderPayment from './waitPayment'
import { OrderApi } from '@/service/OrderDetailApi'
import './index.less'
import { Toast } from 'react-vant'

/**
 * 订单详情入口页
 * type 1 已完成（OrderDone）
 * type 2 已失效（OrderFailure）
 * type 3 待确认（OrderConfirma）
 * type 4 待支付（OrderPayment）
 */
const OrderIndexPage: FC = (props: any) => {
  
  const [orders,setOrders] = useState({})

  useEffect(() => {
    OrderApi.orderdetail({
      orderId:"1475748114721476609"
    }).then((result) => {
      const {code,data,msg} = result;

      if (code=="200"&&data) {
          setOrders(data)
      }else{
        Toast(msg)
      }
        console.log('result :>> ', result);
    }).catch((err) => {
        Toast("服务异常")
    });
  }, [])


  console.log('object :>> ', props)
  const {
    location: { search },
  } = props
  const { type } = qs.parse(search.slice(1))
  return (
    <div className="container">
      {type === '1' && <OrderDone {...orders} />}
      {type === '2' && <OrderFailure {...orders} />}
      {type === '3' && <OrderConfirma  {...orders} />}
      {type === '4' && <OrderPayment {...orders} />}
    </div>
  )
}

export default OrderIndexPage
