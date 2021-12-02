import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Icon } from 'react-vant';
import './index.less'
/**
 * 退改说明卡片
 */

const BackThatCard = observer((props) => {
  return (
    <div className="backthat_card">
      <div className="backthat-name">退改说明</div>
      <div className="backthat-select">
        <Icon color="#999999" name="arrow" />
      </div>
    </div>
  )
})

export default BackThatCard
