import React, { useState, FC } from 'react'
import clsx from 'clsx'
import './index.less'

/**
 * 市场分析-商品排行
 */
const hotData = [
  { id: 'pgy1vg2p', producname: '分享一波星爸爸圣诞三件套，除了表带质感略差，其他两样都挺不错~', quota: '99999' },
  { id: '43rm1j24', producname: '苏州河，外滩，南京东路。', quota: '10000' },
  { id: 'p0nmvv4', producname: '秋色\n尤溪动车站旁边的一小片林子\nshot on iPhone 12pm', quota: '8999' },
  { id: 'zvo9gy2p', producname: '初冬慵懒的午后 阳光像是直晒进心里 期望也是期待的暖冬', quota: '8000' },
  {
    id: 'kp8fk8wp',
    producname: '【fp L28-70】足不出沪赏秋，曲水园位于青浦，西傍青浦城隍庙，始建于清乾隆十年（1745年',
    quota: '7500',
  },
  { id: 'p77kv8wp', producname: '潘通发布 2022 年度代表色 PANTONE 17-3938 Very Peri（长春花蓝）', quota: '4500' },
  {
    id: 'v8kp77wp',
    producname: '陵水之行📍海南陵水\n·\n📷：SONY A7M3+TAMRON 28-200\n·\n这次只带了腾龙的',
    quota: '3500',
  },
  { id: 'v8wkp77p', producname: '最近入手了已经喜欢很久的Flip3', quota: '500' },
  {
    id: 'o07kv8wp',
    producname: '不知道是因为天太冷还是自己太冷，又很长时间没发片子了，微信还有微博上的很多朋友表示都快忘记我是',
    quota: '4500',
  },
  {
    id: 'v1kp77wp',
    producname: '山村漫步。\n第1张由Mate40RS拍摄\n最后两张由松下TZ80拍摄\n其余由松下GX9+星曜12',
    quota: '3500',
  },
]
const ProductRanking: FC = () => {
  return (
    <div className="productran-container">
      <ul className="productran-ul">
        {hotData.map((item, index) => {
          return (
            <li className="productran-li" key={index}>
              <div className="productran-left">
                <span className={clsx({ hot1: index === 0, hot2: index === 1, hot3: index === 2 })}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className={clsx('productran-right', { 'rv-hairline--bottom': index < hotData.length - 1 })}>
                <div className="productran-name rv-ellipsis">
                  <span>{item.producname}</span>
                </div>
                <div className="productran-price">¥{item.quota}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProductRanking
