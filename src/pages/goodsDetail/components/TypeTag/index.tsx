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
  return (
    <div className={`TypeTag__root TypeTag__root__${templateKey}`}>
      {img && (
        <div className="img-wrapper">
          <img className="img" src={img} />
        </div>
      )}
    </div>
  )
}

export default TypeTag
