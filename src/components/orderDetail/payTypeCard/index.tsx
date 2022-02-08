import React, { useState, useEffect, FC } from 'react'
import wechatPayicon from '@/assets/img/wechatpay_icon@3x.png'
import aliPayicon from '@/assets/img/alipay_icon@3x.png'
import otherPayicon from '@/assets/img/otherpay_icon@3x.png'
import close_icon from '@/assets/img/close_icon64@3x.png'
import { isApp, isMini } from '@/jsbridge/env'
import { Icon, ConfigProvider, ActionSheet, Radio, Cell } from 'react-vant'
import './index.less'
/**
 * 支付方式卡片
 */
interface PayType {
  changePayType: (val) => void
}

const themeVars = {
  '--rv-cell-vertical-padding': '16px',
  '--rv-cell-font-size': '16',
  '--rv-cell-icon-size': '5.46667vw',
  '--rv-cell-text-color': '#666666',
  '--rv-padding-base': '2.6vw',
}
const PayTypeCard: FC<PayType> = ({ changePayType }) => {
  const [PayTypeList, setPayTypeList] = useState([
    { name: '微信支付', payIcon: wechatPayicon, value: 2, alias: '微信' },
    { name: '支付宝支付', payIcon: aliPayicon, value: 3, alias: '支付宝' },
    { name: '其他支付方式', payIcon: otherPayicon, value: 4, alias: '其他支付方式' },
  ])
  const [showPaytype, setVisible] = useState(false)
  const [radiovSelectObj, setSelectObj] = useState(PayTypeList[0])

  useEffect(() => {
    const apppaylist = [
      { name: '微信支付', payIcon: wechatPayicon, value: 2, alias: '微信' },
      { name: '支付宝支付', payIcon: aliPayicon, value: 3, alias: '支付宝' },
      { name: '其他支付方式', payIcon: otherPayicon, value: 4, alias: '其他支付方式' },
    ]
    const miniPayList = [{ name: '微信小程序', payIcon: wechatPayicon, value: 1, alias: '小程序支付' }]
    if (isApp()) {
      setPayTypeList(apppaylist)
      setSelectObj(apppaylist[0])
    }
    isMini().then((res) => {
      console.log(res)
      if (res) {
        setPayTypeList(miniPayList)
        setSelectObj(miniPayList[0])
      }
    })
  }, [])

  useEffect(() => {
    changePayType(radiovSelectObj)
  }, [radiovSelectObj])

  return (
    <>
      <div className="Payment-content">
        <div className="payment_card">
          <div className="payment-name">支付方式</div>
          <div className="payment-select" onClick={() => setVisible(true)}>
            {radiovSelectObj.alias}
            <Icon color="#999999" name="arrow" />
          </div>
        </div>
      </div>
      <ActionSheet
        title="选择支付方式"
        visible={showPaytype}
        closeIcon={<Icon name={close_icon} />}
        onCancel={() => setVisible(false)}
      >
        <div className="payment-actionsheet">
          <ConfigProvider themeVars={themeVars}>
            <Radio.Group value={radiovSelectObj.value}>
              <Cell.Group>
                {PayTypeList.map((item) => {
                  return (
                    <Cell
                      title={item.name}
                      key={item.value}
                      center
                      onClick={() => {
                        setSelectObj(item), setVisible(false)
                      }}
                      icon={item.payIcon}
                      rightIcon={<Radio name={item.value} checkedColor="#4DCFC5" />}
                    />
                  )
                })}
              </Cell.Group>
            </Radio.Group>
          </ConfigProvider>
        </div>
      </ActionSheet>
    </>
  )
}

export default PayTypeCard
