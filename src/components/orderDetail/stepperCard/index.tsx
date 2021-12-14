import React, { useState, FC } from 'react'

import { ConfigProvider, Toast, Icon, Stepper } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import questionIcon from '@/assets/img/question_icon@3x.png'
import './index.less'
/**
 * 订单步进器选择卡片包含
 * 成人儿童数 积分 库存 优惠选择等
 */
const themeVars = {
  '--rv-stepper-button-icon-color': '#121212',
}

const StepperCard: FC = (props) => {
  const INVENTORY = 11

  //成人数量
  const [grownNumVal, setGrownVal] = useState(2)
  //儿童数量
  const [childrenNumVal, setChildrenVal] = useState(1)
  //积分使用量
  const [integralNumVal, setIntegralVal] = useState(1000)

  const setGrownNumValue = (val) => {
    console.log('val :>> ', val)
    setGrownVal(val)
  }
  const setGrownNumBlur = (e) => {
    console.log('val :>> ', e)
    if (e.target.value > INVENTORY) {
      e.target.value = INVENTORY
      setGrownVal(INVENTORY)
      Toast(`最多只能买${INVENTORY}件`)
    }
  }
  const setChildrenValue = (val) => {
    console.log('val :>> ', val)
    setChildrenVal(val)
  }
  const setIntegralNumValue = (val) => {
    console.log('val :>> ', val)
    setIntegralVal(val)
  }
  const getExamine = () => {
    props.history.push('/privilege')
    console.log('props :>> ', props)
  }

  return (
    <div className="stepper-content">
      <div className="step-box">
        <ul className="step-boxul">
          <li className="step-boxli">
            <div className="step-name">
              成人<span className="name-subtitle">X{grownNumVal}</span>
            </div>
            <div className="step-content">
              <ConfigProvider themeVars={themeVars}>
                <Stepper
                  value={grownNumVal}
                  min="0"
                  max={INVENTORY}
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  onChange={(val) => setGrownNumValue(val)}
                  onBlur={(val) => setGrownNumBlur(val)}
                />
              </ConfigProvider>
            </div>
          </li>
          <li className="step-boxli">
            <div className="step-name">
              儿童<span className="name-subtitle">X{childrenNumVal}</span>
            </div>
            <div className="step-content">
              <ConfigProvider themeVars={themeVars}>
                <Stepper
                  value={childrenNumVal}
                  min="0"
                  max="8"
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  onChange={(val) => setChildrenValue(val)}
                />
              </ConfigProvider>
            </div>
          </li>
          <li className="step-boxli">
            <div className="step-name hairline--icon">
              <Icon size="4vw" className="integra-icon" name={integralIcon} />
              <span>积分</span>
              <span className="name-subtitle">共346000</span>
            </div>
            <div className="step-content">
              <ConfigProvider themeVars={themeVars}>
                <Stepper
                  value={integralNumVal}
                  min="0"
                  max="346000"
                  step="1000"
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  onChange={(val) => setIntegralNumValue(val)}
                />
              </ConfigProvider>
            </div>
          </li>
        </ul>
      </div>

      <div className="info-integral rv-hairline--bottom">
        {/* <div className="integral-title">
          <span>库存：11</span>
        </div> */}
        <div className="integral-instruction">
          此订单最多可用34.6代币抵<span>¥34</span>
        </div>
      </div>

      <div className="info-discounts">
        <div
          className="discounts-title hairline--icon"
          onClick={() => {
            getExamine()
          }}
        >
          优惠
          <Icon className="discounts-icon" name={questionIcon} />
        </div>
        <div className="discounts-instruction">
          <div className="instruction-l">
            已优惠<b>¥</b>
            <span>460</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepperCard
