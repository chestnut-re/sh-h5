import React, { useState, FC } from 'react'

import { Progress } from 'react-vant'
import './index.less'
/**
 * 我的激励目标
 */

const MineMotivationCard: FC = (props) => {
  return (
    <div className="mineMot-box">
      <div className="mineMot-header">
        <span>2021-11-01</span>
        <span className="header-split">至</span>
        <span>2021-12-30</span>
      </div>
      <div className="mineMot-rew">
        <p className="mineMot-rewnum">奖励 ¥10,000</p>
        <p className="mineMot-name">方案名称1占位符</p>
      </div>
      <div className="mineMot-sales">
        <div className="mineMot-salesL">销售额：</div>
        <div className="mineMot-salesR">
          <span>600,000/</span>1,000,000
        </div>
      </div>
      <div className="mineMot-progress">
        <Progress percentage={50} strokeWidth="2.14vw" trackColor="#EEEEEE" color="#00D2C6" showPivot={false} />
      </div>
    </div>
  )
}

export default MineMotivationCard
