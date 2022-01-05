import React, { useState, useEffect, FC } from 'react'

import { ConfigProvider, Icon, Toast, Stepper } from 'react-vant'
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
const RMB_CON = 100
interface StepType {
  handleDiscounts: () => void
  handleStepper: (val) => void
  selectTime: any
  priceSet: any
  tokenAmountNum: number
}

const StepperCard: FC<StepType> = ({
  selectTime: { pointsDeduction, stock },
  priceSet,
  tokenAmountNum,
  handleStepper,
  handleDiscounts,
}) => {
  //成人数量
  const [adultNum, setAdultNum] = useState(1)
  //儿童数量
  const [childNum, setChildrenVal] = useState(0)
  //积分使用量
  const [inteNum, setInteNum] = useState(0)
  //库存数量
  const [stockNum, setstockNum] = useState(2)

  useEffect(()=>{
    console.log('obje库存改变ct :>> ', stock);
    setstockNum(stock)
  },[stock])
  

  //手动输入失去焦点判断当前值是否大于库存 大于库存设置为最大值
  const setGrownNumBlur = (e, type) => {
    console.log('val :>> ', e)
    let inputVal = e.target.value
    if (type == 1) {
      const MacStockNum = stockNum - childNum
      if (inputVal > MacStockNum) {
        inputVal = MacStockNum
        setAdultNum(MacStockNum)
        Toast(`最多只能买${MacStockNum}件`)
      }
    } else if (type == 2) {
      const MacStockNum = stockNum - adultNum
      if (inputVal > MacStockNum) {
        inputVal = MacStockNum
        setChildrenVal(MacStockNum)
        Toast(`最多只能买${MacStockNum}件`)
      }
    } else if (type == 3) {
      //积分数据判断
      if (inputVal > pointsDeduction) {
        inputVal = pointsDeduction
        setInteNum(pointsDeduction)
        Toast(`最多只能使用${pointsDeduction}积分`)
      }
    }
  }

  const setGrownNumValue = (val) => {
    const AduStock = stockNum - childNum;
    if (AduStock - val <= 0) {
      Toast(`预定总数最多${AduStock}份`)
      setAdultNum(AduStock)
    } else {
      setAdultNum(val)
    }
  }

  const setChildrenValue = (val) => {
    const ChildAduStock = stockNum - adultNum;
    if (ChildAduStock - val <= 0) {
      Toast(`预定总数最多${ChildAduStock}份`)
      setChildrenVal(ChildAduStock)
    } else {
      setChildrenVal(val)
    }
  }
  const setIntegralNumValue = (val) => {
    console.log('val :>> ', val)
    setInteNum(val)
  }
  const getExamine = () => {
    handleDiscounts()
  }
  //处理用户输入位数过多导致总价显示变形
  const beforeChangeValue = (val) => {
    if (val>stockNum) {
      return false
    }
    return true
  }
  useEffect(() => {
    handleStepper({
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
                  max={stockNum-childNum}
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  beforeChange={(val) => beforeChangeValue(val)}
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
                  max={stockNum-adultNum}
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  beforeChange={(val) => beforeChangeValue(val)}
                  onChange={(val) => setChildrenValue(val)}
                  onBlur={(val) => setGrownNumBlur(val, 2)}
                />
              </ConfigProvider>
            </div>
          </li>
          {pointsDeduction && tokenAmountNum > 0 ? (
            <li className="step-boxli">
              <div className="step-name hairline--icon">
                <Icon size="4vw" className="integra-icon" name={integralIcon} />
                <span>金豆</span>
                <span className="name-subtitle">共{tokenAmountNum / RMB_CON}</span>
              </div>
              <div className="step-content">
                <ConfigProvider themeVars={themeVars}>
                  <Stepper
                    disabled={pointsDeduction / RMB_CON < 1 ? true : false}
                    value={inteNum}
                    min="0"
                    max={pointsDeduction / RMB_CON}
                    step="1"
                    longPress={false}
                    integer={true}
                    inputWidth="9.6vw"
                    buttonSize="5.6vw"
                    beforeChange={(val) => beforeChangeValue(val)}
                    onChange={(val) => setIntegralNumValue(val)}
                  />
                </ConfigProvider>
              </div>
            </li>
          ) : null}
        </ul>
      </div>

      {pointsDeduction && tokenAmountNum > 0 ? (
        <div className="info-integral rv-hairline--bottom">
          <div className="integral-instruction">
            此订单最多可用{pointsDeduction / RMB_CON}金豆抵<span>¥{pointsDeduction / RMB_CON}</span>
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
              <span>{priceSet?.preferPrice}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default StepperCard
