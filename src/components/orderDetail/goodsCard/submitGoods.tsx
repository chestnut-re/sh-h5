import React, { useState, useEffect, FC } from 'react'
import { Image } from 'react-vant'
import './index.less'
/**
 * 商品预览卡片左图 右描述
 */
interface GoodsType {
  promotionalImageUrl?: string
  goodsName?: string
  startDate: string
  endDate: string
  adultNum: string
  childNum: string
  travelMode: number
  stock: number
}

const GoodsCard: FC<GoodsType> = (props) => {
  const { promotionalImageUrl, goodsName, startDate, endDate, travelMode, stock } = props

  return (
    <div className="goods-content">
      <div className="goods-l">
        <Image width="100%" height="100%" iconSize={0} fit="cover" src={promotionalImageUrl} />
      </div>
      <div className="goods-r">
        <div className="goods-rT_name rv-multi-ellipsis--l2">{goodsName}</div>
        {travelMode == 1 ? (
          <div className="goods-r-time">
            <div className="goods-rC_name goods-rS">
              {startDate} ~ {endDate} 出发
            </div>
            <div className="goods-inventory">库存：{stock}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default GoodsCard
