import React from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  img: string
  templateKey: PageTemplateKey
}

/**
 * 标题
 */
const Title: React.FC<Props> = ({ templateKey, img }) => {
  return <div className={`Title__root Title__root__${templateKey}`}>{img && <img src={img} />}</div>
}

export default Title
