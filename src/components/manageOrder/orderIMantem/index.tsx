import React, { useState, useEffect, FC } from 'react'
import dayjs from 'dayjs'
import { Image, Flex, CountDown, ConfigProvider, Icon, Tag } from 'react-vant'
import arrowRight from '@/assets/img/arrow@3x.png'
import './index.less'
/**
 * 订单管理单条列表页
 * 全部 待付款 待确认 已完成 退款_售后
 */
const ManageStatusMap = {
  1: { text: '待付款', cName: 'CF15E5E' },
  2: { text: '已失效', cName: 'C999999' },
  3: { text: '待确认', cName: 'C3AD2C5' },
  4: { text: '已完成', cName: 'C3AD2C5' },
  5: { text: '退款中', cName: 'CF48B43' },
  6: { text: '已退款', cName: 'C999999' },
  7: { text: '退款失败', cName: 'C999999' },
  '': { text: '未知', cName: 'C999999' },
}
const themeVars = {
  '--rv-count-down-text-color': '#f15e5e',
  '--rv-count-down-font-size': '11px',
}

const COUNT_DOWN = 60 * 30 * 1000

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
    orderUserAvatar?: string
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
      let restTime = (dayjs().unix() - dayjs(oitem.orderTime).unix()) * 1000
      setCountdownTime(COUNT_DOWN - restTime)
    }
  }, [])

  return (
    <div className="maorder-item">
      <ConfigProvider themeVars={themeVars}>
        <div className="maorder-left">
          <span className={`maorder-status ${ManageStatusMap[oitem.state ?? '']?.['cName']}`}>
            {ManageStatusMap[oitem.state ?? '']?.['text']}
          </span>
          {oitem.state === 1 && (
            <div className="maorder-countdown">
              <CountDown time={countdowntime} onFinish={countdownTimeFinish} format="剩 mm:ss" />
            </div>
          )}
        </div>
      </ConfigProvider>
      <div className="maorder-right rv-hairline--left">
        <div className="maorder-user">
          <div className="user-avator">
            <Image width="5.9vw" height="5.9vw" round fit="cover" src={oitem.orderUserAvatar} />
          </div>
          <div className="user-name">{oitem.orderUserName}</div>
        </div>
        <div className="maorder-itemcontent">
          <div className="itemcon-avator">
            <Image width="15.5vw" height="15.5vw" fit="cover" src={oitem.goodsPic} />
          </div>
          <div className="maorder-cRight">
            <div className="maorder-goods-name rv-ellipsis">{oitem.goodsName}</div>
            <Flex align="center" justify="between">
              <Flex.Item span={18}>
                <span className="maor-tag">
                  <Tag color="rgba(59,209,196,0.10)" textColor="#3CD2C5">
                    成人X{oitem.adultNum ?? 0}
                  </Tag>
                </span>
                <span className="maor-tag">
                  <Tag color="rgba(59,209,196,0.10)" textColor="#3CD2C5">
                    儿童X{oitem.childNum ?? 0}
                  </Tag>
                </span>
              </Flex.Item>
              <Flex.Item span={6} className="direction-item">
                <span className="maor-price">¥{oitem.payAmount}</span>
              </Flex.Item>
            </Flex>
          </div>
        </div>
        <div className="maortime-box">
          <Flex align="center" justify="start">
            <Flex.Item span={20}>
              <span className="maor-time">下单时间：{oitem.orderTime}</span>
            </Flex.Item>
            <Flex.Item span={4} className="direction-item">
              <Icon size="3.2vw" name={arrowRight} />
            </Flex.Item>
          </Flex>
        </div>
      </div>
    </div>
  )
}
export default ManageItem
