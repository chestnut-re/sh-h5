import React, { useState, useEffect, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import GoodsCard from '@/components/orderDetail/goodsCard'
import IndentCard from '@/components/orderDetail/indentCard'
import CompleteFooter from '@/components/submitBars/completeFooter'
import './index.less'

/**
 * 订单已失效入口页
 */

const OrderFailurePage: FC = (props) => {
  const history = useHistory()
  const { search } = useLocation()
  console.log('useParams :>> 路由信息', useLocation())

  useEffect(() => {}, [])

  const tabBarsList = {
    barLeftTitle: '再次购买',
    barRightTitle: '分享给TA',
    onSelect: (type, item) => {
      switch (type) {
        case 'barLeftTitle':
          //再次购买处理
          history.push('/submit-order')
          break
        case 'barRightTitle':
          //处理分享逻辑

          break
        default:
          break
      }
    },
  }
  return (
    <div className="Order-container">
      <div className="order-main">
        <div className="preview_card">
          <GoodsCard />
        </div>
        <IndentCard />
      </div>
      <CompleteFooter {...tabBarsList} />
    </div>
  )
}

export default OrderFailurePage
