import React, { useState, useEffect, FC } from 'react'
import { Image } from 'react-vant'
import './index.less'
/**
 * 商品预览卡片左图 右描述
 */
interface GoodsType {
  promotionalImageUrl?: string
  goodsName?: string
}

const GoodsCard: FC<GoodsType> = (props) => {
  const [goodinfo, setGoodinfo] = useState<GoodsType>()

  useEffect(() => {
    setGoodinfo(props)
    console.log('props :>> ', props)
  }, [props])
  return (
    <div className="goods-content">
      <div className="goods-l">
        <Image width="100%" height="100%" fit="cover" src={goodinfo?.promotionalImageUrl} />
      </div>
      <div className="goods-r">
        <div className="goods-rT_name rv-multi-ellipsis--l2">{goodinfo?.goodsName}</div>
        <div className="goods-rC_name goods-rS">10/22 周五出发 10/26 周二返程</div>
        <div className="goods-rB_name goods-rS">
          <span>成人X2</span>
          <span>儿童X2</span>
        </div>
      </div>
    </div>
  )
}

export default GoodsCard
