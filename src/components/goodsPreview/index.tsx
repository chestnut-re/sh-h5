import React, { useState, FC } from 'react'
import { Image } from 'react-vant'
import './index.less'

const RMB_COM = 1000

interface GoodPreviewType {
  goodsName: string
  goodsNickName: string
  goodsPriceId: string
  personCurrentPrice: number
  promotionalImageUrl: string
  sales: string
  stock: string
}

/**
 * 商品预览
 */
const GoodsPreview: React.FC<GoodPreviewType> = (props) => {
  const { goodsName, personCurrentPrice, promotionalImageUrl, sales, stock } = props

  return (
    <div className="Good_preview-container">
      <div className="preview-h">
        <Image width="100%" height="100%" fit="cover" src={promotionalImageUrl} />
      </div>
      <div className="pays-preview-content">
        <div className="preview-name rv-ellipsis">{goodsName}</div>
        <div className="preview-price">¥{personCurrentPrice / RMB_COM}</div>
        <div className="preview-foot">
          <div className="foot-left">{sales}已付款</div>
          <div className="foot-right">{stock}</div>
        </div>
      </div>
    </div>
  )
}
export default GoodsPreview
