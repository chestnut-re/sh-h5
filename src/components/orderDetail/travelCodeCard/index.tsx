import React, { useState,FC } from 'react'

import QRCode from 'qrcode.react';

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
        <QRCode 
            value={"123123"}
            size={100}/>
        </div>
        <div  className="trave-name">
            李买买
        </div>
    </div>
  )
}

export default TravelCard
