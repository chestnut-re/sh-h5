import React, { useState,useEffect,FC } from 'react'

import QRCode from 'qrcode.react';

import './index.less'
/**
 * 填写出行码卡片
 */


interface TravelProps{
        FillTraveHandel:()=>void
}

const FillTravelCard:FC<TravelProps> = (props) => {
  
  return (
    <div className="filltrave-content">
        <div className="filltrave-header">
                出行确认码
        </div>
        <div className="filltrave-title">
               填写出行人信息，可获得出行确认码
        </div>
        <div className="filltrave-box">
                <div className='filltrave-btn' onClick={props.FillTraveHandel}>
                        填写出行人信息
                </div>
        </div>
    </div>
  )
}

export default FillTravelCard
