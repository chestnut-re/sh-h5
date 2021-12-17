import React, { useState, FC } from 'react'
import clsx from 'clsx'
import { ConfigProvider, Image, Icon } from 'react-vant'
import downIcon from '@/assets/img/market/down_icon@3x.png'
import './index.less'

/**
 * 市场分析-销售额排行
 */
const hotData = [
  { id: 'pgy1vg2p', username: '李迅诚', quota: '99999' },
  { id: '43rm1j24', username: '飞越彩虹', quota: '10000' },
  { id: 'p0nmrvv4', username: 'RonnieZ', quota: '8999' },
  { id: 'zvo9gy2p', username: '小小快门工', quota: '8000' },
  { id: 'kp8fk8wp', username: '饼饼爱吃饼', quota: '7500' },
  { id: 'p77kv8wp', username: '城市睦人', quota: '4500' },
  { id: 'v8kp77wp', username: '张同学', quota: '3500' },
  { id: 'v8wkp77p', username: 'aaronman', quota: '500' },
  { id: 'o07kv8wp', username: '玖八壹981', quota: '4500' },
  { id: 'v1kp77wp', username: '张同学', quota: '3500' },
  { id: 'wewkp77p', username: '木未二十六', quota: '500' },
  { id: 'wewki77p', username: 'fantasyplay', quota: '100' },
]
const SalesRanking: FC = () => {
  return (
    <div className="salesrank-container">
      <ul className="salesrank-ul">
        {hotData.map((item, index) => {
          return (
            <li className={clsx('salesrank-li', index === 3 && 'salesrank-active')} key={index}>
              <div className="salesrank-hot">
                {index + 1 < 4 ? (
                  <div className={`salesrank-hoticon hoticon${index + 1}`}>
                    <span>0{index + 1}</span>
                  </div>
                ) : (
                  <span>{String(index + 1).padStart(2, '0')}</span>
                )}
              </div>
              <div className={clsx('salesrank-right ', index < hotData.length - 1 && 'rv-hairline--bottom')}>
                <div className="salesrank-avatar">
                  <Image
                    round
                    width="100%"
                    height="100%"
                    fit="cover"
                    src={`http://picsum.photos/128?t=${Math.random()}`}
                  />
                </div>
                <div className="salesrank-name">{item.username}</div>
                <div className="salesrank-quota">¥{item.quota}</div>
              </div>
            </li>
          )
        })}
        <li className="salesrank-li">
          <div className="salesrank-more">
            查看更多 <Icon size="3vw" name={downIcon} />
          </div>
        </li>
      </ul>
      <div className="salesrank-spec">
        <div className="salesrank-spec-box">
          <div className="spec-hot">
            <span>04</span>
          </div>
          <div className="spec-avatar">
            <Image round width="100%" height="100%" fit="cover" src={`http://picsum.photos/128?t=${Math.random()}`} />
          </div>
          <div className="spec-name">小小快门工</div>
          <div className="spec-quota">¥8000</div>
        </div>
      </div>
    </div>
  )
}

export default SalesRanking
