import React, { useState, FC } from 'react'
import { SHBridge } from '@/jsbridge'
import undoapply_icon from '@/assets/img/pay_success@3x.png'
import './undo.less'

/**
 * 撤销申请成功
 *
 */
const UndoApplyPage: FC = () => {
  const closeUndoApplyPage = () => {
    SHBridge.closePage()
  }

  return (
    <div className="UndoApply-container">
      <div className="undoapply-box">
        <div className="undoapply-box-icon">
          <img src={undoapply_icon} alt="" />
        </div>
        <div className="undoapply-box-title">退款撤消成功</div>
        <div className="undoapply-box-text">当前线路订单已恢复，请及时关注出行信息</div>
        <div className="undoapply-box-btn" onClick={closeUndoApplyPage}>
          好的
        </div>
      </div>
    </div>
  )
}

export default UndoApplyPage
