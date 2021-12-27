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
  submitinfo: any
  selectTime: any
  priceSet: any
}

const StepperCard: FC<StepType> = (props) => {
  //成人数量
  const [adultNum, setAdultNum] = useState(1)
  //儿童数量
  const [childNum, setChildrenVal] = useState(0)
  //积分使用量
  const [inteNum, setInteNum] = useState(0)

  //接收商品信息
  const [stepinfo, setStepinfo] = useState<StepType>()
  //接收出行时间信息库存判断
  const [stepselectTime, setStepselectTime] = useState<StepType>()
  //接收优惠信息
  const [priceSet, setPriceSet] = useState<StepType>()

  //接收金币可抵扣比例
  const [deductionScaleNum, setdeductionScale] = useState<StepType>()

  useEffect(() => {
    console.log('props :>> ', props)
    const { submitinfo, selectTime, priceSet } = props
    setStepinfo(submitinfo)
    setStepselectTime(selectTime)
    setPriceSet(priceSet)
    setdeductionScale(submitinfo.deductionScale)
  }, [props])

  const setGrownNumValue = (val) => {
    console.log('val :>> ', props)
    setAdultNum(val)
  }
  //手动输入失去焦点判断当前值是否大于库存 大于库存设置为最大值
  const setGrownNumBlur = (e, type) => {
    const { stock } = stepselectTime
    console.log('val :>> ', e)
    let inputVal = e.target.value
    if (type == 1) {
      if (inputVal > stock) {
        inputVal = stock
        setAdultNum(stock)
        Toast(`最多只能买${stock}件`)
      } else if (inputVal <= 0) {
        inputVal = 1
        setAdultNum(1)
      }
    } else if (type == 2) {
      if (inputVal > stock) {
        inputVal = stock
        setChildrenVal(stock)
        Toast(`最多只能买${stock}件`)
      } else if (inputVal < 0) {
        inputVal = 0
        setChildrenVal(0)
      }
    } else if (type == 3) {
      //积分数据判断
      // if (inputVal > stock) {
      //   inputVal = stock
      //   setChildrenVal(stock)
      //   Toast(`最多只能买${stock}件`)
      // } else if (inputVal <= 0) {
      //   inputVal = 1
      //   setChildrenVal(1)
      // }
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
      adultNum: adultNum && adultNum > 0 ? adultNum : 1, //成人数量
      childNum: childNum && childNum >= 0 ? childNum : 0, //儿童数量
      intNum: inteNum, //积分
    })
  }, [adultNum, childNum, inteNum])

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
                  max={stepselectTime?.stock}
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  onChange={(val) => setGrownNumValue(val)}
                  onBlur={(val) => setGrownNumBlur(val, 1)}
                />
              </ConfigProvider>
            </div>
          </li>
          <li className="step-boxli">
            <div className="step-name">
              儿童<span className="name-subtitle">X{childNum}</span>
            </div>
            <div className="step-content">
              <ConfigProvider themeVars={themeVars}>
                <Stepper
                  value={childNum}
                  min="0"
                  max="8"
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  onChange={(val) => setChildrenValue(val)}
                  onBlur={(val) => setGrownNumBlur(val, 2)}
                />
              </ConfigProvider>
            </div>
          </li>
          {stepinfo?.isDeduction === 0 ? (
            <li className="step-boxli">
              <div className="step-name hairline--icon">
                <Icon size="4vw" className="integra-icon" name={integralIcon} />
                <span>金豆</span>
                <span className="name-subtitle">共{stepinfo?.tokenAmountNum}</span>
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
          ) : null}
        </ul>
      </div>

      {stepinfo?.isDeduction === 0 ? (
        <div className="info-integral rv-hairline--bottom">
          <div className="integral-instruction">
            此订单最多可用{stepinfo?.deductionNum}金豆抵<span>¥{stepinfo?.canDeductionNum}</span>
          </div>
        </div>
      ) : null}

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
            <span>{priceSet?.preferPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepperCard
