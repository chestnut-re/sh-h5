import React from 'react'
import { PageTemplate, PageTemplateKey } from '../../utils'
import BgImg from '../BgImg'
import Price from '../Privce'
import SubmitBtn from '../SubmitBtn'
import Title from '../Title'
import Label from '../Label'
import './index.less'

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
      <BgImg img={data?.TODO} />
      {/* 标题图 */}
      <Title title={title} templateKey={templateKey} />
      {/* 下单按钮图 */}
      <SubmitBtn templateKey={templateKey} img={data?.submitOrderImg} makeOrder={makeOrder} />
      {/* 标签图 */}
      <Label title={title} templateKey={templateKey} />
      {/* 价格图 */}
      <Price title={title} templateKey={templateKey} />
    </div>
  )
}

export default GoodsDetailTemplate
