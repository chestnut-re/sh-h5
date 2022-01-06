import React, { useState, useEffect, FC } from 'react'

import Clipboard from 'clipboard'
import { Toast } from 'react-vant'

import './index.less'
/**
 * 订单详情卡片 包含订单号下单时间
 */
const PayTypes = {
  // 1 微信小程序支付、2 微信APP支付、3 支付宝APP支付
  1: '微信小程序',
  2: '微信',
  3: '支付宝',
}
interface IndentProps {
  orderNo: string
  payType: number
  orderTime: string
  payTime: string
}

const IndentCard: FC<IndentProps> = (props) => {
  const { orderNo, payType, orderTime, payTime } = props
  useEffect(() => {
    const copy = new Clipboard('.copy-btn')
    copy.on('success', (e) => {
      console.log(e)
      Toast('复制成功')
    })
    copy.on('error', function (e) {
      console.error('Action:', e.action)
    })
    return () => {
      console.log('销毁')
      copy.destroy()
    }
  }, [])

  return (
    <div className="indent-card">
      <ul className="indent-ul">
        <li className="indent-li">
          <div className="indent-li-left">订单编号</div>
          <div className="indent-li-right">{orderNo}</div>
          <div className="copy-btn indent-licopy" data-clipboard-text={orderNo}>
            复制
          </div>
        </li>
        <li className="indent-li">
          <div className="indent-li-left">支付方式</div>
          <div className="indent-li-right">{PayTypes[payType]}</div>
        </li>
        <li className="indent-li">
          <div className="indent-li-left">下单时间</div>
          <div className="indent-li-right">{orderTime}</div>
        </li>
        {payTime&&<li className="indent-li">
          <div className="indent-li-left">支付时间</div>
          <div className="indent-li-right">{payTime}</div>
        </li>}
      </ul>
    </div>
  )
}

export default IndentCard
