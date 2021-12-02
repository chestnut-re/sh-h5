import { common } from '@/service'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Icon } from 'react-vant'
import arrowIcon from '@/assets/img/arrow_icon@3x.png'
import './index.less'
/**
 * 出行人卡片多人折叠
 * 包含姓名 数量
 */

const PreviewtripCard = observer((props) => {
  
  return (
    <div className="previewtrip-content">
        <div className="previewtrip-l">
            出行人
        </div>
        <div className="previewtrip-c rv-ellipsis">
        李买卖、李麻花李买卖、李麻花
        </div>
        <div className="previewtrip-r">
            <span>等4人</span>
            <Icon color="#999999" name="arrow" />
        </div>
    </div>
  )
})

export default PreviewtripCard
