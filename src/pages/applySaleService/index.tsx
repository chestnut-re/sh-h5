import React, { useState,useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import {RefundApi} from '../../service/RefundApply';
import {OrderApi} from '@/service/OrderDetailApi';
import ApplyRefund from './applyRefund'
import RefundProcess from './refundProcess'
import IndexRefund from './indexRefund'

import './index.less'

/**
 * 售后入口页
 * type 0 申请退款
 * type 1 申请退款信息填写
 * type 2 退款成功 退款进行中 退款失败
 *
 */
const RefundIndexPage: FC = () => {
  const { search } = useLocation()
  const { type,orderId } = qs.parse(search.slice(1))

  const [orderDetail, setOrderDetail] = useState(null)

  useEffect(() => {
    OrderApi.orderdetail({orderId}).then((res) => {
        console.log('res 订单详情:>> ', res);
        const {code,data} = res;
        if (code==="200"&&data) {
          setOrderDetail(data)
        }
    }).catch((err) => {
        console.log('err :>> ', err);
    });
  }, [])


  return (
    <div className="container">
      {type === '0' && <IndexRefund orderInfo={orderDetail} />}
      {type === '1' && <ApplyRefund/>}
      {type === '2' && <RefundProcess/>}
    </div>
  )
}

export default RefundIndexPage
