import React, { useState,FC } from 'react'

import { Icon, Popover } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import './index.less'
/**
 * 出行二维码卡片
 */

const TravelCard:FC = (props) => {
  
  return (
    <div className="trave-content">
        <div className="trave-header">
                出行确认码
        </div>
        <div className="trave-title">
                将码提供给工作人员确认出行
        </div>
        <div className="qrcode-content">
                <img src="https://qr.api.cli.im/newqr/create?data=Hello%2BWorld&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=334dcce21846c412e372ba157a65f130"/>
        </div>
        <div  className="trave-name">
            李买买
        </div>
    </div>
  )
}

export default TravelCard
