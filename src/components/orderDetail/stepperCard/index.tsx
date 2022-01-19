import React, { useState, useEffect, FC } from 'react'

import { ConfigProvider, Icon } from 'react-vant'
import questionIcon from '@/assets/img/question_icon@3x.png'
import StepperRui from '@/components/orderDetail/stepperCard/stepperRui'
import './index.less'

/**
 * 订单步进器选择卡片包含
 * 成人儿童数 积分 库存 优惠选择等
 */
const themeVars = {
  '--rv-stepper-button-icon-color': '#121212',
}
const RMB_CON = 100
interface StepType {
  handleDiscounts: () => void
  handleStepper: (val) => void
  selectTime: any
  priceSet: any
  tokenAmountNum: number
  onChangeClickAdultNum?: () => void
  purchaseConfigInfo: any //限购数据'
  isPurchase: boolean
}

const StepperCard: FC<StepType> = ({
  selectTime: { pointsDeduction, stock },
  priceSet,
  tokenAmountNum,
  handleStepper,
  handleDiscounts,
  onChangeClickAdultNum,
  purchaseConfigInfo,
  isPurchase,
}) => {
  //成人数量
  const [adultNum, setAdultNum] = useState(1)
  //儿童数量
  const [childNum, setChildrenVal] = useState(0)
  //积分使用量
  const [inteNum, setInteNum] = useState(0)
  //库存数量
  const [stockNum, setstockNum] = useState(2)
  //乐豆最大抵扣数量
  const [maxInteNum, setMaxInteNum] = useState(0)

  useEffect(() => {
    console.log('obje库存改变ct :>> ', stock)
    setstockNum(stock)
  }, [stock, purchaseConfigInfo])

  const getExamine = () => {
    handleDiscounts()
  }

  useEffect(() => {
    if (pointsDeduction > tokenAmountNum) {
      const tokenAmountNums = parseInt(tokenAmountNum / 100)
      setMaxInteNum(tokenAmountNums)
    } else {
      setMaxInteNum(parseInt(pointsDeduction / 100))
    }
  }, [pointsDeduction, tokenAmountNum])

  useEffect(() => {
    handleStepper({
      adultNum: adultNum && adultNum > 0 ? adultNum : 1, //成人数量
      childNum: childNum && childNum >= 0 ? childNum : 0, //儿童数量
      intNum: inteNum * 100, //积分
    })
  }, [adultNum, childNum, inteNum])
  //处理成人数量
  const setGrownNumRuiValue = (val) => {
    setAdultNum(val)
    onChangeClickAdultNum && onChangeClickAdultNum()
  }
  //处理儿童数量
  const setChildNumRuiValue = (val) => {
    setChildrenVal(val)
    console.log('val :>> ', val)
  }
  //处理积分数量
  const setinteNumRuiValue = (val) => {
    setInteNum(val)
    console.log('val :>> ', val)
  }

  return (
    <div className="stepper-content">
      <div className="step-box">
        <ul className="step-boxul">
          <li className="step-boxli">
            <div className="step-name">
              成人<span className="name-subtitle">X{adultNum}</span>
            </div>
            <div className="step-content">
              <StepperRui
                value={adultNum}
                min={1}
                max={stockNum - childNum}
                isdisabled={!isPurchase}
                changeValue={(val) => setGrownNumRuiValue(val)}
              />
            </div>
          </li>
          <li className="step-boxli">
            <div className="step-name">
              儿童<span className="name-subtitle">X{childNum}</span>
            </div>
            <div className="step-content">
              <StepperRui
                value={childNum}
                min={0}
                max={stockNum - adultNum}
                changeValue={(val) => setChildNumRuiValue(val)}
              />
            </div>
          </li>
          {maxInteNum >= 1 && tokenAmountNum >= 1 ? (
            <li className="step-boxli">
              <div className="step-name hairline--icon">
                <span className="hellp-icon">乐豆</span>
                <span className="name-subtitle">共{tokenAmountNum / RMB_CON}</span>
              </div>
              <div className="step-content">
                <ConfigProvider themeVars={themeVars}>
                  <StepperRui
                    value={inteNum}
                    min={0}
                    max={pointsDeduction / RMB_CON}
                    changeValue={(val) => setinteNumRuiValue(val)}
                  />
                </ConfigProvider>
              </div>
              <div className="hellp-icon-l"></div>
            </li>
          ) : null}
        </ul>
      </div>

      {pointsDeduction / RMB_CON >= 1 && maxInteNum >= 1 ? (
        <div className="info-integral rv-hairline--bottom">
          <div className="integral-instruction">
            此订单最多可用{maxInteNum}.00乐豆抵<span>¥{maxInteNum}.00</span>
          </div>
        </div>
      ) : null}

      {priceSet?.preferPrice > 0 ? (
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
              <span>{priceSet?.preferPrice / RMB_CON}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default StepperCard
