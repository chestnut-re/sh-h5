import React, { useState, useEffect, FC } from 'react'
import { Image, Flex, CountDown, ConfigProvider, Icon, Tag } from 'react-vant'
import arrowRight from '@/assets/img/arrow@3x.png'
import './index.less'
/**
 * 订单管理详情
 * 包含 订单号 订单状态 购买用户 下单时间 商品名称 价格
 */
const ManageStatusMap = {
  1: { text: '待付款', cName: 'CF15E5E' },
  2: { text: '已失效', cName: 'C999999' },
  3: { text: '待确认', cName: 'C3AD2C5' },
  4: { text: '已完成', cName: 'C3AD2C5' },
  5: { text: '退款中', cName: 'CF48B43' },
  6: { text: '已退款', cName: 'C999999' },
  '': { text: '未知', cName: 'C999999' },
}


const ManagePeosonalDetailItem: FC = (props: any) => {
 

  return (
    <div className="Peosonaldetail-item">
          <Flex justify="center" className="peodetail-container">
            <Flex.Item span={9}>
              <div className="personal-btn">成人</div>
              <div className="personal-status">【待确认】</div>
            </Flex.Item>
            <Flex.Item span={15}>
              <Flex className="personal-info" gutter={14}>
                  <Flex.Item span={6} className="personal-infoL">姓名</Flex.Item>
                  <Flex.Item span={18} className="personal-infoR">张某某（本人）</Flex.Item>
              </Flex>
              <Flex className="personal-info" gutter={14}>
                  <Flex.Item span={6} className="personal-infoL">电话</Flex.Item>
                  <Flex.Item span={18} className="personal-infoR">185****3475</Flex.Item>
              </Flex>
              <Flex className="personal-info" gutter={14}>
                  <Flex.Item span={6} className="personal-infoL">身份证</Flex.Item>
                  <Flex.Item span={18} className="personal-infoR">1310021199107054230</Flex.Item>
              </Flex>
              <Flex className="personal-info" gutter={14}>
                  <Flex.Item span={6} className="personal-infoL">护照</Flex.Item>
                  <Flex.Item span={18} className="personal-infoR">*********</Flex.Item>
              </Flex>

            </Flex.Item>
          </Flex>
          <Flex  className="personal-contact" justify="between" align="center">
            <Flex.Item span={14}>
              <div className="personal-conleft">紧急联系人 张某某（朋友）</div>
            </Flex.Item>
            <Flex.Item span={10}>
              <div  className="personal-conright">
              电话 185****3475
              </div>
            </Flex.Item>
          </Flex>

     
    </div> 
  )
}
export default ManagePeosonalDetailItem
