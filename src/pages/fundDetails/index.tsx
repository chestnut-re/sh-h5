import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import triangle from '@/assets/img/successMove/triangle.png'
/**
 * 资金明细
 */
const FundDetailsPage: React.FC = () => {
  const [tabActiveIndex, setTabActiveIndex] = useState(0)
  // useEffect(() => {
  //   return () => {}
  // }, [])

  // useDebouncedEffect(
  //   () => {
  //     setSelectedIndex2(selectedIndex)
  //   },
  //   [selectedIndex],
  //   200
  // )
  const detailList = [
    {
      month: '2021年11月',
      time: '2021-11-13 11:00',
      money: '+1000',
      text: '冻结金额释放',
    },
    {
      month: '2021年11月',
      time: '2021-11-12 11:00',
      money: '+1000',
      text: '激励奖金',
    },
    {
      month: '2021年11月',
      time: '2021-11-12 11:00',
      money: '+1000',
      text: '提现',
    },
    {
      month: '2021年10月',
      time: '2021-10-13 11:00',
      money: '+1000',
      text: '冻结金额释放',
    },
    {
      month: '2021年10月',
      time: '2021-10-12 11:00',
      money: '+1000',
      text: '激励奖金',
    },
    {
      month: '2021年10月',
      time: '2021-10-12 11:00',
      money: '+1000',
      text: '提现',
    },
  ]
  return (
    <div className="FundDetailsPage__root">
      <div className="tab">
        <div className={`${tabActiveIndex === 0 ? 'active' : ''}`} onClick={() => setTabActiveIndex(0)}>
          可用资金
        </div>
        <div className={`${tabActiveIndex === 1 ? 'active' : ''}`} onClick={() => setTabActiveIndex(1)}>
          冻结资金
        </div>
      </div>
      <div className="tab-list">
        <div className={'tab-view' + `${tabActiveIndex === 0 ? 'active' : ''}`}>
          {detailList.map((item, index) => {
            return (
              <div className="item" key={index}>
                <div className="month">
                  {item.month} <img className="img" src={triangle} alt="" />
                </div>
                <div className="counter">
                  <div>{item.time}</div>
                  <div>{item.money}</div>
                </div>
                <div className="text">{item.text}</div>
              </div>
            )
          })}
        </div>
        <div className={'tab-view' + `${tabActiveIndex === 1 ? 'active' : ''}`}>
          {detailList.map((item, index) => {
            return (
              <div className="item" key={index}>
                <div className="month">
                  {item.month} <img className="img" src={triangle} alt="" />
                </div>
                <div className="counter">
                  <div>{item.time}</div>
                  <div>{item.money}</div>
                </div>
                <div className="text">{item.text}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FundDetailsPage
