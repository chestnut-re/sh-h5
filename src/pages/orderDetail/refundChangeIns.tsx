import React, { useState, useEffect, useRef, FC } from 'react'
import storage from '@/utils/localstorage'
import { SHBridge } from '@/jsbridge'
import './refund.less'
/**
 * 退改说明
 */

const RefundChangeIns: FC = () => {
  const [backinfo, setBackinfo] = useState('')
  useEffect(() => {
    SHBridge.setTitle(`退改说明`)
    const backGet = storage.get('_refundcontent')
    setBackinfo(backGet ? backinfo : '<p>暂无退改说明</p>')
  }, [])
  return (
    <div className="RefundIns-container">
      <div dangerouslySetInnerHTML={{ __html: backinfo }} />
      {/* <div className='refundIns-container-header'>
                <div className='rch-title'>
                    保险说明
                </div>
                <div className='rch-content'>
                    <p>该商品不赠送保险，建议您自行购买出行保险，为您的旅行增加一份保障，家人添一份安心</p>
                </div>
            </div>
            <div className='refundIns-container-body'>
                <div className='rcb-title'>
                    取消政策
                </div>
                <div className='rcb-header'>
                【买家违约】订单生效后，因买家原因取消订单的，费用扣除标准如下：
                </div>
                <div className='rcb-content'>
                    <ul className='rcb-content-ul'>
                        <li className='rcb-content-li rv-hairline--top'>
                            <div className='rcb-content-li-left'>
                                行程开始前
                            </div>
                            <div className='rcb-content-li-right'>
                                违约金（占订单总费用）
                            </div>
                        </li>
                        <li className='rcb-content-li rv-hairline--top'>
                            <div className='rcb-content-li-left'>
                                7日以上
                            </div>
                            <div className='rcb-content-li-right'>
                                违约金（占订单总费用）
                            </div>
                        </li>
                        <li className='rcb-content-li rv-hairline--top'>
                            <div className='rcb-content-li-left'>
                                4-6日
                            </div>
                            <div className='rcb-content-li-right'>
                                违约金（占订单总费用）
                            </div>
                        </li>
                        <li className='rcb-content-li rv-hairline--top'>
                            <div className='rcb-content-li-left'>
                                1-3日
                            </div>
                            <div className='rcb-content-li-right'>
                                违约金（占订单总费用）
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='rcb-content-footer'>
                【卖家违约】订单生效后，因商家原因取消订单的，除全额退款外
                </div>
            </div> */}
    </div>
  )
}

export default RefundChangeIns
