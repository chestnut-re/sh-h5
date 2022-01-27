import React, { useState, useEffect, FC } from 'react'
import { RMB_CON } from '@/utils/currency'
import { Image, CountDown, ConfigProvider } from 'react-vant'
import './index.less'
/**
 * 订单管理单条列表页
 * 全部 待付款 待核销 已完成 退款_售后
 */
const ManageStatusMap = {
  1: { text: '待付款', cName: 'CF57272' },
  2: { text: '已失效', cName: 'C999999' },
  3: { text: '待核销', cName: 'C7193f4' },
  4: { text: '已完成', cName: 'C666666' },
  5: { text: '退款中', cName: 'CF5B572' },
  6: { text: '退款成功', cName: 'C666666' },
  7: { text: '退款失败', cName: 'C999999' },
  '': { text: '未知', cName: 'C999999' },
}
const ManageRefundMap = {
  1: { text: '退款中', cName: 'CF5B572' },
  2: { text: '退款成功', cName: 'C666666' },
  3: { text: '退款失败', cName: 'CF57272' },
  5: { text: '已取消', cName: 'C999999' },
  '': { text: '未知', cName: 'C999999' },
}
const themeVars = {
  '--rv-count-down-text-color': '#f57272',
  '--rv-count-down-font-size': '11px',
}

interface ManageItemProps {
  id?: string
  state?: number
  orderUserName?: string
  goodsName?: string
  payAmount?: number
  orderTime?: string
  adultNum?: number
  childNum?: number
  promotionalImageUrl?: string
  refundState?: number | string
  refundResDTOList: any[]
  changeViewDetails: (val) => void
  countDownTimes?: number
}

const ManageItem: FC<ManageItemProps> = ({
  id,
  state,
  promotionalImageUrl,
  goodsName,
  adultNum,
  childNum,
  payAmount,
  refundState,
  countDownTimes,
  changeViewDetails,
}) => {
  const [statecopy, setStatecopy] = useState<number>(state)

  useEffect(() => {
    setStatecopy(state)
  }, [state])

  return (
    <div className="maorder-item">
      <ConfigProvider themeVars={themeVars}>
        <div className="maorder-item-header">
          {refundState ? (
            <div className={`maorder-item-header-left ${ManageRefundMap[refundState ?? '']?.['cName']}`}>
              {ManageRefundMap[refundState ?? '']?.['text']}
            </div>
          ) : (
            <div className={`maorder-item-header-left ${ManageStatusMap[statecopy ?? '']?.['cName']}`}>
              {ManageStatusMap[statecopy ?? '']?.['text']}
            </div>
          )}

          {statecopy === 1 && countDownTimes && (
            <div className="maorder-item-header-right">
              <CountDown
                time={countDownTimes}
                format="剩 mm:ss"
                onFinish={() => {
                  setStatecopy(2)
                }}
              />
            </div>
          )}
        </div>
      </ConfigProvider>
      <div
        className="maorder-item-content"
        onClick={() => {
          changeViewDetails({ id }, 1)
        }}
      >
        <div className="maorder-item-content-left">
          <Image width="100%" height="100%" iconSize={0} fit="cover" src={promotionalImageUrl} />
        </div>
        <div className="maorder-item-content-right">
          <div className="micr-name rv-ellipsis">{goodsName}</div>
          <div className="micr-tags">
            {adultNum ? <span>成人x{adultNum}</span> : null}
            {childNum ? <span>儿童x{childNum}</span> : null}
          </div>
          <div className="micr-price">
            {/* {refundState == 1 || refundState == 2 || refundState == 3 ? (
              <>
                {' '}
                <span className="micr-price-text">退款金额</span>¥{RMB_CON(totalRefundAmount)}
              </>
            ) : (
              <>¥{RMB_CON(payAmount)}</>
            )} */}
            ¥{RMB_CON(payAmount)}
          </div>
        </div>
      </div>

      {/* {refundResDTOList ? (
        <div className="maorder-item-footer">
          <ul className="maorder-item-footer-ul">
            {refundResDTOList.map(({ adultNum, childNum, id, refundState }, index) => {
              return (
                <li
                  className="mifu-item"
                  key={index}
                  onClick={() => {
                    changeViewDetails({ id }, 2)
                  }}
                >
                  <div className="mifu-item-left">
                    {adultNum > 0 ? <span>成人x{adultNum}</span> : null}
                    {childNum ? <span>儿童x{childNum}</span> : null}
                  </div>
                  <div className={`mifu-item-right ${ManageRefundMap[refundState ?? '']?.['cName']}`}>
                    {ManageRefundMap[refundState ?? '']?.text}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null} */}
    </div>
  )
}
export default ManageItem
