import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import GoodsPreview from '@/components/goodsPreview'
import MyNavBar from '../../components/myNavBar'
import qs from 'query-string'
import { SHBridge } from '@/jsbridge'
import emptyIcon from '@/assets/img/empty@3x.png'
import shareIcon from '@/assets/img/share_icon.png'
import { Image, Empty, Loading, Toast } from 'react-vant'
import { SpecialEventsApi } from '@/service/SpecialEvents'
import { generateUrl } from '@/utils'
import './index.less'

/**
 * 专题活动
 * url 必填项-------
 *    id :专题活动id
 */
const SpecialEventsPage: React.FC = () => {
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))
  const [specialGoodsList, setspecialGoodsList] = useState<any[]>([])
  const [specialDetail, setspecialDetail] = useState({
    activityDetailImg: '',
    activitySubtitle: '',
    activityImg: '',
    activityTitle: '',
    id: '',
  })
  useEffect(() => {
    //默认全屏效果
    SHBridge.setFullScreen('1')
  }, [])
  useEffect(() => {
    SpecialEventsApi.detail({
      id: id,
    })
      .then((res: any) => {
        const { code, msg, data } = res
        console.log('res :>> ', res)
        if (code === '200' && data) {
          const { activityDetailImg, goodsList, activityImg, activitySubtitle, activityTitle, id } = data
          setspecialDetail({
            activityDetailImg: activityDetailImg,
            activityImg: activityImg,
            activitySubtitle: activitySubtitle,
            activityTitle: activityTitle,
            id: id,
          })
          setspecialGoodsList(goodsList)
        } else {
          Toast(msg ? msg : '接口异常')
        }
      })
      .catch((err) => {
        Toast(err.msg)
        console.log('res :>> ', err)
      })
  }, [id])

  //右侧分享按钮点击
  const onClickHandelRight = () => {
    if (SHBridge.isLogin()) {
      SHBridge.shareActivity(specialDetail)
    } else {
      SHBridge.login()
      // Toast('还未登录，请登录后分享')
    }
  }
  //左侧回退按钮事件处理
  const onClickHandelLeft = () => {
    SHBridge.closePage()
  }
  //打开活动商品详情
  const openActivityGoodsDetail = (item) => {
    const { id, goodsPriceId } = item
    SHBridge.jump({
      url: generateUrl(`/goods-detail?id=${id}&goodsPriceId=${goodsPriceId}`),
      newWebView: true,
      replace: false,
      title: '商品详情',
    })
  }

  return (
    <div className="SpecialEvents-container">
      {/* <MyNavBar
        border={false}
        safeAreaInsetTop={true}
        leftArrow={true}
        onClickLeft={onClickHandelLeft}
        onClickRight={onClickHandelRight}
        rightText={<Icon name={shareIcon} size={24} />}
      /> */}
      <div className="specialevents-wrap">
        <div className="specialevents-header">
          <div className="specialevents-header-pic">
            <Image width="100%" height="100%" fit="cover" iconSize={0} src={specialDetail.activityDetailImg} />
          </div>
        </div>
        <div className="specialevents-content">
          <div className="specialevents-content-body">
            {specialGoodsList.length > 0 ? (
              <ul className="scb-ul">
                {specialGoodsList.map((item) => {
                  return (
                    <li
                      className="scb-ul-li"
                      key={item.goodsPriceId}
                      onClick={() => {
                        openActivityGoodsDetail(item)
                      }}
                    >
                      <GoodsPreview {...item} sales={item.shamSales} stock={item.shamLikes} />
                    </li>
                  )
                })}
              </ul>
            ) : (
              <Empty image={emptyIcon} description="暂无数据" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialEventsPage
