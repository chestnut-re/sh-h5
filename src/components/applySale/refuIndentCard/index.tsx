import React, { useState,FC } from 'react'

import './index.less'
/**
 * 订单详情卡片 包含订单号下单时间
 */

const RefurefuindentCard:FC = (props) => {
  return (
    <div className="refuindent-card rv-hairline--top">
      <ul className="refuindent-ul ">
        <li className="refuindent-li">
          <div className="refuindent-li_l">订单编号</div>
          <div className="refuindent-li_r">1234 1234 1234 1234</div>
          <div className="refuindent-li_copy">复制</div>
        </li>
        <li className="refuindent-li">
          <div className="refuindent-li_l">退款原因</div>
          <div className="refuindent-li_r">出发时间不合适</div>
        </li>
        <li className="refuindent-li">
          <div className="refuindent-li_l">退款件数</div>
          <div className="refuindent-li_r">成人x1 儿童x1</div>
        </li>
        <li className="refuindent-li">
          <div className="refuindent-li_l">退款金额</div>
          <div className="refuindent-li_r">¥ 11156</div>
        </li>
        <li className="refuindent-li">
          <div className="refuindent-li_l">申请时间</div>
          <div className="refuindent-li_r">2021/10/19 18:43:20</div>
        </li>
      </ul>
    </div>
  )
}

export default RefurefuindentCard
