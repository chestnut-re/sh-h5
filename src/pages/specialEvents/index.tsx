import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { getUrlParams } from '@/utils'
import GoodsPreview from '@/components/goodsPreview'
import MyNavBar from '../../components/myNavBar'
import qs from 'query-string'
import { SHBridge } from '@/jsbridge'
import emptyIcon from '@/assets/img/empty@3x.png'
import shareIcon from '@/assets/img/share_icon.png'
import { Image, Empty, Icon } from 'react-vant'
import './index.less'

/**
 * 专题活动
 */

const Goodslist = [
  {
    goodsName: '三亚5日跟团游「星4晚连 住」',
    goodsNickName: '',
    goodsPriceId: '1231992',
    personCurrentPrice: 599,
    promotionalImageUrl: 'http://placeimg.com/640/480/city',
    sales: '120',
    stock: '90',
  },
  {
    goodsName: '三亚5日跟团游「星4晚连 住」',
    goodsNickName: '',
    goodsPriceId: '1232312',
    personCurrentPrice: 599,
    promotionalImageUrl: 'http://placeimg.com/640/480/nature?t=1',
    sales: '120',
    stock: '90',
  },
  {
    goodsName: '三亚5日跟团游「星4晚连 住」三亚5日跟团游「星4晚连 住三亚5日跟团游「星4晚连 住',
    goodsNickName: '',
    goodsPriceId: '1267312',
    personCurrentPrice: 599,
    promotionalImageUrl: 'http://placeimg.com/640/480/nature?t=3',
    sales: '120',
    stock: '90',
  },
  {
    goodsName: '三亚5日跟团游「星4晚连 住」',
    goodsNickName: '',
    goodsPriceId: '1267367712',
    personCurrentPrice: 599,
    promotionalImageUrl: 'http://placeimg.com/640/480/nature?t=3',
    sales: '120',
    stock: '90',
  },{
    goodsName: '三亚5日跟团游「星4晚连 住」',
    goodsNickName: '',
    goodsPriceId: '1267368900',
    personCurrentPrice: 599,
    promotionalImageUrl: 'http://placeimg.com/640/480/nature?t=3',
    sales: '120',
    stock: '90',
  },
]

const SpecialEventsPage: React.FC = () => {

  useEffect(() => {
    //默认全屏效果
    SHBridge.setFullScreen('1')
  }, [])

  //右侧分享按钮点击
  const onClickHandelRight = () => {
    alert('点击了分享')
  }
  //左侧回退按钮事件处理
  const onClickHandelLeft = ()=>{
    SHBridge.closePage()
  }

  return (
    <div className="SpecialEvents-container">
      <MyNavBar
        border={false}
        safeAreaInsetTop={true}
        leftArrow={true}
        onClickLeft = {onClickHandelLeft}
        onClickRight={onClickHandelRight}
        rightText={<Icon name={shareIcon} size={24} />}
      />
      <div className="specialevents-wrap">
        <div className="specialevents-header">
          <div className="specialevents-header-pic">
            <Image width="100%" height="100%" fit="cover" src="http://placeimg.com/640/480/nature" />
          </div>
        </div>
        <div className="specialevents-content">
          <div className="specialevents-content-body">
            {Goodslist.length > 0 ? (
              <ul className="scb-ul">
                {Goodslist.map((item) => {
                  return (
                    <li className="scb-ul-li" key={item.goodsPriceId}>
                      <GoodsPreview {...item} />
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
