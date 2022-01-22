import React from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  img: string
  templateKey: PageTemplateKey
}

/**
 * 价格
 */
const Price: React.FC<Props> = ({ img, templateKey }) => {
  return (
    <div className={`Price__root Price__root__${templateKey}`}>
      {img && (
        <div className="img-wrapper">
          <img className="img" src={img} />
        </div>
      )}
    </div>
  )
}

export default Price
