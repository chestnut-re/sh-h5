import React, { useState, FC } from 'react'
import GoodsPreview from '../../components/goodsPreview'
import './index.less'

/**
 * 团小店首页
 */
const GroupShopPage: FC = () => {
  return (
    <div className="Smallshop-container">
      <div className="smallshop-personal">
        <div className="smallshop-avatar">
          <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div className="smallshop-content">
          <div className="smallshop-name">五星团长 赵大白</div>
          <div className="smallshop-title">如有疑问 可联系我</div>
          <div className="smallshop-action">
            <div className="smallshop-abtn">关注</div>
            <div className="smallshop-abtn">分享</div>
          </div>
        </div>
      </div>
      <div className="smallshop-introduce">
        <div className="introduce-content">简介：简介：天空分外晴朗,白云也绽露笑容天空分外晴朗</div>
        <div className="packup-btn">
          <span>展开</span>
          <i className="icon icon-info"></i>
        </div>
      </div>
      <div className="smallshop-main">
        <ul className="smallshop-main-ul">
          {[1, 2, 3, 4, 5, 7, 8].map((item, index) => {
            return (
              <li className="smallshop-main-li" key={item}>
                <GoodsPreview />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default GroupShopPage
