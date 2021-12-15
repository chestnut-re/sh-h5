import React, { useState, FC } from 'react'

import './index.less'

/**
 * 支付成功入口页
 */
const themeVars = {
  '--rv-tabs-bottom-bar-color': '#3BD1C4',
  '--rv-tab-font-size': '4.26667vw',
}

const PaymentSuccessPage: FC = () => {
  return (
    <div className="Pays-container">
      <div className="pays-header">
        <div className="pays-status">支付成功</div>
        <div className="pays-text">
          <p>为了确保您的旅行顺利进行，赶紧去填写出行人信息吧！</p>
        </div>
        <div className="pays-btns">
          <div className="pays-left pays-com">查看订单</div>
          <div className="pays-right pays-com">填写出行人信息</div>
        </div>
      </div>
      <div className="pays-you-like">
        <div className="you-like-header">猜你喜欢</div>
        <div className="you-like-list">
          <ul className="you-like-ul">
            {[1, 2].map((item) => {
              return (
                <li className="you-like-li" key={item}>
                  <div className="you-like-goods">
                    <div className="goods-h">
                      <img className="goods-img" src="http://picsum.photos/335/415" />
                    </div>
                    <div className="pays-goods-content">
                      <div className="goods-name">三亚5日跟团游「星4晚 连住」</div>
                      <div className="goods-price">¥2988</div>
                      <div className="goods-foot">
                        <div className="foot-left">3456已付款</div>
                        <div className="foot-right">2356</div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
