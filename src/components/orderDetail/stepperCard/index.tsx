import React, { useState, useEffect, FC } from 'react'

import { ConfigProvider, Icon, Stepper } from 'react-vant'
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
  tokenAmountNum:number; 
}

const StepperCard: FC<StepType> = ({selectTime:{pointsDeduction,stock}, priceSet,tokenAmountNum,handleStepper,handleDiscounts}) => {
  //成人数量
  const [adultNum, setAdultNum] = useState(1)
  //儿童数量
  const [childNum, setChildrenVal] = useState(0)
  //积分使用量
  const [inteNum, setInteNum] = useState(0)

  //库存数量adultStock成人可选库存量 childStock：儿童可选库存量
  const [stockdata,setStockdata] = useState({
    adultStock:0,
    childStock:0,
  })
  
  useEffect(()=>{
    setStockdata({
      adultStock:stock,
      childStock:stock,
    })
  },[stock])

  useEffect(()=>{
    setStockdata({
      adultStock:stock-childNum,
      childStock:stock-adultNum,
    })
    console.log('object :>> 可选改变');
  },[stock,childNum,adultNum])

  const setGrownNumValue = (val) => {
    setAdultNum(val)
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
    handleDiscounts()
  }
  //处理用户输入位数过多导致总价显示变形
const beforeChangeValue = (val)=>{
  if (val>999999) {
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
                  max={stockdata.adultStock}
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  beforeChange={(val)=>beforeChangeValue(val)}
                  onChange={(val) => setGrownNumValue(val)}
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
                  max={stockdata.childStock}
                  integer={true}
                  inputWidth="9.6vw"
                  buttonSize="5.6vw"
                  beforeChange={(val)=>beforeChangeValue(val)}
                  onChange={(val) => setChildrenValue(val)}
                />
              </ConfigProvider>
            </div>
          </li>
          {pointsDeduction&&tokenAmountNum>0 ? (
            <li className="step-boxli">
              <div className="step-name hairline--icon">
                <Icon size="4vw" className="integra-icon" name={integralIcon} />
                <span>金豆</span>
                <span className="name-subtitle">共{(tokenAmountNum)/RMB_CON}</span>
              </div>
              <div className="step-content">
                <ConfigProvider themeVars={themeVars}>
                  <Stepper
                    disabled={(pointsDeduction/RMB_CON)<1?true:false}
                    value={inteNum}
                    min="0"
                    max={pointsDeduction/RMB_CON}
                    step="1"
                    longPress={false}
                    integer={true}
                    inputWidth="9.6vw"
                    buttonSize="5.6vw"
                    beforeChange={(val)=>beforeChangeValue(val)}
                    onChange={(val) => setIntegralNumValue(val)}
                  />
                </ConfigProvider>
              </div>
            </li>
          ) : null}
        </ul>
      </div>

      {pointsDeduction&&tokenAmountNum>0 ? (
        <div className="info-integral rv-hairline--bottom">
          <div className="integral-instruction">
            此订单最多可用{pointsDeduction/RMB_CON}金豆抵<span>¥{pointsDeduction/RMB_CON}</span>
          </div>
        </div>
      ) : null}

     {priceSet?.preferPrice>0?( <div className="info-discounts">
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
      </div>):null}
    </div>
  )
}

export default StepperCard
