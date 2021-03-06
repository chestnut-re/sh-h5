import React, { useState, useEffect, FC } from 'react'
import { Icon } from 'react-vant'
import completeIcon from '@/assets/img/complete_icon.png'
import failureIcon from '@/assets/img/failure_icon.png'
import processingIcon from '@/assets/img/processing_icon.png'
import { RMB_CON } from '@/utils/currency'
import './index.less'
import dayjs from 'dayjs'
/**
 * 退款进度卡片
 */

const refundStatus = [
  {
    iconName: processingIcon,
    descTitle: '退款处理中',
    descContent: '为您处理中，请稍等',
    cName: 'proceing',
    type: 1,
  },
  {
    iconName: completeIcon,
    descTitle: '退款已通过，等待业务员联系您！',
    descContent: 'xxxx xx xx',
    cName: 'complete',
    type: 2,
  },
  {
    iconName: failureIcon,
    descTitle: '退款失败',
    descContent: 'xxxx xx xx',
    cName: 'failure',
    type: 3,
  },
  {
    iconName: completeIcon,
    descTitle: '已取消',
    descContent: 'xxxx xx xx',
    cName: 'complete',
    type: 5,
  },
]

interface RefundProcessType {
  refundState: string | number
  applyTime: string
  amount: number
  tokenAmount: number
}

const RefundProcessCard: FC<RefundProcessType> = ({ refundState, applyTime, amount, tokenAmount }) => {
  const [refinfo, setRefinfo] = useState<any>({})

  useEffect(() => {
    const refundStateItem = refundStatus.find((item) => {
      return item.type == refundState
    })
    setRefinfo(refundStateItem)
  }, [refundState])

  return (
    <div className="refuaproce-card">
      <div className={`refuaproce-name ${refinfo.cName}`}>
        <Icon name={refinfo.iconName} className="icon-btn" size="4.8vw" color="#1989fa" />
        <span className="refuaproce-text">{refinfo.descTitle}</span>
      </div>
      <div className="refuaproce-r">
        {refundState == 1 ? refinfo.descContent : dayjs(applyTime).format('YYYY-MM-DD hh:mm:ss')}
      </div>
      {refinfo.type != 1 && (
        <div className="refuaproce-binfo rv-hairline--top">
          {refinfo.type == 3 && <div className="refuaproce-fail">申请理由不符合退款标准</div>}
          {refinfo.type == 2 && (
            <div className="refuaproce-success">
              <ul className="refuaproce-sul">
                <li className="refuaproce-li">
                  <div className="refuaproce-liTop">
                    <div className="refuaproce-liL">
                      <div>退款总金额</div>
                    </div>
                    <div className="refuaproce-liR">
                      ¥ <span>{RMB_CON(amount)}</span>
                    </div>
                  </div>
                  <div className="refuaproce-liBop">
                    <div className="refuaproce-titleliL">
                      <div>退回乐豆</div>
                    </div>
                    <div className="refuaproce-titleliR">
                      <span>{RMB_CON(tokenAmount)}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RefundProcessCard
