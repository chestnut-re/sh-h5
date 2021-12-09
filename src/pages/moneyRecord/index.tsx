import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import pic from '@/assets/img/successMove/success.png'
/**
 * 提现记录
 */
const MoneyRecordPage: React.FC = () => {
  const [selectPage, setSelectPage] = useState(0)
  // useEffect(() => {
  //   return () => {
  //     }
  // }, [])

  // useDebouncedEffect(
  //   () => {
  //     setSelectedIndex2(selectedIndex)
  //   },
  //   [selectedIndex],
  //   200
  // )

  const list = [
    {
      state: '审核中',
      time: '2021-11-13 11:00',
      money: '提现 1000',
    },
    {
      state: '已通过',
      time: '2021-11-13 11:00',
      money: '提现 1000',
    },
    {
      state: '已通过',
      time: '2021-11-13 11:00',
      money: '提现 1000',
    },
    {
      state: '已通过',
      time: '2021-11-13 11:00',
      money: '提现 1000',
    },
    {
      state: '已通过',
      time: '2021-11-13 11:00',
      money: '提现 1000',
    },
    {
      state: '未通过',
      time: '2021-11-13 11:00',
      money: '提现 1000',
    },
  ]
  return (
    <div className="MoneyRecordPage__root">
      <div className="list">
        {list.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className={`${item.state == '已通过' ? 'green' : 'red'}`}>{item.state}</div>
              <div>{item.time}</div>
              <div>{item.money}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MoneyRecordPage
