import React, { useEffect, useState } from 'react'
import { Dialog, Toast, ActionSheet, NumberKeyboard, NavBar } from 'react-vant'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import tip from '@/assets/img/capital/desc.png'
import jump from '@/assets/img/capital/jump.png'
import tips from '@/assets/img/capital/tips.png'
import close from '@/assets/img/capital/close.png'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { AccountInfoApi } from '@/service/AccountInfo'
import { title } from 'process'
import MyNavBar from '@/components/myNavBar'
import { getPrice } from '@/utils/price'
/**
 * 账户资金
 */
const UserCapitalPage: React.FC = () => {
  const [selectText, setSelectText] = useState('提现')
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')
  const [accountInfo, setAccountInfo] = useState({})
  const [isCanDraw, setIsCanDraw] = useState(false)
  const canDrawMoney = 100000
  useEffect(() => {
    setTimeout(() => {
      if (document.querySelector('body') != null) {
        document.querySelector('body')!.style.overflow = 'hidden'
      }
    }, 1)

    SHBridge.setTitleAction([{ value: '账户资金明细', type: 'text' }], () => {
      // console.log(index);
      toFundDetails()
    })
    AccountInfoApi.accountInfo().then((res: any) => {
      const { code } = res
      if (code == '200') {
        setAccountInfo(res.data)
        if (res.data.available >= canDrawMoney) {
          setIsCanDraw(true)
        } else {
          setIsCanDraw(false)
        }
      }
    })
  }, [])

  const wthdrawal = async () => {
    const res = await AccountInfoApi.cash({ amount: Number(value) * 1000 })
    if (res.code == '200') {
      setShow(false)
      SHBridge.jump({
        url: generateUrl(`/userdrawal?money=${value}&dec=提现成功`),
      })
    } else {
      SHBridge.showToast(res.msg)
    }
  }
  const openDialog = () => {
    if (value == '') return
    if (isNaN(Number(value))) {
      SHBridge.showToast('请输入正确的金额')
      return
    }
    if (Number(value) < Number(getPrice(canDrawMoney, 2))) {
      SHBridge.showToast(`提现金额不能小于${getPrice(canDrawMoney, 2)}`)
      return
    }
    setValue(Number(value).toString())

    if (Number(value) > Number(getPrice(accountInfo['available'], 2))) {
      SHBridge.showToast('提现金额不能超过可用金额')
      return
    }
    setVisible(false)
    setShow(true)
  }
  const giveUp = () => {
    setShow(false)
    setVisible(true)
  }

  const closeActionSheet = () => {
    setVisible(false)
    setValue('')
  }

  const showPop = () => {
    if (!isCanDraw) {
      SHBridge.showToast(`您的可用余额小于${getPrice(canDrawMoney, 2)}，暂不可提现`)
      return
    }
    setVisible(true)
  }

  const toFundDetails = () => {
    SHBridge.jump({ url: generateUrl('/fund-details?isFullScreen=0'), newWebView: true, title: '账户资金明细' })
  }
  const toMoneyRecord = () => {
    SHBridge.jump({ url: generateUrl('/money-record?isFullScreen=0'), newWebView: true, title: '提现记录' })
  }
  const closeSearchPage = () => {
    console.log('object :>> 关闭')
    SHBridge.closePage()
  }
  return (
    <div className="UserCapitalPage__root">
      <MyNavBar
        title="账户资金"
        safeAreaInsetTop={true}
        leftArrow
        onClickLeft={closeSearchPage}
        onClickRight={toFundDetails}
        rightText={'账户资金明细'}
        border={false}
      />
      <div className="top">
        <div className="one">
          <div>可用金额</div>

          <div className="top-img">
            {' '}
            <img className="pic" src={tip} alt="" />
          </div>
        </div>
        <div className="two">
          <span>¥</span>
          <span className="num">&nbsp;{getPrice(accountInfo['available'], 2)}</span>
        </div>
        <div className="three">
          <div>锁定金额 ¥{getPrice(accountInfo['frozen'], 2)}</div>
          {/* <img className="pic" src={tips} alt="" /> */}
        </div>
      </div>
      <div className={isCanDraw ? 'btn' : 'no_btn'} onClick={showPop}>
        提现
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
          <div className="money">¥{value}</div>
          <div className="btn" onClick={() => wthdrawal()}>
            确认提现
          </div>
        </div>
      </Dialog>
      <ActionSheet visible={visible} onClickOverlay={closeActionSheet}>
        <div className="number-dialog">
          <div className="box">
            <div>提现金额</div>
            <div className="input-num">
              <div>¥</div>
              {/* <input value={value} type="" /> */}
              <div className="input">{value}</div>
            </div>
            <div>可提现金额{getPrice(accountInfo['available'], 2)}元</div>
          </div>
          <div className={Number(value) >= Number(getPrice(canDrawMoney)) ? 'numberKey_yes' : 'numberKey_no'}>
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
        </div>
      </ActionSheet>
    </div>
  )
}

export default UserCapitalPage
