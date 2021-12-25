import React, { useState, useEffect, FC } from 'react'

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
interface StepType {
  handleDiscounts: () => void
  handleStepper: (val) => void
}

const StepperCard: FC<StepType> = (props) => {
  const INVENTORY = 11

  //成人数量
  const [adultNum, setAdultNum] = useState(1)
  //儿童数量
  const [setChildNum, setChildrenVal] = useState(0)
  //积分使用量
  const [inteNum, setInteNum] = useState(0)

  const setGrownNumValue = (val) => {
    console.log('val :>> ', props)
    setAdultNum(val)
  }
  //手动输入失去焦点判断当前值是否大于库存 大于库存设置为最大值
  const setGrownNumBlur = (e) => {
    console.log('val :>> ', e)
    if (e.target.value > INVENTORY) {
      e.target.value = INVENTORY
      setAdultNum(INVENTORY)
      Toast(`最多只能买${INVENTORY}件`)
    }
  }
  const setChildrenValue = (val) => {
    console.log('val :>> ', val)
    setChildrenVal(val)
  }
  const setIntegralNumValue = (val) => {
    console.log('val :>> ', val)
    setInteNum(val)
  }
  const getExamine = () => {
    props.handleDiscounts()
  }

  useEffect(() => {
    props.handleStepper({
      adultNum: adultNum, //成人数量
      setChildNum: setChildNum, //儿童数量
      intNum: inteNum, //积分
    })
  }, [adultNum, setChildNum, inteNum])

  return (
    <div className="stepper-content">
      <div className="step-box">
        <ul className="step-boxul">
          <li className="step-boxli">
            <div className="step-name">
              成人<span className="name-subtitle">X{adultNum}</span>
            </div>
            <div className="step-content">
              <ConfigProvider themeVars={themeVars}>
                <Stepper
                  value={adultNum}
                  min="1"
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
              儿童<span className="name-subtitle">X{setChildNum}</span>
            </div>
            <div className="step-content">
              <ConfigProvider themeVars={themeVars}>
                <Stepper
                  value={setChildNum}
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
              <span>金币</span>
              <span className="name-subtitle">共34.6</span>
            </div>
            <div className="step-content">
              <ConfigProvider themeVars={themeVars}>
                <Stepper
                  value={inteNum}
                  min="0"
                  max="34"
                  step="1"
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
          此订单最多可用34.6金币抵<span>¥34</span>
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
