import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import token from '@/assets/img/token/22token.png'
/**
 * 收支明细
 */
const DetailedPage: React.FC = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedIndex2, setSelectedIndex2] = useState(0)
  const [selectPage, setSelectPage] = useState(0)
  // useEffect(() => {
  //   console.log(props.match.params.type)
  //   window.addEventListener('scroll', onScroll)
  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //   }
  // }, [])

  // useDebouncedEffect(
  //   () => {
  //    setSelectedIndex2(selectedIndex)
  //   },
  //   [selectedIndex],
  //   200
  // )
  const detailList = [
    {
      state: 1,
      time: '2021/10/22 13:34:26',
      text: '提现 失败',
      money: '4600',
    },
    {
      state: 1,
      time: '2021/10/22 13:34:26',
      text: '提现 成功',
      money: '-4600',
    },
    {
      state: 0,
      time: '2021/10/22 13:34:26',
      text: '提现 审核中',
      money: '4600',
    },
    {
      state: 1,
      time: '2021/10/22 13:34:26',
      text: '三亚5日自由行(5钻)·直减300『高星4晚 连住』',
      money: '4600',
      title: '退款 失败',
    },
    {
      state: 0,
      time: '2021/10/22 13:34:26',
      text: '三亚5日自由行(5钻)·直减300『高星4晚 连住』',
      money: '4600',
      title: '退款 处理中',
    },
    {
      state: 1,
      time: '2021/10/22 13:34:26',
      text: '三亚5日自由行(5钻)·直减300『高星4晚 连住』',
      money: '+10000',
      title: '邀请好友',
    },
    {
      state: 1,
      time: '2021/10/22 13:34:26',
      text: '三亚5日自由行(5钻)·直减300『高星4晚 连住』',
      money: '+4600',
      title: '退款 成功',
    },
    {
      state: 1,
      time: '2021/10/22 13:34:26',
      text: '三亚5日自由行(5钻)·直减300『高星4晚 连住』',
      money: '+10000',
      title: '邀请好友',
    },
    {
      state: 0,
      time: '2021/10/22 13:34:26',
      text: '13427866896 订单待确认',
      money: '10000',
      title: '邀请好友',
    },
    {
      state: 1,
      time: '2021/10/22 13:34:26',
      text: '13427866896 订单已确认',
      money: '+10000',
      title: '邀请好友',
    },
  ]
  return (
    <div className="DetailedPage__root">
      <div className="list">
        {detailList.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className="counter">
                <div className="text">{item.text}</div>
                <div className="money" style={item.state === 0 ? { color: '#999' } : {}}>
                  {item.money}
                </div>
              </div>
              <div className="under">
                <div className="time">{item.time}</div>
                {item.title ? (
                  <div className="title" style={item.title == '邀请好友' ? {} : { color: '#FD7D81' }}>
                    {item.title}
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
        <div className="footer">没有了</div>
      </div>
    </div>
  )
}

export default DetailedPage
