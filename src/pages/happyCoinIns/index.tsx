import React, { useState, useEffect, FC } from 'react'
import { SHBridge } from '@/jsbridge'
import './index.less'

/**
 * 乐豆说明
 */
const HappyCoinInsPage: FC = () => {
  SHBridge.setNavBgColor('#4dcfc5')
  SHBridge.setTitleColor('#ffffff')
  return (
    <div className="HappyCoin-container">
          <div className='happycoin-main'>
              <p>1.乐豆是奔赴山海平台的虚拟资产，可用于提现和下单时抵扣现金。兑换比例：1乐豆=1元。</p>
              <p>2.用户可以通过购买返利商品或推荐好友购买商品解锁乐豆，购买或推荐的越多，乐豆累计越高。</p>
              <p>3.提现只可提取可用的部分，提现申请审核通过后，会有相应的工作人员在1-3个工作日与您联系进行线下打款。</p>
              <p>4.如有问题，请联系专属业务员进行处理。</p>
          </div>
    </div>
  )
}

export default HappyCoinInsPage
