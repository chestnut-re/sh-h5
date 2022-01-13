import dayjs from 'dayjs'
import React, { useState,useEffect,FC } from 'react'
import Clipboard from 'clipboard'
import { Toast } from 'react-vant'

import './index.less'
/**
 * 订单详情卡片 包含订单号下单时间
 */

interface RefurefuindentType{
  orderId:string;
  reason:string;
  adultNum:string;
  childNum:string;
}

const RefurefuindentCard:FC<RefurefuindentType> = ({
  orderId,
  reason,
  adultNum,
  childNum,
  amount,
  applyTime
}) => {

  useEffect(() => {
    const copy = new Clipboard('.refuindent-li_copy')
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
    <div className="refuindent-card rv-hairline--top">
      <ul className="refuindent-ul ">
        <li className="refuindent-li">
          <div className="refuindent-li_l">订单编号</div>
          <div className="refuindent-li_r">{orderId}</div>
          <div className="refuindent-li_copy" data-clipboard-text={orderId}>复制</div>
        </li>
        <li className="refuindent-li">
          <div className="refuindent-li_l">退款原因</div>
          <div className="refuindent-li_r">{reason}</div>
        </li>
        <li className="refuindent-li">
          <div className="refuindent-li_l">退款件数</div>
          <div className="refuindent-li_r">成人x{adultNum} 儿童x{childNum}</div>
        </li>
        <li className="refuindent-li">
          <div className="refuindent-li_l">退款金额</div>
          <div className="refuindent-li_r">¥ {amount/100}</div>
        </li>
        <li className="refuindent-li">
          <div className="refuindent-li_l">申请时间</div>
          <div className="refuindent-li_r">{dayjs(applyTime).format("YYYY-MM-DD HH:mm:ss")}</div>
        </li>
      </ul>
    </div>
  )
}

export default RefurefuindentCard
