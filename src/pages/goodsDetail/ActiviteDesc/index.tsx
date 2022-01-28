import React, { useEffect, useRef, useState } from 'react'
import './index.less'
import triangle from '@/assets/img/successMove/triangle.png'
import { AccountInfoApi } from '@/service/AccountInfo'
import { DatetimePicker, List, Loading, NavBar, Popup, PullRefresh } from 'react-vant'
import arr from '@/assets/img/capital/time_arr.png'
import dayjs from 'dayjs'
import { GoodsDetailService } from '@/service/GoodsDetailService'
import { getUrlParams } from '@/utils'
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
  const [data, setData] = useState<any>({})
  const pageRef = useRef<any>({})

  useEffect(() => {
    const params = getUrlParams(window.location.href)
    pageRef.current.id = params['id']
    pageRef.current.goodsPriceId = params['goodsPriceId']
    GoodsDetailService.get({ id: pageRef.current.id, goodsPriceId: pageRef.current.goodsPriceId }).then((res) => {
      console.log(res.data)
      setData(res.data)
    })
  }, [])

  return (
    <div className="ActiviteDescPage__root">
      {data.isPurchase == 1 ? (
        <div className="card">
          <div className="card_title">限购</div>
          <div className="card_content">
            <div className="card_content_item">
              <div>限购份数 {data.purchaseConfig?.purchaseNum}份</div>
              <div>限购周期 {data.purchaseConfig?.purchaseDay}天</div>
            </div>
          </div>
        </div>
      ) : null}
      {data.isRebate == 1 ? (
        <div className="card">
          <div className="card_title">下单赢乐豆</div>
          <div className="card_content">
            {data.goodsRebate?.isShareRebate == 1 ? (
              <div>
                <div className="card_content_item">
                  <div>分享返利</div>
                  <div>返利比例实付款{data.goodsRebate.scale}%</div>
                </div>
                <div className="card_content_item">
                  <div>任务目标</div>
                  <div>
                    累计分享{data.goodsRebate.shareTotal}次 间隔{data.goodsRebate.shareTime}小时
                  </div>
                </div>
                <div className="card_content_item">
                  <div>完成条件</div>
                  <div>处达独立IP{data.goodsRebate.sharePointIp}</div>
                </div>
              </div>
            ) : null}
            {data.goodsRebate?.isPullRebate == 1 ? (
              <div className="two">
                <div className="card_content_item">
                  <div>行动转化</div>
                  <div>返利比例实付款{data.goodsRebate.scale}%</div>
                </div>
                <div className="card_content_item">
                  <div>任务目标</div>
                  <div>累计分享{data.goodsRebate.shareTotal}次</div>
                </div>
                <div className="card_content_item">
                  <div>完成条件</div>
                  <div>
                    {data.goodsRebate.pullType == 1
                      ? '新用户注册'
                      : data.goodsRebate.pullType == 2
                      ? '订单核销'
                      : '行程结束'}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ActiviteDescPage
