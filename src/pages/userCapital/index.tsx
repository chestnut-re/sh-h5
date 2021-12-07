import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import tip from '@/assets/img/capital/tip.png'
import jump from '@/assets/img/capital/jump.png'
import tips from '@/assets/img/capital/tips.png'
/**
 * 账户资金
 */
const UserCapitalPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedIndex2, setSelectedIndex2] = useState(0)
  const [selectPage, setSelectPage] = useState(0)
  // useEffect(() => {
  //   window.addEventListener('scroll', onScroll)
  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //   }
  // }, [])

  // useDebouncedEffect(
  //   () => {
  //     console.log('selectedIndex', selectedIndex)

  //     setSelectedIndex2(selectedIndex)
  //   },
  //   [selectedIndex],
  //   200
  // )

  const toMoneyRecord = () => {
    // ('/myTravel/details')
    window.location.href = '/money-record'
  }
  return (
    <div className="UserCapitalPage__root">
      <div className="top">
        <div className="one">
          <div>可用金额</div> <img className="pic" src={tip} alt="" />
        </div>
        <div className="two">
          <span>¥</span>
          <span className="num">&nbsp;23999.01</span>
        </div>
        <div className="three">
          <div>冻结资金 ¥10000</div>
          <img className="pic" src={tips} alt="" />
        </div>
      </div>
      <div className="btn">
        <button className="btn">提现</button>
      </div>
      <button>提现成功</button>
      <div className="footer">
        <div onClick={toMoneyRecord}>提现记录</div>
        <img className="pic" src={jump} alt="" />
      </div>
    </div>
  )
}

export default UserCapitalPage
