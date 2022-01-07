import React, { useEffect, useState } from 'react'
import { Dialog, Toast, ActionSheet, NumberKeyboard, NavBar } from 'react-vant'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import { url } from 'inspector'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { AccountInfoApi } from '@/service/AccountInfo'
import MyNavBar from '@/components/myNavBar'
import close from '@/assets/img/capital/close.png'

/**
 * 运营资金
 */
const OperateCapitalPage: React.FC = () => {
  const [selectType, setSelectType] = useState('')
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
    setSelectType(text)
  }
  const wthdrawal = (type) => {
    if (type == 'out') {
      outApi()
    } else {
      inApi()
    }
  }

  const outApi = async () => {
    const res = await AccountInfoApi.fundsOut({ amount: Number(value) * 100 })
    if (res.code == '200') {
      setShow(false)
      SHBridge.jump({
        url: generateUrl(`/userdrawal?money=${value}&dec=成功转出¥${value}到资金账户`),
      })
    } else {
      SHBridge.showToast(res.msg)
    }
  }
  const inApi = async () => {
    const res = await AccountInfoApi.fundsIn({ amount: Number(value) * 100 })
    if (res.code == '200') {
      setShow(false)
      SHBridge.jump({
        url: generateUrl(`/userdrawal?money=${value}&dec=成功转入¥${value}到运营账户`),
      })
    } else {
      SHBridge.showToast(res.msg)
    }
  }
  const toFundDetails = () => {
    SHBridge.jump({ url: generateUrl('/operate-details?isFullScreen=0'), newWebView: true, title: '运营资金明细' })
  }
  const openDialog = () => {
    if (isNaN(Number(value)) || Number(value) == 0) {
      SHBridge.showToast('请输入正确的金额')
      return
    }

    setValue(Number(value).toString())
    if (selectType == 'out') {
      if (Number(value) > Number((accountInfo['funds'] / 100).toFixed(2))) {
        SHBridge.showToast('转出金额超过可转资金')
        return
      }
    } else {
      if (Number(value) > Number((accountInfo['available'] / 100).toFixed(2))) {
        SHBridge.showToast('转入金额超过可转资金')
        return
      }
    }
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
  const closeActionSheet = () => {
    setVisible(false)
    setValue('')
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
          <div>可用资金</div>
        </div>
        <div className="two">
          <span>¥</span>
          <span className="num">&nbsp;{((accountInfo['funds'] || 0) / 100).toFixed(2)}</span>
        </div>
        <div className="three">
          <div>冻结金额 ¥{((accountInfo['fundsFrozen'] || 0) / 100).toFixed(2)}</div>
        </div>
      </div>
      <div className="btn">
        <div className="out" onClick={() => selectName('out')}>
          转出
        </div>
        <div className="in" onClick={() => selectName('in')}>
          转入
        </div>
      </div>
      <Dialog visible={show} showConfirmButton={false}>
        <div className="dialog">
          <div className="text">
            <img className="img" src={close} alt="" onClick={giveUp} />
            <div>{selectType == 'out' ? '转出金额' : '转入金额'}</div>
            <div></div>
          </div>
          <div className="money">¥{value}</div>
          <div className="in-out">{selectType == 'out' ? '转出到 账户资金' : '转入到 运营资金'}</div>
          <div>
            <button className="btn" onClick={() => wthdrawal(selectType)}>
              确认
            </button>
          </div>
        </div>
      </Dialog>
      <ActionSheet visible={visible} onClickOverlay={closeActionSheet}>
        <div className="number-dialog">
          <div className="box">
            <div>{selectType == 'out' ? '转出到 账户资金金额（元）' : '转入到 运营资金金额（元）'}</div>
            <div className="input-num">
              <div>¥</div>
              {/* <input value={value} type="" /> */}
              <div className="input">{value}</div>
            </div>
            <div>
              可
              {selectType == 'out'
                ? `转出¥${(accountInfo['funds'] / 100).toFixed(2)}元`
                : `转入${(accountInfo['available'] / 100).toFixed(2)}`}
              &nbsp;
            </div>
          </div>
          <div className={Number(value) > 0 ? 'numberKey_yes' : 'numberKey_no'}>
            <NumberKeyboard
              theme="custom"
              extraKey="."
              closeButtonText={selectType == 'out' ? '转出' : '转入'}
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

export default OperateCapitalPage
