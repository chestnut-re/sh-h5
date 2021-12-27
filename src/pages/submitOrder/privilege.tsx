import React, { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import SubmitIntegralFooterCard from '@/components/submitBars/submitIntegralFooter'
import { OrderApi } from '@/service/OrderDetailApi'

import './privilege.less'
/**
 * 提交订单页面
 */

const PrivilegePage: FC = (props) => {
  const { search } = useLocation()
  const { goodsPriceId, id } = qs.parse(search.slice(1))

  const getDiscountApi = (id, goodsPriceId) => {
    OrderApi.getDiscount({
      id: id, // 商品ID
      goodsPriceId: goodsPriceId, //商品价格ID
    }).then((res) => {
      console.log('res优惠信息 :>> ', res)
    })
  }

  useEffect(() => {
    getDiscountApi(id, goodsPriceId)
  }, [])

  return (
    <div className="privilege-container">
      <div className="privilege-main">
        <div className="privilege-fluid">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <div className="privilege-item" key={item}>
                <div className="privilege-title">线路赠送</div>
                <ul className="privilege-ul">
                  <li className="privilege-li">
                    <div className="li-left">当日出入住酒店接送机两次当日出入住酒店接送机两次当</div>
                    <div className="li-right">
                      <span className="rightli-l">¥1298</span>
                      <span className="rightli-c">0</span>
                      <span className="rightli-r">X2</span>
                    </div>
                  </li>
                  <li className="privilege-li">
                    <div className="li-left">亚特兰蒂斯酒店 早餐 X4</div>
                    <div className="li-right">
                      <span className="rightli-l">¥1298</span>
                      <span className="rightli-c">0</span>
                      <span className="rightli-r">X2</span>
                    </div>
                  </li>
                  <li className="privilege-li">
                    <div className="li-left">分界洲岛 潜水</div>
                    <div className="li-right">
                      <span className="rightli-l">¥1298</span>
                      <span className="rightli-c">0</span>
                      <span className="rightli-r">X2</span>
                    </div>
                  </li>
                </ul>
              </div>
            )
          })}
          <div className="privilege-nomore">没有了</div>
        </div>
      </div>
      <div className="privilege-box">
        <SubmitIntegralFooterCard />
      </div>
    </div>
  )
}

export default PrivilegePage
