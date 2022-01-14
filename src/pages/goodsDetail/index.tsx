import { SHBridge } from '@/jsbridge'
import { GoodsDetailService } from '@/service/GoodsDetailService'
import { generateUrl, getUrlParams } from '@/utils'
import React, { useEffect, useRef, useState } from 'react'
import GoodsDetailTemplate from './components/GoodsDetailTemplate'
import Panel from './components/Panel'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller } from 'swiper'
import { Navigation, EffectFade, EffectCoverflow } from 'swiper'
import ShareView from './components/shareView'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import './index.less'
import Cookies from 'js-cookie'

// {"code":"200","msg":"成功","data":{"id":1473837487611928576,"goodsPriceId":1473837487616122880,"goodsName":"欧洲11国双日游","goodsNickName":"跑断腿","personCurrentPrice":1,"personCostPrice":1,"personMarkPrice":1,"childCurrentPrice":1,"childCostPrice":1,"childMarkPrice":1,"stock":99,"days":7,"goodsDetailStart":{"pageTemplate":"首尾页模板","backgroundImage":null,"backgroundImgs":["https://s1.ax1x.com/2021/12/10/o5hkUs.png"],"sellingTag":[],"submitOrderImg":null},"goodsDetailPage":[{"pageTemplate":"详情页1模板","detailTitle":"详情1","detailDesc":"详情1简介","backgroundImage":null,"backgroundImgs":["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999","https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091116%2Fzwk1xx25efgzwk1xx25efg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999"],"price":9999,"priceColour":"#000000","submitOrderImg":"提交订单图片url"}],"goodsDetailEnd":{"pageTemplate":"首尾页模板","backgroundImage":null,"backgroundImgs":["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999","https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091116%2Fzwk1xx25efgzwk1xx25efg.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999"],"sellingTag":[],"currentPriceColour":"#fff","markPriceColour":"#999","currentPriceTextColour":null,"markPriceTextColour":null,"submitOrderImg":null}}}

/**
 * 商品详情页
 */
const GoodsDetailPage: React.FC = () => {
  const pageRef = useRef<any>({})
  const [data, setData] = useState<any>({})
  const [controlledSwiper, setControlledSwiper] = useState<any>(null)
  const [shareVisible, setShareVisible] = useState(false)

  const appSource = Cookies.get('app_source')

  useEffect(() => {
    const params = getUrlParams(window.location.href)
    pageRef.current.id = params['id']
    pageRef.current.shopId = params['shopId']
    pageRef.current.goodsPriceId = params['goodsPriceId']
    GoodsDetailService.get({ id: pageRef.current.id, goodsPriceId: pageRef.current.goodsPriceId }).then((res) => {
      console.log(res.data)
      setData(res.data)
    })

    if (SHBridge.isLogin()) {
      GoodsDetailService.viewGood({ goodsId: pageRef.current.id, shopId: pageRef.current.shopId }).then((res) => {
        console.log(res.data)
      })

      // 如果是分享人，完成分享任务
      // url 中有 taskId，表示是分享的链接，如果用户
      pageRef.current.taskId = params['taskId']
      if (pageRef.current.taskId) {
        GoodsDetailService.unLockBean({ taskId: pageRef.current.taskId })
      }
      //
    }
  }, [])

  /**分享 */
  const _share = () => {
    // setShareVisible(!shareVisible)
    // this.$refs.swiper.swipeNext()
  }

  /**下单 */
  const _makeOrder = () => {
    SHBridge.jump({
      url: generateUrl(`/submit-order?id=${pageRef.current.id}&goodsPriceId=${pageRef.current.goodsPriceId}`),
      newWebView: true,
      title: '下单',
      needLogin: true,
    })
  }

  const _toTravelRoute = () => {
    SHBridge.jump({
      url: generateUrl(`/travel/route?id=${pageRef.current.id}&goodsPriceId=${pageRef.current.goodsPriceId}`),
      newWebView: true,
      title: '参考行程',
    })
  }

  const _toDescRoute = () => {
    SHBridge.jump({
      url: generateUrl(`/goods-desc`),
      newWebView: true,
      title: '商品活动内容',
    })
  }

  return (
    <div className="GoodsDetailPage__root">
      {/* <div className="tips">提示：此商品最多三单</div> */}
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

      <Panel
        dataAll={data}
        data={data?.goodsDetailPage}
        isLike={data?.isLike}
        myLikes={data?.shamLikes}
        shares={data?.shamShares}
        goodsPriceId={pageRef.current.id}
        shopId={pageRef.current.shopId}
        onShare={_share}
      />
      <div className="nav">
        {/* <MyNavBar
          fixed
          placeholder={false}
          zIndex={100}
          leftArrow
          rightText={
            <div className="ref-route" onClick={_toTravelRoute}>
              参考行程
            </div>
          }
        /> */}

        <div className="ref-route1" onClick={_toTravelRoute}>
          参考行程
        </div>
        {appSource == 'biz' && (data.isPurchase == 1 || data.isRebate == 1) ? (
          <div className="ref-route1" onClick={_toDescRoute}>
            {data.isPurchase == 1 ? <span>限购</span> : null}
            {data.isPurchase == 1 && data.isRebate == 1 ? '｜' : ''}
            {data.isRebate == 1 ? <span>下单赢乐豆</span> : null}
          </div>
        ) : null}
      </div>
      <ShareView
        onClose={() => {
          setShareVisible(false)
        }}
        visible={shareVisible}
      />
    </div>
  )
}

export default GoodsDetailPage
