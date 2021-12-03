import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Icon } from 'react-vant';
import './index.less'
/**
 * 申请退款卡片
 */

const ApplyRefundCard = observer((props) => {
  return (
    <div className="backthat_card">
      <div className="backthat-name">申请退款</div>
      <div className="backthat-select">
        <Icon color="#999999" name="arrow" />
      </div>
    </div>
  )
})

export default ApplyRefundCard
