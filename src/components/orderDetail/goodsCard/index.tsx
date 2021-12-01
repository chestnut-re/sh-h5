import { common } from '@/service'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import wecharIcon from '@/assets/img/wechar_icon@3x.png'
import './index.less'
/**
 * 商品预览卡片左图 右描述
 */

const ContactCard = observer((props) => {

  return (
    <div className="goods-content">
                  <div className="goods-l">
                    <img src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00264-2075.jpg" />
                  </div>
                  <div className="goods-r">
                      <div className="goods-rT_name rv-multi-ellipsis--l2">
                        三亚5日自由行(5钻)·直减300『高星4晚 连住』
                      </div>
                      <div className="goods-rC_name goods-rS">
                        10/22 周五出发 10/26 周二返程
                      </div>
                      <div className="goods-rB_name goods-rS">
                        <span>成人X2</span>
                        <span>儿童X2</span>
                      </div>
                  </div>
              </div>
  )
})

export default ContactCard
