import React, { useState, useEffect, FC } from 'react'

import { Icon } from 'react-vant'
import arrowIcon from '@/assets/img/arrow_icon@3x.png'
import './index.less'
/**
 * 出行人卡片
 * 包含姓名 订单编号 退款状态
 */
//出行人与联系人关系 0=本人 1=夫妻 2=父母 3=子女 4=亲戚 5=朋友 6=兄弟 7=姐妹
const TravelerMap = {
  0: '本人',
  1: '夫妻',
  2: '父母',
  3: '子女',
  4: '亲戚',
  5: '朋友',
  6: '兄弟',
  7: '姐妹',
}
const StateMap = {
  // 1: { name: '待付款', qrName: '此行程单待付款', cName: 'CFD7D81' },
  // 2: { name: '已失效', qrName: '此行程单已失效', cName: 'C666666' },
  // 3: { name: '待核销', qrName: '将码提供给工作人员确认出行', cName: '' },
  // 4: { name: '已完成', qrName: '此行程单已确认无误', cName: 'C4DCFC5' },

  1: { name: '退款中', cName: 'CFD7D81' },
  2: { name: '退款成功', cName: 'CFD7D81' },
  3: { name: '退款失败', cName: 'CFD7D81' },
  5: { name: '已取消', cName: 'CFD7D81' },
}
interface TripPeopleType {
  travelerRelation: number
  travelerName: string
  suborderNo: string
  state: number
  openTravelClick: (val) => void
  refundState: number
  refundId: string
}

const TripPeopleCard: FC<TripPeopleType> = ({
  travelerRelation,
  travelerName,
  suborderNo,
  refundId,
  state,
  refundState,
  openTravelClick,
  ...arg
}) => {
  return (
    <div
      className="tripeop-content"
      onClick={() => {
        openTravelClick({
          travelerRelation,
          travelerName,
          suborderNo,
          state,
          refundState,
          refundId,
          ...arg,
        })
      }}
    >
      <div className="tripeop-l">
        <div className="tripeop-lT">
          <div className="tripeop-name">
            {travelerName}
            {travelerRelation === 0 ? <span className="tripeop-self">{TravelerMap[travelerRelation]}</span> : null}
          </div>
          <div className="tripeop-status">
            <span>{StateMap[refundState]?.name}</span>
          </div>
        </div>
        <div className="tripeop-lB">
          <span>{suborderNo}</span>
          {/* <span className="tripeop-copy">编号复制</span> */}
        </div>
      </div>
      <div className="tripeop-r">
        <Icon size="2.8vw" name={arrowIcon} />
      </div>
    </div>
  )
}

export default TripPeopleCard
