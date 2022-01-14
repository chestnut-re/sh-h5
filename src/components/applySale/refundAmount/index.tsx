import React, { useState,useEffect, FC } from 'react'

import './index.less'
/**
 * 退改说明卡片
 */
interface RefundAmountType{
  refundTokenAmount:number;
  refundAmount:number
}

const RefundAmountCard: FC<RefundAmountType> = ({ refundTokenAmount, refundAmount }) => {


//   useEffect(()=>{
//     if (defaultValue) {
//         const {amount,tokenAmount} = defaultValue;
//         setRemarks(remarks)
        
//     }
// },[defaultValue])
  return (
    <div className='refuamount-container'>
      <div className="refuamount-card">
        <div className="refuamount-name">退款金额</div>
        <div className="refuamount-r">
          ¥<span>{refundAmount/100}</span>
        </div>
      </div>
      {refundTokenAmount>0?<div className="refuamount-card">
        <div className="refuamount-name">退回积分</div>
        <div className="refuamount-r">
          <span>{refundTokenAmount}</span>
        </div>
      </div>:null}
    </div>
  )
}

export default RefundAmountCard
