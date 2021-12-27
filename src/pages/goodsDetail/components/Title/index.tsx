import React from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  title: string
  templateKey: PageTemplateKey
}

/**
 * 标题
 */
const Title: React.FC<Props> = ({ templateKey, title }) => {
  return <div className={`Title__root__${templateKey}`}>{title}</div>
}

export default Title
