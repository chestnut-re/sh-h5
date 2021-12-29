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
    <div className={`SubmitBtn__root SubmitBtn__root__${templateKey}`}>
      {img && <img className="btn-img" src={img} onClick={makeOrder} />}
    </div>
  )
}

export default SubmitBtn
