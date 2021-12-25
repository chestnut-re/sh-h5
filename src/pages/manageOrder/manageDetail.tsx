import React, { useState, useEffect, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import ManageDetail from '@/components/manageOrder/manageDetail'
import PersonalDetails from '@/components/manageOrder/personalDetails'
import { ManageOrder } from '@/service/ManageOrderApi'

import './index.less'
/**
 * 订单管理详情入口页面
 * 全部 待付款 待确认 已完成 退款_售后
 */
const getMaorderDetail = async (id) => {
  return new Promise<any>((resolve, reject) => {
    ManageOrder.detail({
      id,
    })
      .then((res: any) => {
        let { code, data } = res
        if (code == '200') {
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch((err) => {
        new Error(err)
      })
  })
}
const MaorderDetailPage: FC = () => {
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))

  const [details, setDetails] = useState({
    order: {},
    suborders: [],
  })

  const onLoadMaorderDetail = async () => {
    const data = await getMaorderDetail(id)
    setDetails(data)
  }

  useEffect(() => {
    onLoadMaorderDetail()
  }, [])

  return (
    <div className="MaorderDetail-container">
      <ManageDetail order={details.order} />
      {details?.suborders.length ? (
        <div className="maorder-list">
          {details.suborders.map((item) => {
            return (
              <div className="maorder-list-item" key={item['id']}>
                <PersonalDetails subordersitem={item} />
              </div>
            )
          })}
        </div>
      ) : null}
      {/* <div className="contact-btn">
        <div className="contact-bitem">联系</div>
      </div> */}
    </div>
  )
}

export default MaorderDetailPage
