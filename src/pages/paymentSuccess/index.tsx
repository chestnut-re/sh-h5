import React, { useState, useEffect, FC } from 'react'
import GoodsPreview from '../../components/goodsPreview'
import qs from 'query-string'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { useLocation } from 'react-router-dom'
import { OrderApi } from '@/service/OrderDetailApi'

import './index.less'

/**
 * 支付成功入口页
 */

const PaymentSuccessPage: FC = () => {
  const { search } = useLocation()
  const { orderId } = qs.parse(search.slice(1))
  const judgePayConfirmStatus = (orderId) => {
    OrderApi.payConfirm({
      orderId,
    })
      .then((res: any) => {
        const { code, data } = res

        if (code == '200' && !data) {
          openOrderDetails()
        }
        console.log('res :>> ', res)
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })
  }

  useEffect(() => {
    judgePayConfirmStatus(orderId)
  }, [])

  const openOrderDetails = ()=>{
    SHBridge.jump({
      url: generateUrl(`/order-detail?orderId=${orderId}`),
      newWebView: false,
      replace: true,
      title: '订单详情',
    })
  }

    //跳转出行人
  const openPersonalDetails = () => {
    SHBridge.jump({
      url: generateUrl(`/personal-bind?id=${orderId}`),
      newWebView: false,
      replace: true,
      title: '填写出行人信息',
    })
  }

  return (
    <div className="Pays-container">
      <div className="pays-header">
        <div className="pays-status">支付成功</div>
        <div className="pays-text">
          <p>为了确保您的旅行顺利进行，赶紧去填写出行人信息吧！</p>
        </div>
        <div className="pays-btns">
          <div className="pays-left pays-com" onClick={openOrderDetails}>查看订单</div>
          <div className="pays-right pays-com" onClick={openPersonalDetails}>
            填写出行人信息
          </div>
        </div>
      </div>
      {/* <div className="pays-you-like">
        <div className="you-like-header">猜你喜欢</div>
        <div className="you-like-list">
          <ul className="you-like-ul">
            {[1, 2].map((item) => {
              return (
                <li className="you-like-li" key={item}>
                  <GoodsPreview />
                </li>
              )
            })}
          </ul>
        </div>
      </div> */}
    </div>
  )
}

export default PaymentSuccessPage
