import { common } from '@/service'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Icon, Stepper, Popover } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import questionIcon from '@/assets/img/question_icon@3x.png'
import './index.less'
/**
 * 订单步进器选择卡片包含
 * 成人儿童数 积分 库存 优惠选择等
 */

const StepperCard = observer((props) => {
  const [stepValue, setstepValue] = useState(2)
  const popover = () => {}
  const setValue = (val) => {
    console.log('val :>> ', val)
    setstepValue(val)
  }
  return (
    <div className="stepper-content">
      <div className="step-box">
        <ul className="step-boxul">
          <li className="step-boxli">
            <div className="step-name">
              成人<span className="name-subtitle">X2</span>
            </div>
            <div className="step-content">
              <Stepper
                value={stepValue}
                disableInput
                min="0"
                max="8"
                integer={true}
                inputWidth="9.6vw"
                buttonSize="5.6vw"
                onChange={(val) => setValue(val)}
              />
            </div>
          </li>
          <li className="step-boxli">
            <div className="step-name">
              儿童<span className="name-subtitle">X2</span>
            </div>
            <div className="step-content">
              <Stepper
                value={stepValue}
                disableInput
                min="0"
                max="8"
                integer={true}
                inputWidth="9.6vw"
                buttonSize="5.6vw"
                onChange={(val) => setValue(val)}
              />
            </div>
          </li>
          <li className="step-boxli">
            <div className="step-name hairline--icon">
              <Icon size="4vw" className="integra-icon" name={integralIcon} />
              <span>积分</span>
              <span className="name-subtitle">共346000</span>
            </div>
            <div className="step-content">
              <Stepper
                value={stepValue}
                min="0"
                max="99999"
                step="1000"
                integer={true}
                inputWidth="9.6vw"
                buttonSize="5.6vw"
                onChange={(val) => setValue(val)}
              />
            </div>
          </li>
        </ul>
      </div>

      <div className="info-integral rv-hairline--bottom">
        <div className="integral-title">
          <span>库存：11</span>
        </div>
        <div className="integral-instruction">
          当前订单最多可<span>-¥34</span>
        </div>
      </div>

      <div className="info-discounts">
        <div className="discounts-title hairline--icon">
          优惠
          <Popover
            ref={popover}
            placement="top-start"
            reference={<Icon className="discounts-icon" name={questionIcon} />}
          >
            <div className="popover-content">这里是优惠说明这里是优惠说明这里是优惠说明这里是优惠说明</div>
          </Popover>
        </div>
        <div className="discounts-instruction">
          <div className="instruction-l">
            已优惠<span>¥200</span>
          </div>
          <div className="instruction-r">
            共计¥<span>5798</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default StepperCard
