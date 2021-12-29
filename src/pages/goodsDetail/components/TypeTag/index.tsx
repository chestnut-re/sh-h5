import React from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  img: string
  templateKey: PageTemplateKey
}

/**
 * 商品类型
 */
const TypeTag: React.FC<Props> = ({ templateKey, img }) => {
  return <div className={`TypeTag__root TypeTag__root__${templateKey}`}>{img && <img src={img} />}</div>
}

export default TypeTag
