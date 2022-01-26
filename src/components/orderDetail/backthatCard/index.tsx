import React, { useState, FC } from 'react'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { Icon } from 'react-vant'
import './index.less'
/**
 * 退改说明卡片
 */

const BackThatCard: FC = ({ goodsId }) => {
  const backtChangeInsHandel = () => {
    SHBridge.jump({ url: generateUrl('/order-refundins?goodsId=' + goodsId), newWebView: true })
  }

  return (
    <div className="backthat_card" onClick={backtChangeInsHandel}>
      <div className="backthat-name">退改说明</div>
      <div className="backthat-select">
        <Icon color="#999999" name="arrow" />
      </div>
    </div>
  )
}

export default BackThatCard
