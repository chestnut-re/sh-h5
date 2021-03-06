import React, { useState, useEffect, FC } from 'react'
import { RMB_CON } from '@/utils/currency'
import './index.less'
/**
 * 退改说明卡片
 */
// const RMB_CON = 1000

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

  useEffect(() => {
    setrefundAmount(refundAmount)
    setrefundTokenAmountNum(refundTokenAmount)
  }, [refundTokenAmount, refundAmount])

  return (
    <div className="refuamount-container">
      <div className="refuamount-card">
        <div className="refuamount-name">退款金额</div>
        <div className="refuamount-r">
          ¥<span>{RMB_CON(refundAmountNum)}</span>
        </div>
      </div>
      {!isNaN(refundTokenAmountNum) && refundTokenAmountNum > 0 ? (
        <div className="refuamount-card">
          <div className="refuamount-name">退回乐豆</div>
          <div className="refuamount-r">
            <span>{RMB_CON(refundTokenAmountNum)}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default RefundAmountCard
