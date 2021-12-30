import MyNavBar from '@/components/myNavBar'
import { SHBridge } from '@/jsbridge'
import { GoodsDetailService } from '@/service/GoodsDetailService'
import { generateUrl, getUrlParams } from '@/utils'
import React, { useEffect, useRef, useState } from 'react'
import GoodsDetailTemplate from './components/GoodsDetailTemplate'
import Panel from './components/Panel'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller } from 'swiper'
import { Navigation, EffectFade, EffectCoverflow } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import './index.less'

// {"code":"200","msg":"成功","data":{"id":1473837487611928576,"goodsPriceId":1473837487616122880,"goodsName":"欧洲11国双日游","goodsNickName":"跑断腿","personCurrentPrice":1,"personCostPrice":1,"personMarkPrice":1,"childCurrentPrice":1,"childCostPrice":1,"childMarkPrice":1,"stock":99,"days":7,"goodsDetailStart":{"pageTemplate":"首尾页模板","backgroundImage":null,"backgroundImgs":["https://s1.ax1x.com/2021/12/10/o5hkUs.png"],"sellingTag":[],"submitOrderImg":null},"goodsDetailPage":[{"pageTemplate":"详情页1模板","detailTitle":"详情1","detailDesc":"详情1简介","backgroundImage":null,"backgroundImgs":["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999","https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091116%2Fzwk1xx25efgzwk1xx25efg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999"],"price":9999,"priceColour":"#000000","submitOrderImg":"提交订单图片url"}],"goodsDetailEnd":{"pageTemplate":"首尾页模板","backgroundImage":null,"backgroundImgs":["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999","https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091116%2Fzwk1xx25efgzwk1xx25efg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999"],"sellingTag":[],"currentPriceColour":"#fff","markPriceColour":"#999","currentPriceTextColour":null,"markPriceTextColour":null,"submitOrderImg":null}}}

/**
 * 商品详情页
 */
const GoodsDetailPage: React.FC = () => {
  const pageRef = useRef<any>({})
  const swipeRef = useRef<any>()
  const [total, setTotal] = useState<any>()
  const [current, setCurrent] = useState<any>()
  const [data, setData] = useState<any>({})
  const [controlledSwiper, setControlledSwiper] = useState<any>(null)

  useEffect(() => {
    const params = getUrlParams(window.location.href)
    pageRef.current.id = params['id']
    pageRef.current.goodsPriceId = params['goodsPriceId']
    //TODO: test
    pageRef.current.id = pageRef.current.id
    pageRef.current.goodsPriceId = pageRef.current.goodsPriceId
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

  return (
    <div className="GoodsDetailPage__root">
      <div className="tips">提示：此商品最多三单</div>
      {data?.goodsDetailStart && (
        <Swiper
          className="swiper"
          direction="vertical"
          effect={'fade'}
          // effect={'coverflow'}
          // grabCursor={true}
          // centeredSlides={true}
          // slidesPerView={'auto'}
          // coverflowEffect={{
          //   rotate: 50,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 1,
          //   slideShadows: true,
          // }}
          loop={false}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
          }}
          modules={[Controller, Navigation, EffectFade, EffectCoverflow]}
          controller={{ control: controlledSwiper }}
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
                  // templateKey={'null'}
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
              // templateKey={'null'}
              data={data.goodsDetailEnd}
              title={data.goodsName}
              makeOrder={_makeOrder}
            />
          </SwiperSlide>
        </Swiper>
      )}

      <Panel swipe={controlledSwiper} total={total} current={current} />
      <div className="nav">
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
      </div>
    </div>
  )
}

export default GoodsDetailPage
