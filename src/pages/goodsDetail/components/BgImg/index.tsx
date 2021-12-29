import React from 'react'
import './index.less'

interface Props {
  img: string
}

/**
 * 背景图片
 */
const BgImg: React.FC<Props> = ({ img }) => {
  return (
    <div className="BgImg__root">
      <img src={img} />
    </div>
  )
}

export default BgImg
