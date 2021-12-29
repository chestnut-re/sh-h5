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
  return (
    <div className={`Title__root Title__root__${templateKey}`}>
      <img
        src={
          title &&
          `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999`
        }
      />
    </div>
  )
}

export default Title
