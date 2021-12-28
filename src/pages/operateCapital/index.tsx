import React, { useEffect, useState } from 'react'
import { Dialog, Toast, ActionSheet, NumberKeyboard, NavBar } from 'react-vant'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import close from '@/assets/img/successMove/close.png'
import { url } from 'inspector'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { AccountInfoApi } from '@/service/AccountInfo'
import MyNavBar from '@/components/myNavBar'

/**
 * 运营资金
 */
const OperateCapitalPage: React.FC = () => {
  const [selectText, setSelectText] = useState('')
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')
  const [accountInfo, setAccountInfo] = useState({})
  useEffect(() => {
    SHBridge.setTitleAction([{ value: '账户资金明细', type: 'text' }], () => {
      toFundDetails()
    })
    AccountInfoApi.accountInfo().then((res: any) => {
      const { code } = res
      if (code == '200') {
        setAccountInfo(res.data)
      }
    })
  }, [])

  const selectName = (text) => {
    setVisible(true)
    text == 'in' ? setSelectText('转入') : setSelectText('转出')
  }
  const wthdrawal = (type) => {
    return new Promise((res) => {
      setTimeout(() => {
        setShow(false)
        res(true)
        Toast.success({ message: '确认' + selectText + '成功' })
        // window.location.href = `/success-move?type=${type}`
        SHBridge.jump({ url: generateUrl(`/success-move?type=${type}`), newWebView: true, title: `${selectText}成功` })
      }, 3000)
    })
  }

  const toFundDetails = () => {
    SHBridge.jump({ url: generateUrl('/operate-details') })
  }
  const openDialog = () => {
    setVisible(false)
    setShow(true)
  }
  const giveUp = () => {
    setShow(false)
    setVisible(true)
  }
  const closeSearchPage = () => {
    console.log('object :>> 关闭')
    SHBridge.closePage()
  }
  return (
    <div className="OperateCapitalPage__root">
      <MyNavBar
        title="运营资金"
        safeAreaInsetTop={true}
        leftArrow
        onClickLeft={closeSearchPage}
        onClickRight={toFundDetails}
        rightText={'运营资金明细'}
        border={false}
      />
      <div className="top">
        <div className="one">
          <div>总资金</div>
        </div>
        <div className="two">
          <span>¥</span>
          <span className="num">&nbsp;{accountInfo['funds']}</span>
        </div>
        <div className="three">
          <div>使用中&nbsp;&nbsp;激励金额 ¥{accountInfo['funds']}</div>
        </div>
      </div>
      {/* <div className="btn">
        <button className="out" onClick={() => selectName('out')}>
          转出
        </button>
        <button className="in" onClick={() => selectName('in')}>
          转入
        </button>
      </div> */}
      <Dialog visible={show} showConfirmButton={false}>
        <div className="dialog">
          <div className="text">
            <img className="img" src={close} alt="" onClick={giveUp} />
            <div>{selectText}金额</div>
            <div></div>
          </div>
          <div className="money">¥100.90</div>
          <div className="in-out">{selectText == '转出' ? '转出到 账户资金' : '转入到 运营资金'}</div>
          <div>
            <button className="btn" onClick={() => wthdrawal(selectText)}>
              确认
            </button>
          </div>
        </div>
      </Dialog>
      <ActionSheet visible={visible} onClickOverlay={() => setVisible(false)}>
        <div className="number-dialog">
          <div className="box">
            <div>{selectText}运营资金金额（元）</div>
            <div className="input-num">
              <div>¥</div>
              {/* <input value={value} type="" /> */}
              <div className="input">{value}</div>
            </div>
            <div>可{selectText}&nbsp;¥23999元</div>
          </div>
          <NumberKeyboard
            theme="custom"
            extraKey="."
            closeButtonText={selectText}
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

export default OperateCapitalPage
