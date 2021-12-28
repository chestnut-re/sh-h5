import React from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  makeOrder: () => void
  img: string
  templateKey: PageTemplateKey
}

/**
 * 立即下单按钮
 */
const SubmitBtn: React.FC<Props> = ({ templateKey, makeOrder, img }) => {
  return (
    <div className={`SubmitBtn__root__${templateKey}`} onClick={() => makeOrder}>
      <img
        className="btn-img"
        // src={img}
        src={`https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999`}
        onClick={makeOrder}
      />
    </div>
  )
}

export default SubmitBtn
