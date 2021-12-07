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
      text: '转入运营资金',
    },
    {
      month: '2021年11月',
      time: '2021-11-12 11:00',
      money: '-1000',
      text: '转出运营资金',
    },
    {
      month: '2021年11月',
      time: '2021-11-12 11:00',
      money: '-1000',
      text: '剩余激励资金释放 方案1名称',
    },
    {
      month: '2021年10月',
      time: '2021-10-13 11:00',
      money: '+1000',
      text: '转入运营资金',
    },
    {
      month: '2021年10月',
      time: '2021-10-12 11:00',
      money: '-1000',
      text: '转出运营资金',
    },
    {
      month: '2021年10月',
      time: '2021-10-12 11:00',
      money: '-1000',
      text: '剩余激励资金释放 方案1名称',
    },
  ]
  const detailList2 = [
    {
      month: '2021年11月',
      time: '2021-11-13 11:00',
      money: '+1000',
      text: '使用激励资金 方案1名称',
    },
    {
      month: '2021年11月',
      time: '2021-11-12 11:00',
      money: '-1000',
      text: '激励奖金释放 方案2名称',
    },
    {
      month: '2021年10月',
      time: '2021-10-13 11:00',
      money: '+1000',
      text: '使用激励资金 方案1名称',
    },
    {
      month: '2021年10月',
      time: '2021-10-12 11:00',
      money: '-1000',
      text: '激励奖金释放 方案2名称',
    },
  ]
  const toDetails = () => {
    // ('/myTravel/details')
    window.location.href = '/myTravel/details'
  }
  return (
    <div className="FundDetailsPage__root">
      <div className="tab">
        <div className={`${tabActiveIndex === 0 ? 'active' : ''}`} onClick={() => setTabActiveIndex(0)}>
          总资金
        </div>
        <div className={`${tabActiveIndex === 1 ? 'active' : ''}`} onClick={() => setTabActiveIndex(1)}>
          使用中
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
          {detailList2.map((item, index) => {
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
