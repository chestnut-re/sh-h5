import React, { useState,useEffect,FC } from 'react'

import QRCode from 'qrcode.react';

import './index.less'
/**
 * 出行二维码卡片
 */
const StateMap = {
        1:{name:"待付款",qrName:"此行程单待付款",cName:'CFD7D81'} ,
        2:{name:"已失效",qrName:"此行程单已失效",cName:'C666666'} ,
        3:{name:"待核销",qrName:"将码提供给工作人员确认出行",cName:''}, 
        4:{name:"已完成",qrName:"此行程单已确认无误",cName:"C4DCFC5"}, 
        5:{name:"退款中",qrName:"此行程单正在进行退款",cName:'CFD7D81'}, 
        6:{name:"退款成功",qrName:"此行程单已退款成功",cName:'CFD7D81'}, 
        7:{name:"退款失败",qrName:"此行程单已退款失败",cName:'CFD7D81'}
}

interface TravelProps{
        travelerName:string,
        id:string;
        orderId:string;
        state:number;
}

const TravelCard:FC<TravelProps> = (props) => {
  const {travelerName,id,orderId,state} = props;
const [qrCodeVal,setQrCodeVal] = useState("");
        useEffect(() => {
                const Stringval = `shtravel://app?data=${encodeURIComponent(JSON.stringify({"orderId":orderId,"suborderId":id,type:"verifications"}))}`
                setQrCodeVal(Stringval)
        }, [id,orderId])

  return (
    <div className="trave-content">
        <div className="trave-header">
                出行确认码
        </div>
        <div className="trave-title">
                {StateMap[state].qrName}
        </div>
        <div className="qrcode-content">
        <QRCode 
            value={qrCodeVal}
            fgColor={state!=3?"rgba(0,0,0,0.1)":'#000'}
            size={100}/>
            {state!=3?(<div className={`qrcode-state ${StateMap[state].cName}`}>
                    {StateMap[state].name}
            </div>):null}
        </div>
        <div  className="trave-name">
            {travelerName}
        </div>
    </div>
  )
}

export default TravelCard
