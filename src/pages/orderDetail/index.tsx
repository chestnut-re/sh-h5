import React, { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import OrderDone from './orderDone'
import OrderFailure from './orderFailure'
import OrderConfirma from './waitConfirma'
import OrderPayment from './waitPayment'
import { OrderApi } from '@/service/OrderDetailApi'
import emptyIcon from '@/assets/img/empty@3x.png'
import { SHBridge } from '@/jsbridge'
import storage from '@/utils/localstorage'
import './index.less'
import { Toast, Empty } from 'react-vant'

/**
 * 订单详情入口页
 * url 必填项
 *    orderId：订单id
 * -----------------------
 * type 4 已完成（OrderDone）
 * type 2 已失效（OrderFailure）
 * type 3 待核销（OrderConfirma）
 * type 1 待支付（OrderPayment）
 * 1-待付款 2-已失效 3-待核销 4-已完成 5-退款中 6-退款成功 7-退款失败
 */
const OrderIndexPage: FC = () => {
  const [orderType, setOrderType] = useState<number | string>()
  //订单详情数据
  const [orders, setOrders] = useState({})
  //出行人数据
  const [ordersTravel, setOrdersTravel] = useState([])
  const { search } = useLocation()
  const { orderId } = qs.parse(search.slice(1))

  useEffect(() => {
    SHBridge.setTitle('订单详情')
    getOrderDetail()
  }, [orderId])

  const getOrderDetail = () => {
    const Toa = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    })
    OrderApi.findOrderdetail({
      orderId: orderId,
    })
      // OrderApi.orderdetail({
      //   orderId: orderId,
      // })
      .then((result: any) => {
        const { code, data } = result

        if (code == '200' && data) {
          const { state, refundAndChangePolicyContent } = data
          setOrderType(state)
          setOrders(data)
          storage.set('_refundcontent', refundAndChangePolicyContent ? refundAndChangePolicyContent : '')
          if (state == '4' || state == '3') {
            OrderApi.suborders({
              orderId: orderId,
            })
              .then((result: any) => {
                const { code, data } = result
                if (code === '200' && data) {
                  setOrdersTravel(data)
                }
              })
              .catch((err) => {
                console.log('err :>> ', err)
              })
          }
        } else {
          setOrderType('-1')
          Toast('订单数据不存在')
        }
      })
      .catch((err) => {
        setOrderType('-1')
        Toast('服务异常')
      })
      .finally(() => {
        Toa.clear()
      })
  }

  return (
    <div className="container">
      {orderType == '4' && <OrderDone {...orders} ordersTravel={ordersTravel} />}
      {orderType == '2' && <OrderFailure {...orders} />}
      {orderType == '3' && <OrderConfirma {...orders} ordersTravel={ordersTravel} />}
      {orderType == '1' && <OrderPayment {...orders} reloadOrder={getOrderDetail} />}
      {orderType == '-1' && <Empty className="custom-image" image={emptyIcon} description="暂无数据" />}
    </div>
  )
}

export default OrderIndexPage
