import React, { useState, FC } from 'react'

import copy from 'copy-to-clipboard'; 
import {Toast} from 'react-vant';

import './index.less'
/**
 * 订单详情卡片 包含订单号下单时间
 */

const IndentCard: FC = (props) => {

  const copyText=(text)=>{
    const iscopy  = copy(text);
    iscopy&&Toast("复制成功")
  }

  return (
    <div className="indent_card">
      <ul className="indent-ul">
        <li className="indent-li">
          <div className="indent-li_l">订单编号</div>
          <div className="indent-li_r">1234 1234 1234 8888</div>
          <div className="indent-li_copy" onClick={()=>{
            copyText("订单编号:1234 1234 1234 8888")
          }}>复制</div>
          
        </li>
        <li className="indent-li">
          <div className="indent-li_l">支付方式</div>
          <div className="indent-li_r">微信</div>
        </li>
        <li className="indent-li">
          <div className="indent-li_l">下单时间</div>
          <div className="indent-li_r">2021/10/19 18:43:20</div>
        </li>
        <li className="indent-li">
          <div className="indent-li_l">支付时间</div>
          <div className="indent-li_r">2021/10/19 18:43:20</div>
        </li>
      </ul>
    </div>
  )
}

export default IndentCard
