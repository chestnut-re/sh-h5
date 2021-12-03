import React, { useState,FC } from 'react'

import qs from 'querystring'
import ApplyRefund from './applyRefund'
import RefundSuccess from './refundSuccess'
import RefundFailure from './refundFailure'

import './index.less'

/**
 * 售后入口页
 * type 1 申请退款（ApplyRefund）
 * type 2 退款成功（refundSuccess）
 * type 3 退款失败（refundFailure）
 */
const RefundIndexPage: FC = (props:any) => {

  console.log('object :>> ', props);
  const {location:{search}} = props;
  const {type} = qs.parse(search.slice(1))
  return (
    <div className="container">
        {type === "1" && (<ApplyRefund/>)}
        {/* {type === "2" && (<RefundSuccess/>)}
        {type === "3" && (<RefundFailure/>)} */}
    </div>
  )
}

export default RefundIndexPage
