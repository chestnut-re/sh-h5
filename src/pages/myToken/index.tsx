import React, { useEffect, useState } from 'react'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import token from '@/assets/img/token/22token.png'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { MyTokenService } from '../../service/MyTokenService'
import './index.less'
/**
 * w我的代币
 */
const MyTokenPage: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState(0)
  const list = [
    {
      walletName: '三亚5日自由行(5钻)·直减300『高星4晚三亚5日自由 连住日自由行(5钻)』',
      type: '成人',
      title1: '可解锁',
      title2: '已领取 800，确认订单后可提现或抵现',
      btn: '分享 领取200',
    },
    {
      walletName: '三亚5日自由行(5钻)·直减300『高星4晚连住』',
      type: '成人',
      title1: '可解锁',
      title2: '已领取 800，确认订单后可提现或抵现',
      num1: '4600',
      num2: '2600',
      btn: '分享 领取200',
    },
    {
      walletName: '三亚5日自由行(5钻)·直减300『高星4晚连住』',
      type: '儿童',
      title1: '确认订单 即解锁',
      title2: '已领取',
      num1: '4600',
      num2: '4600',
      btn: '分享 领取200',
    },
    {
      walletName: '三亚5日自由行(5钻)·直减300『高星4晚连住』',
      type: '儿童',
      title1: '可解锁',
      title2: '已领取',
      num1: '4600',
      num2: '2000',
      btn: '邀好友 领取2000',
    },
  ]
  useEffect(() => {
    MyTokenService.getMyWallet().then((res) => {
      console.log(res)
      setTotalAmount(res.data.totalAmount)
    })
  }, [])

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
          <text>{totalAmount}</text>
          <img className="img" src={token} />
        </div>
        <div onClick={toWithDraw}>提现</div>
      </div>
      <div>
        <div className="card">
          <div>边玩边省 开心玩 实在省</div>
          <div>购买实在省线路并确认订单，可解锁享礼权益完成权益对应任务，可将所获好礼直接提现或购物抵现</div>
        </div>
        <div className="task">
          <div className="task-name">
            <div className="left">权益任务</div>
            <div className="right">确认订单后 解锁享礼权益</div>
          </div>
          {/* {list?.map(item,index) => {
          return (<div>
           {item.title1}
          </div>
        }} */}
        </div>
      </div>
    </div>
  )
}

export default MyTokenPage
