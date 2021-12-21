import React, { useState, useEffect, FC } from 'react'
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

const ManageItem: FC = (props: any) => {
  const { state, goodsName, adultNum, childNum, payAmount, orderTime, orderUserName, id } = props

  return (
    <div className="maorder-item">
      <ConfigProvider themeVars={themeVars}>
        <div className="maorder-left">
          <span className={`maorder-status ${ManageStatusMap[state]?.['cName']}`}>
            {ManageStatusMap[state]?.['text']}
          </span>
          {state === 1 && (
            <div className="maorder-countdown">
              <CountDown time={30 * 60 * 60 * 15000} format="剩DD天HH:mm:ss" />
            </div>
          )}
        </div>
      </ConfigProvider>
      <div className="maorder-right rv-hairline--left">
        <div className="maorder-user">
          <div className="user-avator">
            <Image width="5.9vw" height="5.9vw" round fit="cover" src={`http://picsum.photos/64?t=${id}`} />
          </div>
          <div className="user-name">{orderUserName}</div>
        </div>
        <div className="maorder-itemcontent">
          <div className="itemcon-avator">
            <Image width="15.5vw" height="15.5vw" fit="cover" src={`http://picsum.photos/128?t=${id}`} />
          </div>
          <div className="maorder-cRight">
            <div className="maorder-goods-name rv-ellipsis">{goodsName}</div>
            <Flex>
              <Flex.Item span={16}>
                <span className="maor-tag">
                  <Tag color="rgba(59,209,196,0.10)" textColor="#3CD2C5">
                    成人X{adultNum ?? 0}
                  </Tag>
                </span>
                <span className="maor-tag">
                  <Tag color="rgba(59,209,196,0.10)" textColor="#3CD2C5">
                    儿童X{childNum ?? 0}
                  </Tag>
                </span>
              </Flex.Item>
              <Flex.Item span={8} className="direction-item">
                <span className="maor-price">¥{payAmount}</span>
              </Flex.Item>
            </Flex>
          </div>
        </div>
        <div className="maortime-box">
          <Flex align="center" justify="start">
            <Flex.Item span={20}>
              <span className="maor-time">下单时间：{orderTime}</span>
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
