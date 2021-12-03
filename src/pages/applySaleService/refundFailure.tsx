import { observer } from 'mobx-react-lite'
import type { FC } from 'react';
import React, { useState } from 'react'
import qs from 'querystring'

import './index.less'

/**
 * 退款失败入口
 * type 3 退款失败（refundFailure）
 */
const RefundFailure: FC = (props:any) => {

  console.log('object :>> ', props);
  const {location:{search}} = props;
  const {type} = qs.parse(search.slice(1))
  return (
    <div className="container">
        
    </div>
  )
}

export default RefundFailure
