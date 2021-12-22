import React, { useState, FC } from 'react'

import qs from 'query-string'

import './index.less'

/**
 * 退款成功入口
 * type 2 退款成功（refundSuccess）
 */
const RefundSuccess: FC = (props: any) => {
  console.log('object :>> ', props)
  const {
    location: { search },
  } = props
  const { type } = qs.parse(search.slice(1))
  return <div className="container"></div>
}

export default RefundSuccess
