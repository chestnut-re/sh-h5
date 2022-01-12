import React, { useState,useEffect, FC } from 'react'
import { ConfigProvider } from 'react-vant'
import StepperRui from '@/components/orderDetail/stepperCard/stepperRui'

import './index.less'

/**
 * 退款件数
 *
 */
const themeVars = {
  '--rv-stepper-button-icon-color': '#121212',
}
interface RefupieceType{
    suborderInfo:any;
    changeRefundNum:(val)=>void
}

const RefupieceCard: FC<RefupieceType> = ({suborderInfo,changeRefundNum}) => {

 const {adultNum,childNum} = suborderInfo;


  //成人数量
  const [adultNums, setAdultNums] = useState(0)
  //儿童数量
  const [childNums, setChildNums] = useState(0)

  useEffect(() => {
    changeRefundNum({
        adultNum:adultNums,
        childNum:childNums,
    })
  }, [adultNums,childNums])


  return (
    <div className="refupiece-card rv-hairline--top-bottom">
      <div className="refupiece-name">退款件数</div>
      <div className="refupiece-select">
        <ul className="refupiece-ul">
          <li className="refupiece-li">
            <div className="refupiece-title">成人</div>
            <div className="refupiece-box">
              <ConfigProvider themeVars={themeVars}>
                <StepperRui
                  value={adultNums}
                  min={1}
                  max={adultNum}
                  changeValue={(val) => setAdultNums(val)}
                />
              </ConfigProvider>
            </div>
          </li>
          <li className="refupiece-li">
            <div className="refupiece-title">儿童</div>
            <div className="refupiece-box">
              <ConfigProvider themeVars={themeVars}>
                <StepperRui
                  value={childNums}
                  min={0}
                  max={childNum}
                  changeValue={(val) => setChildNums(val)}
                />
              </ConfigProvider>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RefupieceCard
