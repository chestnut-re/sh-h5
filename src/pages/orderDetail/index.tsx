import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'

import OrderDone from './orderDone'
import OrderFailure from './orderFailure'
import OrderConfirma from './waitConfirma'
import OrderPayment from './waitPayment'

import './index.less'

/**
 * 订单详情入口页
 * type 1 已完成（OrderDone）
 * type 2 已失效（OrderFailure）
 * type 3 待确认（OrderConfirma）
 * type 4 待支付（OrderPayment）
 */
const OrderDetailPage = observer<any,any>((props) => {

  console.log('object :>> ', props);
  const {match:{params}} = props;
  return (
    <div className="container">
        {params.type === "1" && (<OrderDone/>)}
        {params.type === "2" && (<OrderFailure/>)}
        {params.type === "3" && (<OrderConfirma/>)}
        {params.type === "4" && (<OrderPayment/>)}
    </div>
  )
})

export default OrderDetailPage
