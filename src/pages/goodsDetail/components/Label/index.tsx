import React from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  img: string
  templateKey: PageTemplateKey
}

/**
 * 标 签
 */
<<<<<<< HEAD
const Label: React.FC<Props> = ({ templateKey, title }) => {
  return (
    <div className={`Label__root__${templateKey}`}>
      <img
        src={
          title &&
          `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999`
        }
      />
    </div>
  )
=======
const Label: React.FC<Props> = ({ templateKey, img }) => {
  return <div className={`Label__root Label__root__${templateKey}`}>{img && <img src={img} />}</div>
>>>>>>> 8d6a1e31f357cd43014080966b6d1503d94c0185
}

export default Label
