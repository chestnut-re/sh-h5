import React, { useState,FC } from 'react'

import './index.less'
/**
 * 订单详情卡片 包含订单号下单时间
 */

const IndentCard:FC = (props) => {
  return (
    <div className="indent_card">
      <ul className="indent-ul">
        <li className="indent-li">
          <div className="indent-li_l">订单编号</div>
          <div className="indent-li_r">1234 1234 1234 1234</div>
          <div className="indent-li_copy">复制</div>
        </li>
        <li className="indent-li">
          <div className="indent-li_l">下单时间</div>
          <div className="indent-li_r">2021/10/19 18:43:20</div>
        </li>
      </ul>
    </div>
  )
}

export default IndentCard
