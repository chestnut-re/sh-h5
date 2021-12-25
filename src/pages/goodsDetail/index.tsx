import { SHBridge } from '@/jsbridge'
import { GoodsDetailService } from '@/service/GoodsDetailService'
import { generateUrl, getUrlParams } from '@/utils'
import React, { useEffect, useRef, useState } from 'react'
import { Cell } from 'react-vant'

import './index.less'

/**
 * 商品详情页
 */
const GoodsDetailPage: React.FC = () => {
  const pageRef = useRef<any>({})
  const [data, setData] = useState<any>({})

  useEffect(() => {
    const params = getUrlParams(window.location.href)
    pageRef.current.id = params['id']
    pageRef.current.goodsPriceId = params['goodsPriceId']
    //TODO: test
    pageRef.current.id = '1473837487611928576'
    pageRef.current.goodsPriceId = '1473837487616122880'
    //end
    GoodsDetailService.get({ id: pageRef.current.id, goodsPriceId: pageRef.current.goodsPriceId }).then((res) => {
      console.log(res)
      setData(res.data)
    })
  }, [])

  /**分享 */
  const _share = () => {}

  /**下单 */
  const _makeOrder = () => {
    SHBridge.jump({
      url: generateUrl(`/submit-order?id=${pageRef.current.id}&goodsPriceId=${pageRef.current.goodsPriceId}`),
      newWebView: true,
      title: '下单',
    })
  }

  const _toTravelRoute = () => {
    SHBridge.jump({
      url: generateUrl(`/travel/route?id=${pageRef.current.id}&goodsPriceId=${pageRef.current.goodsPriceId}`),
      newWebView: true,
      title: '参考行程',
    })
  }

  return (
    <div className="GoodsDetailPage__root">
      商品详情页
      <Cell.Group title="--">
        <Cell title="参考行程" onClick={_toTravelRoute} />
        <Cell title="分享" onClick={_share} />

        {/* <img className="submit-img" src={data.goodsDetailPage?.submitOrderImg} onClick={_makeOrder} /> */}
        <div className="submit-img" onClick={_makeOrder}>
          立即下单
        </div>
      </Cell.Group>
    </div>
  )
}

export default GoodsDetailPage
