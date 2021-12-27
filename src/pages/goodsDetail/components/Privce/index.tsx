import React from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  title: string
  templateKey: PageTemplateKey
}

/**
 * 价格
 */
const Price: React.FC<Props> = ({ title, templateKey }) => {
  return <div className={`Price__root__${templateKey}`}>{title}</div>
}

export default Price
