import React, { useState, FC, useEffect } from 'react'
import QRCode from 'qrcode.react'
import { getUser } from '../../service/common'

import './index.less'

const GoodsQrPage: FC = () => {
  const [qrWith, setQrWidth] = useState(0)
  useEffect(() => {
    getUser()

    setQrWidth(document.querySelector('.card-qr-item')?.clientWidth || 0)
  }, [])
  return (
    <div className="Shops-container">
      <div className="card">
        <div className="card-title">
          微信扫一扫 <br />
          立即购买该商品
        </div>
        <div className="card-qr">
          <div className="card-qr-item">
            <QRCode
              id="qrCode"
              value="https://www.jianshu.com/u/992656e8a8a6"
              size={qrWith} // 二维码的大小
              fgColor="#000000" // 二维码的颜色
              style={{ margin: 'auto' }}
            />
          </div>
        </div>
        <div className="goods-desc">北京环球影城一日游（7大主题 +全聚德餐券）</div>
        <div className="goods-price">¥1999</div>
      </div>
    </div>
  )
}

export default GoodsQrPage
