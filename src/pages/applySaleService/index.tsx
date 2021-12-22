import React, { useState, FC } from 'react'

import qs from 'query-string'

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
const RefundIndexPage: FC = (props: any) => {
  console.log('object :>> ', props)
  const {
    location: { search },
  } = props
  const { type } = qs.parse(search.slice(1))
  return (
    <div className="container">
      {type === '0' && <IndexRefund />}
      {type === '1' && <ApplyRefund />}
      {type === '2' && <RefundProcess />}
    </div>
  )
}

export default RefundIndexPage
