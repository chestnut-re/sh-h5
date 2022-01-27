import React, { useState, useEffect, FC } from 'react'
import { Image, CountDown, ConfigProvider } from 'react-vant'
import './index.less'
/**
 * 订单管理详情
 * 包含 订单号 订单状态 购买用户 下单时间 商品名称 价格
 */

const MaStatusMap = {
  1: { text: '待付款', bgName: 'BGdaifk', cName: 'CF57272', type: 1 },
  2: { text: '已失效', bgName: 'BGyisx', cName: 'C999999', type: 2 },
  3: { text: '待核销', bgName: 'BGdaiqr', cName: 'C7193f4', type: 3 },
  4: { text: '已完成', bgName: 'BGyiwc', cName: 'C666666', type: 4 },
  5: { text: '退款中', bgName: 'BGtuikz', cName: 'CF5B572', type: 5 },
  6: { text: '已退款', bgName: 'BGyitk', cName: 'C666666', type: 6 },
  7: { text: '退款失败', bgName: 'BGyitk', cName: 'C999999', type: 7 },
  '': { text: '未知', bgName: 'BGyisx', cName: '', type: '' },
}
const themeVars = {
  '--rv-count-down-text-color': '#f57272',
}
interface ManageProps {
  state?: number
  orderNo?: string
  orderUserName?: string
  orderTime?: string
  goodsName?: string
  payAmount?: number
  promotionalImageUrl?: string
  payTime?: string
  countDownTimes?: string
}
// const RMB_CON = 1000
import { RMB_CON } from '@/utils/currency'
const ManageDetailItem: FC<ManageProps> = ({
  goodsName,
  payAmount,
  orderUserName,
  orderTime,
  orderNo,
  state,
  promotionalImageUrl,
  payTime,
  countDownTimes,
}) => {
  const [statecopy, setStatecopy] = useState(state)
  useEffect(() => {
    setStatecopy(state)
  }, [state])

  return (
    <div className="mdetail-item">
      <div className="mdetail-item-goods">
        <div className="mig-left">
          <Image width="100%" height="100%" iconSize={0} fit="cover" src={promotionalImageUrl} />
        </div>
        <div className="mig-right">
          <div className="mig-name rv-multi-ellipsis--l2">{goodsName}</div>
          {payAmount ? (
            <div className="mig-pro">
              付款<span className="mig-pro-icon">¥</span>
              <span>{RMB_CON(payAmount)}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="detail-box">
        <ul className="detail-listUl">
          <li className="detail-listLi">
            <div className="listLi-left">购买用户</div>
            <div className="listLi-right">{orderUserName}</div>
            <div className="maorder-countdown">
              <ConfigProvider themeVars={themeVars}>
                {statecopy === 1 && countDownTimes ? (
                  <div>
                    <CountDown
                      time={countDownTimes}
                      onFinish={() => {
                        setStatecopy(2)
                      }}
                      format="剩 mm:ss"
                    />
                  </div>
                ) : null}
              </ConfigProvider>
            </div>
          </li>
          <li className="detail-listLi">
            <div className="listLi-left">下单时间</div>
            <div className="listLi-right">{orderTime}</div>
          </li>
          <li className="detail-listLi">
            <div className="listLi-left">订单编号</div>
            <div className="listLi-right">{orderNo}</div>
          </li>
          {payTime && (
            <li className="detail-listLi">
              <div className="listLi-left">支付时间</div>
              <div className="listLi-right">{payTime}</div>
            </li>
          )}
        </ul>
      </div>
      {statecopy && statecopy >= 0 ? (
        <div className={`detail-status ${MaStatusMap[statecopy]?.bgName}`}>
          <div className={`status-text ${MaStatusMap[statecopy]?.cName}`}>
            <h1>{MaStatusMap[statecopy]?.text}</h1>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ManageDetailItem
