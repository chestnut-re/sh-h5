import React from 'react'
import share from '@/assets/img/tinified/share.png'
import likes from '@/assets/img/tinified/likes.png'
import ask from '@/assets/img/tinified/ask.png'
import up from '@/assets/img/tinified/up.png'
import down from '@/assets/img/tinified/down.png'
import './index.less'

/**面板 */
const Panel: React.FC = () => {
  return (
    <div className="Panel__root">
      <div>
        <img src={up} alt="" />
      </div>
      <div>
        <img src={down} alt="" />
      </div>
      <div>
        <img src={likes} alt="" />
        <p>196</p>
      </div>
      <div>
        <img src={share} alt="" />
        <p>188</p>
      </div>
      <div>
        <img src={ask} alt="" />
        <p>咨询</p>
      </div>
    </div>
  )
}

export default Panel
