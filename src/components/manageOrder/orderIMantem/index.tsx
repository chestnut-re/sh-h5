import React, { useState, useEffect, FC } from 'react'
import dayjs from 'dayjs'
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
const themeVars = {
  '--rv-count-down-text-color': '#f57272',
  '--rv-count-down-font-size': '11px',
}

const COUNT_DOWN = 60 * 30 * 1000
const RMB_CON = 1000

interface ManageItemProps {
  orderItem: {
    state?: number
    orderUserName?: string
    goodsName?: string
    payAmount?: number
    orderTime?: string
    adultNum?: number
    childNum?: number
    goodsPic?: string
    promotionalImageUrl?: string
  }
}

const ManageItem: FC<ManageItemProps> = (props) => {
  const { orderItem } = props

  const [oitem, setOitem] = useState(orderItem)
  const [countdowntime, setCountdownTime] = useState<number>(COUNT_DOWN)
  const countdownTimeFinish = () => {
    setOitem((v) => {
      return {
        ...v,
        state: 2,
      }
    })
  }
  useEffect(() => {
    if (oitem.state === 1 && oitem.orderTime) {
      const restTime = (dayjs().unix() - dayjs(oitem.orderTime).unix()) * 1000
      setCountdownTime(COUNT_DOWN - restTime)
    }
  }, [])

  return (
    <div className="maorder-item">
      <ConfigProvider themeVars={themeVars}>
        <div className="maorder-item-header">
          <div className={`maorder-item-header-left ${ManageStatusMap[oitem.state ?? '']?.['cName']}`}>
            {ManageStatusMap[oitem.state ?? '']?.['text']}
          </div>

          {oitem.state === 1 && (
            <div className="maorder-item-header-right">
              <CountDown time={countdowntime} format="剩 mm:ss" />
            </div>
          )}
        </div>
      </ConfigProvider>
      <div className="maorder-item-content">
        <div className="maorder-item-content-left">
          <Image width="100%" height="100%" fit="cover" src={oitem.promotionalImageUrl} />
        </div>
        <div className="maorder-item-content-right">
          <div className="micr-name rv-ellipsis">{oitem.goodsName}</div>
          <div className="micr-tags">
            {oitem.adultNum ? <span>成人x{oitem.adultNum}</span> : null}
            {oitem.childNum ? <span>儿童x{oitem.childNum}</span> : null}
          </div>
          {oitem?.payAmount && (
            <div className="micr-price">
              {oitem.state == 5 || oitem.state == 6 || oitem.state == 7 ? (
                <span className="micr-price-text">退款金额</span>
              ) : null}
              ¥{oitem?.payAmount / RMB_CON}
            </div>
          )}
        </div>
      </div>

      {/* {oitem.state==5?(<div className='maorder-item-footer'>
            <ul className='maorder-item-footer-ul'>
              <li className='mifu-item'>
                  <div className='mifu-item-left'>成人x2</div>
                  <div className='mifu-item-right'>退款成功</div>
              </li>
              <li className='mifu-item'>
                  <div className='mifu-item-left'>儿童x1</div>
                  <div className='mifu-item-right mifu-ing'>退款中</div>
              </li>
            </ul>
        </div>):null} */}
    </div>
  )
}
export default ManageItem
