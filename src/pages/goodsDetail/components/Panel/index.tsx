import React, { useRef, useState } from 'react'
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

interface Props {
  data: any
  isLike: string
  myLikes: string
  shares: string
  goodsPriceId: string
  shopId: string,
  onShare: () => void
}

/**面板 */
const Panel: React.FC<Props> = ({ data, isLike, myLikes, shares, goodsPriceId, shopId, onShare }) => {
  const [love, setLove] = useState(isLike ? true : false)
  const giveThumbs = () => {
    setLove(!love)
    if (SHBridge.isLogin()) {
      GoodsDetailService.thumbsUp({ goodsId: goodsPriceId, shopId: shopId, type: 1, state: love ? 0 : 1 }).then(
        (res) => {
          console.log(res.data)
        }
      )
    } else {
      SHBridge.login()
    }
  }
  const giveShare = () => {
    onShare()
    if (SHBridge.isLogin()) {
      SHBridge.shareDetail(data)
    } else {
      Toast('还未登陆，请登陆后分享')
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
        <p>{myLikes}</p>
      </div>
      <div onClick={giveShare}>
        <img src={share} alt="" />
        <p>{shares}</p>
      </div>
      <div>
        <img src={ask} alt="" />
        <p>咨询</p>
      </div>
    </div>
  )
}

export default Panel
