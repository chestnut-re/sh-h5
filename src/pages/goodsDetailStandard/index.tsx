import React from 'react'
import './index.less'

/**
 * 商品接待标准
 */
const GoodsDetailStandardPage: React.FC = () => {
  return (
    <div className="GoodsDetailStandardPage__root">
      <div className="bg">
        <div className="bg-inner"></div>
      </div>
      <div className="wrapper">
        <div className="title">报价包含:</div>
        <div className="content">用车：全程空调旅游车（保证每人一个正座，按团人数 安排车辆大小）；</div>
        <div className="content">门票：行程中景点首道大门票；</div>
        <div className="content">用餐：无</div>
        <div className="content">导游：全程导游服务；</div>
        <div className="content">保险：旅行社责任险。</div>
        <div className="title">购物：:</div>
        <div className="content">0购物</div>
        <div className="title">报价不含::</div>
        <div className="content">客人自愿选择参加的额外消费和私人消费、自由活动期 间的餐饭、车费等。</div>
      </div>
    </div>
  )
}

export default GoodsDetailStandardPage
