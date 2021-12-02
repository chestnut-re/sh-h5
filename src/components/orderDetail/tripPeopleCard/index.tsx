import { common } from '@/service'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Icon } from 'react-vant'
import arrowIcon from '@/assets/img/arrow_icon@3x.png'
import './index.less'
/**
 * 出行人卡片
 * 包含姓名 订单编号 退款状态
 */

const TripPeopleCard = observer((props) => {
  
  return (
    <div className="tripeop-content">
        <div className="tripeop-l">
            <div className="tripeop-lT">
                <div className="tripeop-name">
                李买卖<span className="tripeop-self">本人</span>
                </div> 
                <div className="tripeop-status">
                       <span>退款失败</span>
                </div>        
            </div>
            <div className="tripeop-lB">
                <span>1234 1234 1234 1234</span>
                <span className="tripeop-copy">编号复制</span>
            </div>
        </div>
        <div className="tripeop-r">
                <Icon size="2.8vw" name={arrowIcon} />
        </div>
    </div>
  )
})

export default TripPeopleCard
