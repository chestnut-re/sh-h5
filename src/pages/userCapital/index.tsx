import React, { useEffect, useState } from 'react'
import { Dialog, Toast, ActionSheet, NumberKeyboard } from 'react-vant'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import tip from '@/assets/img/capital/tip.png'
import jump from '@/assets/img/capital/jump.png'
import tips from '@/assets/img/capital/tips.png'
import close from '@/assets/img/successMove/close.png'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
/**
 * 账户资金
 */
const UserCapitalPage: React.FC = () => {
  const [selectText, setSelectText] = useState('提现')
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')
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
  const wthdrawal = (type) => {
    return new Promise((res) => {
      setTimeout(() => {
        setShow(false)
        res(true)
        Toast.success({ message: '确认提现成功' })
        SHBridge.jump({ url: generateUrl(`/success-move?type=${type}`), newWebView: true, title: '提现成功' })
      }, 3000)
    })
  }
  const openDialog = () => {
    setVisible(false)
    setShow(true)
  }
  const giveUp = () => {
    setShow(false)
    setVisible(true)
  }
  const toMoneyRecord = () => {
    SHBridge.jump({ url: generateUrl('/money-record'), newWebView: true, title: '提现记录' })
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
        <button className="btn" onClick={() => setVisible(true)}>
          提现
        </button>
      </div>
      <div className="footer">
        <div onClick={toMoneyRecord}>提现记录</div>
        <img className="pic" src={jump} alt="" />
      </div>
      <Dialog visible={show} showConfirmButton={false}>
        <div className="dialog">
          <div className="text">
            <img className="img" src={close} alt="" onClick={giveUp} />
            <div>提现金额</div>
            <div></div>
          </div>
          <div className="money">¥100.90</div>
          <div>
            <button className="btn" onClick={() => wthdrawal(3)}>
              确认提现
            </button>
          </div>
        </div>
      </Dialog>
      <ActionSheet visible={visible} onClickOverlay={() => setVisible(false)}>
        <div className="number-dialog">
          <div className="box">
            <div>提现金额</div>
            <div className="input-num">
              <div>¥</div>
              <input value={value} type="" />
            </div>
            <div>可提现金额xxxx元</div>
          </div>
          <NumberKeyboard
            theme="custom"
            extraKey="."
            closeButtonText="提现"
            visible={true}
            value={value}
            onChange={setValue}
            onClose={openDialog}
          />
        </div>
      </ActionSheet>
    </div>
  )
}

export default UserCapitalPage
