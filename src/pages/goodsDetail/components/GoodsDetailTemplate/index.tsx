import React from 'react'
import { PageTemplate, PageTemplateKey } from '../../utils'
import BgImg from '../BgImg'
import Price from '../Privce'
import SubmitBtn from '../SubmitBtn'
import Title from '../Title'
import Label from '../Label'
import './index.less'
import GSwiper from '../GSwiper'

interface Props {
  templateKey: PageTemplateKey
  data: any
  title: string
  makeOrder: () => void
}

/**
 * 商品详情页模版
 */
const GoodsDetailTemplate: React.FC<Props> = ({ data, title, templateKey, makeOrder }) => {
  return (
    <div className="GoodsDetailTemplate__root">
      {/* 背景图片 */}
      <BgImg img={data?.backgroundImage} />
      {/* 标题图 */}
      <Title img={data?.detailTitleImage} templateKey={templateKey} />
      {/* 下单按钮图 */}
      <SubmitBtn templateKey={templateKey} img={data?.submitOrderImage} makeOrder={makeOrder} />
      {/* 标签图 */}
      <Label img={data?.goodsTypeTagImage} templateKey={templateKey} />
      {/* 价格图 */}
      <Price img={data?.priceImage} templateKey={templateKey} />
      {/* 轮播图 */}
      <GSwiper imgs={data?.contentImages} templateKey={templateKey} />
    </div>
  )
}

export default GoodsDetailTemplate
