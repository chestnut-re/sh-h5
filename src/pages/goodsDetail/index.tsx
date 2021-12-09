import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import React from 'react'
import { Button, Cell } from 'react-vant'

import './index.less'

/**
 * 商品详情页
 */
const GoodsDetailPage: React.FC = () => {
  /**分享 */
  const _share = () => {}

  /**下单 */
  const _makeOrder = () => {
    SHBridge.jump({ url: generateUrl('/puorder'), newWebView: true })
  }

  return (
    <div className="GoodsDetailPage__root">
      商品详情页
      <Cell.Group title="--">
        <Cell title="分享" onClick={_share} />
        <Cell title="下单" onClick={_makeOrder} />
      </Cell.Group>
    </div>
  )
}

export default GoodsDetailPage
