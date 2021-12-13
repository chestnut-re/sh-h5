import React, { useState, FC } from 'react'
import FooterCard from '@/components/orderDetail/footerCard'

import './privilege.less'
/**
 * 提交订单页面
 */

const PrivilegePage: FC = (props) => {
  return (
    <div className="privilege-container">
      <div className="privilege-main">
        <div className="privilege-fluid">
          {[1, 2, 3].map((item) => {
            return (
              <div className="privilege-item" key={item}>
                <div className="privilege-title">线路赠送</div>
                <ul className="privilege-ul">
                  <li className="privilege-li">
                    <div className="li-left">当日出入住酒店接送机两次当日出入住酒店接送机两次当</div>
                    <div className="li-right">
                      <span>¥1298</span>
                      <span>0</span>
                      <span>X2</span>
                    </div>
                  </li>
                  <li className="privilege-li">
                    <div className="li-left">亚特兰蒂斯酒店 早餐 X4</div>
                    <div className="li-right">
                      <span>¥1298</span>
                      <span>0</span>
                      <span>X2</span>
                    </div>
                  </li>
                  <li className="privilege-li">
                    <div className="li-left">分界洲岛 潜水</div>
                    <div className="li-right">
                      <span>¥1298</span>
                      <span>0</span>
                      <span>X2</span>
                    </div>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      <FooterCard />
    </div>
  )
}

export default PrivilegePage
