import React, { useState, useEffect, FC } from 'react'

import './index.less'
/**
 * 底部支付，以及其他信息展示卡片
 */

interface FootPropsType {
  priceSetData: any
  submitHandleOrder: () => void
}

const FooterCard: FC<FootPropsType> = (props) => {
  const { priceSetData } = props
  const [priceinfo, setPriceinfo] = useState({})
  useEffect(() => {
    setPriceinfo(priceSetData)
  }, [props])
  return (
    <div className="order-action">
      <div className="action-main">
        <div className="action-l">
          <div className="action-total">
            <span>¥</span> {priceinfo['priceNum']}
          </div>
          <div className="action-dis">已优惠{priceinfo['preferPrice']}</div>
        </div>
        <div className="action-r" onClick={props.submitHandleOrder}>
          <div className="btn-pay">立即付款</div>
        </div>
      </div>
    </div>
  )
}

export default FooterCard
