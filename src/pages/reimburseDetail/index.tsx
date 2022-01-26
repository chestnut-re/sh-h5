import React, { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import { ManageOrder } from '@/service/ManageOrderApi'
import { Toast, Empty } from 'react-vant'
import { RMB_CON } from '@/utils/currency'
import './index.less'

/**
 * 退款详情入口页
 * url 必填项
 *    id：退款单id
 * -----------------------
 */
const ReimMap = {
  1: '退款中',
  2: '退款成功',
  3: '退款失败',
  4: '到账成功',
  5: '已取消',
}

const ReimburseDetail: FC = () => {
  const [reimdetail, setReimdetail] = useState()
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))
  useEffect(() => {
    ManageOrder.remburdetail(id)
      .then((res) => {
        console.log('res :>> ', res)

        const { code, data } = res
        if (code === '200' && data) {
          setReimdetail(data)
        }
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })
      .finally(() => {
        console.log('object请求完成 :>> ')
      })
  }, [])
  return (
    <div className="Reimburse-container">
      <div className="reimburse-detail">
        <ul className="reimburse-detail-ul">
          {/* <li className='reimburse-detail-li'>
                  <div className='reimburse-dl-left'>申请游客</div>
                  <div className='reimburse-dl-right'>李大为</div>
              </li> */}
          <li className="reimburse-detail-li">
            <div className="reimburse-dl-left">申请时间</div>
            <div className="reimburse-dl-right">{reimdetail?.applyTime}</div>
          </li>
          <li className="reimburse-detail-li">
            <div className="reimburse-dl-left">退款件数</div>
            <div className="reimburse-dl-right">
              {reimdetail?.adultNum > 0 ? <>成人x{reimdetail?.adultNum}</> : null}
              {reimdetail?.childNum > 0 ? <>儿童x{reimdetail?.childNum}</> : null}
            </div>
          </li>
          <li className="reimburse-detail-li">
            <div className="reimburse-dl-left">退款单号</div>
            <div className="reimburse-dl-right">{id}</div>
          </li>
          <li className="reimburse-detail-li">
            <div className="reimburse-dl-left">退款金额</div>
            <div className="reimburse-dl-right">¥ {RMB_CON(reimdetail?.amount)}</div>
          </li>
          <li className="reimburse-detail-li">
            <div className="reimburse-dl-left">退款原因</div>
            <div className="reimburse-dl-right">{reimdetail?.reason}</div>
          </li>
        </ul>
      </div>

      <div className="reimburse-detail">
        <ul className="reimburse-detail-ul">
          <li className="reimburse-detail-li">
            <div className="reimburse-dl-left">审核结果</div>
            <div className="reimburse-dl-right">{ReimMap[reimdetail?.refundState]}</div>
          </li>
          {reimdetail?.rejectReason ? (
            <li className="reimburse-detail-li">
              <div className="reimburse-dl-left">拒绝原因</div>
              <div className="reimburse-dl-right">{reimdetail?.rejectReason}</div>
            </li>
          ) : null}
        </ul>
      </div>
      {/* <Empty className="custom-image" image={emptyIcon} description="暂无数据" /> */}
    </div>
  )
}

export default ReimburseDetail
