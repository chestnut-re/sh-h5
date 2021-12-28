import React, { useState, useEffect, FC } from 'react'
import './index.less'
/**
 * 订单管理详情
 * 包含 订单号 订单状态 购买用户 下单时间 商品名称 价格
 */
const MaStatusMap = {
  1: { text: '待付款', bgName: 'BGdaifk', cName: 'CF15E5E', type: 1 },
  2: { text: '已失效', bgName: 'BGyisx', cName: 'C999999', type: 2 },
  3: { text: '待确认', bgName: 'BGdaiqr', cName: 'C3AD2C5', type: 3 },
  4: { text: '已完成', bgName: 'BGyiwc', cName: 'C999999', type: 4 },
  5: { text: '退款中', bgName: 'BGtuikz', cName: 'CF48B43', type: 5 },
  6: { text: '已退款', bgName: 'BGyitk', cName: 'C999999', type: 6 },
  7: { text: '退款失败', bgName: 'BGyitk', cName: 'C999999', type: 7 },
  '': { text: '未知', bgName: 'BGyisx', cName: '', type: '' },
}
interface Myprops {
  order: {
    state: number
    orderNo: string
    orderUserName: string
    orderTime: string
    goodsName: string
    payAmount: number
  }
}

const ManageDetailItem: FC<Myprops> = (props) => {
  console.log('propsprops :>> ', props)
  const { order } = props
 

  return (
    <div className="Maorderdetail-item">
      <div className="detail-box">
        <ul className="detail-listUl">
          <li className="detail-listLi">
            <div className="listLi-left">订单编号</div>
            <div className="listLi-right">{order.orderNo}</div>
          </li>
          <li className="detail-listLi">
            <div className="listLi-left">购买用户</div>
            <div className="listLi-right">{order.orderUserName}</div>
          </li>
          <li className="detail-listLi">
            <div className="listLi-left">下单时间</div>
            <div className="listLi-right">{order.orderTime}</div>
          </li>
          <li className="detail-listLi">
            <div className="listLi-left">商品</div>
            <div className="listLi-right rv-ellipsis">{order.goodsName}</div>
          </li>
          <li className="detail-listLi">
            <div className="listLi-left">付款</div>
            <div className="listLi-right">¥ {order.payAmount}</div>
          </li>
        </ul>
      </div>
      <div className={`detail-status ${MaStatusMap[order.state]?.bgName}`}>
        <div className={`status-text ${MaStatusMap[order.state]?.cName}`}>
          <h1>{MaStatusMap[order.state]?.text}</h1>
          {/* {mastatus.type==6&&(<p>退款金额:¥{orderdetai.payAmount}</p>)} */}
        </div>
      </div>
    </div>
  )
}
export default ManageDetailItem
