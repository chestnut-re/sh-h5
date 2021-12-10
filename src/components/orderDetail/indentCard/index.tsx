import React, { useState,useEffect, FC } from 'react'

import Clipboard from 'clipboard';
import {Toast} from 'react-vant';

import './index.less'
/**
 * 订单详情卡片 包含订单号下单时间
 */

const IndentCard: FC = (props) => {

  useEffect(()=>{
    const copy = new Clipboard('.copy-btn');
    copy.on('success', e => {
        console.log(e);
        Toast("复制成功")
    });
    copy.on('error', function (e) {
        console.error('Action:', e.action);
    });
    return ()=>{
      console.log('销毁');
      copy.destroy();
    }
  },[])

  return (
    <div className="indent-card">
      <ul className="indent-ul">
        <li className="indent-li">
          <div className="indent-li-left">订单编号</div>
          <div className="indent-li-right">1234 1234 1234 8888</div>
          <div className="copy-btn indent-licopy" data-clipboard-text='1234 1234 11114 8888'>复制</div>
        </li>
        <li className="indent-li">
          <div className="indent-li-left">支付方式</div>
          <div className="indent-li-right">微信</div>
        </li>
        <li className="indent-li">
          <div className="indent-li-left">下单时间</div>
          <div className="indent-li-right">2021/10/19 18:43:20</div>
        </li>
        <li className="indent-li">
          <div className="indent-li-left">支付时间</div>
          <div className="indent-li-right">2021/10/19 18:43:20</div>
        </li>
      </ul>
    </div>
  )
}

export default IndentCard
