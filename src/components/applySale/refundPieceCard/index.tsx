import React, { useState,FC } from 'react'
import { ConfigProvider,Stepper } from 'react-vant'

import './index.less'

/**
 * 退款件数
 * 
 */
 const themeVars = {
    '--rv-stepper-button-icon-color': '#121212',
  };
const refupieceCard: FC = (props) => {
//成人数量
const [grownNumVal, setGrownVal] = useState(2)
//儿童数量
const [childrenNumVal, setChildrenVal] = useState(1)
const setChildrenValue = (val) => {
    console.log('val :>> ', val)
    setChildrenVal(val)
    
  }
  return (
    <div className="refupiece-card rv-hairline--top-bottom">
       <div className="refupiece-name">
           退款件数
       </div>
       <div className="refupiece-select">
           <ul className="refupiece-ul">
               <li className="refupiece-li">
                    <div className="refupiece-title">成人</div>
                    <div className="refupiece-box">
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
               <li className="refupiece-li">
                    <div className="refupiece-title">儿童</div>
                    <div className="refupiece-box">
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
           </ul>
       </div>
    </div>
  )
}

export default refupieceCard
