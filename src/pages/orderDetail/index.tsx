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
 * type 4 已完成（OrderDone）
 * type 2 已失效（OrderFailure）
 * type 3 待核销（OrderConfirma）
 * type 1 待支付（OrderPayment）
 * 1-待付款 2-已失效 3-待核销 4-已完成 5-退款中 6-退款成功 7-退款失败
 */
const OrderIndexPage: FC = (props: any) => {
  
  const [orders,setOrders] = useState({})
  const {
    location: { search },
  } = props
  const { type,orderId } = qs.parse(search.slice(1))
  useEffect(() => {
    OrderApi.orderdetail({
      orderId:orderId
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
  
  return (
    <div className="container">
      {type === '4' && <OrderDone {...orders} />}
      {type === '2' && <OrderFailure {...orders} />}
      {type === '3' && <OrderConfirma  {...orders} />}
      {type === '1' && <OrderPayment {...orders} />}
    </div>
  )
}

export default OrderIndexPage
