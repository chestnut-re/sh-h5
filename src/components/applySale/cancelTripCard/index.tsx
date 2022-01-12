import React, { useState,useEffect, FC } from 'react'

import './index.less'

/**
 * 取消出行人
 *
 */
interface CancelTripType{
  adultRefundList:any[],
  childRefundList:any[];
  onchangeCancelTrip:()=>void
}

const CancelTripCard: FC<CancelTripType> = ({adultRefundList,childRefundList,onchangeCancelTrip}) => {
  const [tripList,setTripList] = useState([])

  useEffect(()=>{
    // setTripList([...adultRefundList,...childRefundList])
  },[adultRefundList,childRefundList])

  return (
    <div className="canceltrip-card rv-hairline--top-bottom">
      <div className="canceltrip-name">取消出行人</div>
      <div className="canceltrip-select">
        <span className="canceltrip-item canceltrip-action">力买力</span>
        <span className="canceltrip-item ">力买买</span>
        <span className="canceltrip-item canceltrip-action">力买买</span>
        <span className="canceltrip-item canceltrip-action">力买买</span>
      </div>
    </div>
  )
}

export default CancelTripCard
