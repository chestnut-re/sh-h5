import React from 'react'
import { useEffect, useState } from 'react'
import img from '@/assets/img/capital/pay_scuss.png'
import './index.less'
import { SHBridge } from '@/jsbridge'

import { getUrlParams } from '@/utils'

/**
 * 提现成功
 */
const WithdrawSuccessPage: React.FC = () => {
  const [money, setMoney] = useState(0)
  const [dec, setDec] = useState('')

  useEffect(() => {
    setMoney(getUrlParams(window.location.href)['money'])
    setDec(decodeURIComponent(getUrlParams(window.location.href)['dec']))
  }, [])
  const back = () => {
    window.history.back()
  }
  return (
    <div className="WithdrawSuccessPage__root">
      <div className="top_img">
        <img src={img}></img>
      </div>
      <div className="price">
        ¥<span>{money}</span>
      </div>
      <div className="dec">{dec}</div>
      <div className="btn" onClick={back}>
        返回我的
      </div>
    </div>
  )
}

export default WithdrawSuccessPage
