import React, { useState, FC, useEffect } from 'react'
import QRCode from 'qrcode.react'
// import { getUser } from '../../service/common'
import { SHBridge } from '@/jsbridge'
import './index.less'

const ShopsQrPage: FC = () => {
  const [qrWith, setQrWidth] = useState(0)
  const [imgSrc, setImgSrc] = useState('')
  useEffect(() => {
    setQrWidth(document.querySelector('.card-qr-item')?.clientWidth || 0)
    setImgSrc('https://lupic.cdn.bcebos.com/20210629/17728433_14.jpg')
  }, [])
  return (
    <div className="Shops-container">
      <div className="card">
        <div className="card-title">
          微信扫一扫 <br />
          进入商铺选购商品
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
        <div className="card-feed">
          <img src={imgSrc} />
          <div>赵照的商铺赵照的商铺</div>
        </div>
        <div className="card-desc">店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介店铺简介</div>
      </div>
    </div>
  )
}

export default ShopsQrPage
