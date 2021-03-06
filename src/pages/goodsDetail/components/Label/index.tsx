import React from 'react'
import { PageTemplateKey } from '../../utils'
import pic from '@/assets/img/sss.png'
import './index.less'

interface Props {
  img: string
  templateKey: PageTemplateKey
}

/**
 * 标 签
 */
const Label: React.FC<Props> = ({ templateKey, img }) => {
  return (
    <div className={`Label__root Label__root__${templateKey}`}>
      {img && (
        <div className="img-wrapper">
          <img className="img" src={img} />
        </div>
      )}
    </div>
  )
}

export default Label
