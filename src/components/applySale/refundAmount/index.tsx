import React, { useState, useEffect, FC } from 'react'

import './index.less'
/**
 * 退改说明卡片
 */
interface RefundAmountType {
  refundTokenAmount: number
  refundAmount: number
  defaultValue: any
}

const RefundAmountCard: FC<RefundAmountType> = ({ refundTokenAmount = 0, refundAmount = 0, defaultValue }) => {
  const [refundAmountNum, setrefundAmount] = useState(refundAmount)
  const [refundTokenAmountNum, setrefundTokenAmountNum] = useState(refundTokenAmount)
  useEffect(() => {
    if (defaultValue) {
      const { refundAmount, tokenAmount } = defaultValue
      setrefundAmount(refundAmount)
      setrefundTokenAmountNum(tokenAmount)
    }
  }, [defaultValue])

  return (
    <div className="refuamount-container">
      <div className="refuamount-card">
        <div className="refuamount-name">退款金额</div>
        <div className="refuamount-r">
          ¥<span>{refundAmountNum / 100}</span>
        </div>
      </div>
      {!isNaN(refundTokenAmountNum) ? (
        <div className="refuamount-card">
          <div className="refuamount-name">退回积分</div>
          <div className="refuamount-r">
            <span>{refundTokenAmountNum / 100}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default RefundAmountCard
