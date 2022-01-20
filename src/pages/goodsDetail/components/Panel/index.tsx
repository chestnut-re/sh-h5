import React, { useEffect, useRef, useState } from 'react'
import share from '@/assets/img/tinified/share.png'
import likes from '@/assets/img/tinified/likes.png'
import isLikes from '@/assets/img/tinified/isLike.png'
import ask from '@/assets/img/tinified/ask.png'
import up from '@/assets/img/tinified/up.png'
import down from '@/assets/img/tinified/down.png'
import { SHBridge } from '@/jsbridge'
import { GoodsDetailService } from '@/service/GoodsDetailService'
import { Toast } from 'react-vant'
import './index.less'
import { isMini } from '@/jsbridge/env'
import { getCookie } from '@/utils/cookie'
import { getUrlParams } from '@/utils'

interface Props {
  dataAll: any
  data: any
  isLike: number
  myLikes: string
  shares: string
  goodsPriceId: string
  shopId: string
  onShare: () => void
}

/**面板 */
const Panel: React.FC<Props> = ({ data, dataAll, isLike, myLikes, shares, goodsPriceId, shopId, onShare }) => {
  const [love, setLove] = useState(null) as any
  const [isWeapp, setIsWeapp] = useState(false)
  const [myLikesNum, setMyLikesNum] = useState(0) as any

  useEffect(() => {
    setLove(isLike == 1)
    isMini().then((res) => {
      if (res) {
        setIsWeapp(true)
      }
    })
    setMyLikesNum(myLikes)
  }, [isLike, myLikes])
  const giveThumbs = () => {
    if (SHBridge.isLogin()) {
      setMyLikesNum(love ? myLikesNum - 1 : myLikesNum + 1)
      setLove(!love)
      GoodsDetailService.thumbsUp({ goodsId: goodsPriceId, shopId: shopId, type: 1, state: love ? 0 : 1 }).then(
        (res) => {
          console.log('123', res)
        }
      )
    } else {
      SHBridge.login()
    }
  }
  const giveShare = () => {
    if (SHBridge.isLogin()) {
      const litterUrl = `${window.location.origin}${window.location.pathname}?id=${dataAll?.id}&goodsPriceId=${
        dataAll?.goodsPriceId
      }&userId=${getCookie('userId')}&isPurchase=${dataAll?.isPurchase}&isPurchaseAdd=${
        dataAll?.isPurchaseAdd
      }&source=3`
      SHBridge.shareDetail({
        type: 'goods',
        title: dataAll.goodsName,
        description: dataAll.goodsNickName,
        headUrl: dataAll.promotionalImageUrl,
        littleUrl: litterUrl,
      })
    } else {
      SHBridge.login()
    }
  }
  const giveAsk = () => {
    if (SHBridge.isLogin()) {
      SHBridge.toChat(dataAll.id)
    } else {
      SHBridge.login()
    }
  }
  return (
    <div className="Panel__root">
      <div className={'swiper-button-prev2'}>
        <img src={up} alt="" />
      </div>
      <div className={'swiper-button-next2'}>
        <img src={down} alt="" />
      </div>
      <div onClick={giveThumbs}>
        <img src={love ? isLikes : likes} alt="" />
        <p>{myLikesNum}</p>
      </div>
      {!isWeapp && (
        <div onClick={giveShare}>
          <img src={share} alt="" />
          <p>{shares}</p>
        </div>
      )}
      {!isWeapp && (
        <div onClick={giveAsk}>
          <img src={ask} alt="" />
          <p>咨询</p>
        </div>
      )}
    </div>
  )
}

export default Panel
