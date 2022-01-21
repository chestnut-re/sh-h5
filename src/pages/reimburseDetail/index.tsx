import React, { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import { OrderApi } from '@/service/OrderDetailApi'
import emptyIcon from '@/assets/img/empty@3x.png'
import './index.less'
import { Toast, Empty } from 'react-vant'

/**
 * 退款详情入口页
 * url 必填项
 *    id：退款单id
 * -----------------------
 */
const ReimburseDetail: FC = () => {
  const [ordersTravel, setOrdersTravel] = useState([])
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))

  return (
    <div className="container">
      <h1>退款详情</h1>

      {/* <Empty className="custom-image" image={emptyIcon} description="暂无数据" /> */}
    </div>
  )
}

export default ReimburseDetail
