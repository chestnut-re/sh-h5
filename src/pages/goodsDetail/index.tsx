import MyNavBar from '@/components/myNavBar'
import { SHBridge } from '@/jsbridge'
import { GoodsDetailService } from '@/service/GoodsDetailService'
import { generateUrl, getUrlParams } from '@/utils'
import React, { useEffect, useRef, useState } from 'react'
// import { Swiper } from 'react-vant'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

// import type { SwiperInstance } from 'react-vant';
import GoodsDetailTemplate from './components/GoodsDetailTemplate'
import Panel from './components/Panel'

import './index.less'

// {"code":"200","msg":"成功","data":{"id":1473837487611928576,"goodsPriceId":1473837487616122880,"goodsName":"欧洲11国双日游","goodsNickName":"跑断腿","personCurrentPrice":1,"personCostPrice":1,"personMarkPrice":1,"childCurrentPrice":1,"childCostPrice":1,"childMarkPrice":1,"stock":99,"days":7,"goodsDetailStart":{"pageTemplate":"首尾页模板","backgroundImage":null,"backgroundImgs":["https://s1.ax1x.com/2021/12/10/o5hkUs.png"],"sellingTag":[],"submitOrderImg":null},"goodsDetailPage":[{"pageTemplate":"详情页1模板","detailTitle":"详情1","detailDesc":"详情1简介","backgroundImage":null,"backgroundImgs":["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999","https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091116%2Fzwk1xx25efgzwk1xx25efg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999"],"price":9999,"priceColour":"#000000","submitOrderImg":"提交订单图片url"}],"goodsDetailEnd":{"pageTemplate":"首尾页模板","backgroundImage":null,"backgroundImgs":["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999","https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091116%2Fzwk1xx25efgzwk1xx25efg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999"],"sellingTag":[],"currentPriceColour":"#fff","markPriceColour":"#999","currentPriceTextColour":null,"markPriceTextColour":null,"submitOrderImg":null}}}

/**
 * 商品详情页
 */
const GoodsDetailPage: React.FC = () => {
  const pageRef = useRef<any>({})
  const swipeRef = useRef<any>({})
  const [total, setTotal] = useState<any>()
  const [current, setCurrent] = useState<any>()
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
      console.log(res.data)
      setData(res.data)
    })
  }, [])

  /**分享 */
  const _share = () => {
    // this.$refs.swiper.swipeNext()
  }

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

  console.log('data?.goodsDetailStart?.pageTemplateKey', data?.goodsDetailStart?.pageTemplateKey)
  console.log('data', data)

  return (
    <div className="GoodsDetailPage__root">
      {/* <Swiper
        ref={swipeRef}
        vertical
        loop={false}
        indicator={(total, current) => {
          setTotal(total)
          setCurrent(current)
          return <p></p>
        }}
      >
        封面
        <Swiper.Item>
          <GoodsDetailTemplate
            templateKey={data?.goodsDetailStart?.pageTemplateKey}
            data={data?.goodsDetailStart}
            title={data?.goodsName}
            makeOrder={_makeOrder}
          />
        </Swiper.Item>
        中间页
        {data.goodsDetailPage?.map((item, index) => {
          return (
            <Swiper.Item key={index}>
              <GoodsDetailTemplate
                templateKey={item.pageTemplateKey}
                data={item}
                title={data.goodsName}
                makeOrder={_makeOrder}
              />
            </Swiper.Item>
          )
        })}
        封底
        <Swiper.Item>
          <GoodsDetailTemplate
            templateKey={data?.goodsDetailEnd?.pageTemplateKey}
            data={data.goodsDetailEnd}
            title={data.goodsName}
            makeOrder={_makeOrder}
          />
        </Swiper.Item>
      </Swiper> */}
      {data && (
        <Swiper
          // ref={swipeRef}
          className="swiper"
          direction={'vertical'}
          // loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          // spaceBetween={0}
          // slidesPerView={'auto'}
        >
          <SwiperSlide>
            <GoodsDetailTemplate
              templateKey={data?.goodsDetailStart?.pageTemplateKey}
              data={data?.goodsDetailStart}
              title={data?.goodsName}
              makeOrder={_makeOrder}
            />
          </SwiperSlide>
          {data.goodsDetailPage?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <GoodsDetailTemplate
                  templateKey={item.pageTemplateKey}
                  data={item}
                  title={data.goodsName}
                  makeOrder={_makeOrder}
                />
              </SwiperSlide>
            )
          })}
          <SwiperSlide>
            <GoodsDetailTemplate
              templateKey={data?.goodsDetailEnd?.pageTemplateKey}
              data={data.goodsDetailEnd}
              title={data.goodsName}
              makeOrder={_makeOrder}
            />
          </SwiperSlide>
        </Swiper>
      )}

      <Panel swipe={swipeRef} total={total} current={current} />
      {/* <div className="nav">
        <MyNavBar
          fixed
          placeholder={false}
          zIndex={100}
          leftArrow
          rightText={
            <div className="ref-route" onClick={_toTravelRoute}>
              参考行程
            </div>
          }
        />
      </div> */}
    </div>
  )
}

export default GoodsDetailPage
