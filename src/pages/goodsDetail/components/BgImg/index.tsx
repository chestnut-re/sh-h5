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
      <img
        src={
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-091106%2F1eqn3t2og0k1eqn3t2og0k.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999'
        }
      />
    </div>
  )
}

export default BgImg
