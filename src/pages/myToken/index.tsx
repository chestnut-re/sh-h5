import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import token from '@/assets/img/token/22token.png'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
/**
 * w我的代币
 */
const MyTokenPage: React.FC = (props) => {
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
  const toWithDraw = () => {
    SHBridge.jump({ url: generateUrl('/with-draw'), newWebView: true, title: '申请提现' })
  }
  return (
    <div className="MyTokenPage__root">
      <div className="header">
        <div>
          <text>340000</text>
          <img className="img" src={token} />
        </div>
        <div onClick={toWithDraw}>提现</div>
      </div>
      <div className="card">
        <div>边玩边省 开心玩 实在省</div>
        <div>购买实在省线路并确认订单，可解锁享礼权益完成权益对应任务，可将所获好礼直接提现或购物抵现</div>
      </div>
    </div>
  )
}

export default MyTokenPage
