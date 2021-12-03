import { observer } from 'mobx-react-lite'
import type { FC } from 'react';
import React, { useState } from 'react'
import qs from 'querystring'

import './index.less'

/**
 * 退款成功入口
 * type 2 退款成功（refundSuccess）
 */
const RefundSuccess: FC = (props:any) => {

  console.log('object :>> ', props);
  const {location:{search}} = props;
  const {type} = qs.parse(search.slice(1))
  return (
    <div className="container">
      
    </div>
  )
}

export default RefundSuccess
