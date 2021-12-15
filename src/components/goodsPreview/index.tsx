import React, { useState, FC } from 'react'

import './index.less'
//商品预览
const GoodsPreview: React.FC = () => {
  return (
    <div className="Good_preview-container">
      <div className="preview-h">
        <img className="preview-img" src="http://picsum.photos/335/415" />
      </div>
      <div className="pays-preview-content">
        <div className="preview-name rv-multi-ellipsis--l2">三亚5日跟团游三亚5日跟团游三亚5日跟团游「星4晚 连住」</div>
        <div className="preview-price">¥2988</div>
        <div className="preview-foot">
          <div className="foot-left">3456已付款</div>
          <div className="foot-right">2356</div>
        </div>
      </div>
    </div>
  )
}
export default GoodsPreview
