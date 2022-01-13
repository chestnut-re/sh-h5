import React, { useEffect, useState } from 'react'
import './index.less'
import triangle from '@/assets/img/successMove/triangle.png'
import { AccountInfoApi } from '@/service/AccountInfo'
import { DatetimePicker, List, Loading, NavBar, Popup, PullRefresh } from 'react-vant'
import arr from '@/assets/img/capital/time_arr.png'
import dayjs from 'dayjs'
/**
 * 资金明细
 */

// class DetailListY{
//   amount:string | undefined;
//   billDate: string | undefined;
//   title:string | undefined;
//   typeName: string | undefined;
// }

const ActiviteDescPage: React.FC = () => {
  //   const [detailListY, setDetailListY] = useState<any[]>([])

  //   useEffect(() => {
  //   }, [])

  return (
    <div className="ActiviteDescPage__root">
      <div className="card">
        <div className="card_title">限购</div>
        <div className="card_content">
          <div className="card_content_item">
            <div>限购份数 3份</div>
            <div>限购周期 3天</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card_title">下单赢乐豆</div>
        <div className="card_content">
          <div className="card_content_item">
            <div>分享返利</div>
            <div>返利比例实付款8%</div>
          </div>
          <div className="card_content_item">
            <div>分享返利</div>
            <div>返利比例实付款8%</div>
          </div>
          <div className="card_content_item">
            <div>分享返利</div>
            <div>返利比例实付款8%</div>
          </div>
          <div className="card_content_item">
            <div>分享返利</div>
            <div>返利比例实付款8%</div>
          </div>
          <div className="card_content_item">
            <div>分享返利</div>
            <div>返利比例实付款8%</div>
          </div>
          <div className="card_content_item">
            <div>分享返利</div>
            <div>返利比例实付款8%</div>
          </div>
          <div className="card_content_item">
            <div>分享返利</div>
            <div>返利比例实付款8%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiviteDescPage
