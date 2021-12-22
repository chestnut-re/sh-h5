import React, { useState, useEffect, FC } from 'react'
import { Flex } from 'react-vant'
import './index.less'
/**
 * 订单管理详情
 * 包含 订单号 订单状态 购买用户 下单时间 商品名称 价格
 */

const RelationMap = {
  '0': '本人',
  '1': '夫妻',
  '2': '父母',
  '3': '子女',
  '4': '亲戚',
  '5': '朋友',
  '6': '兄弟',
  '7': '姐妹',
}
interface Peosonalprops {
  subordersitem: {
    travelerType: number
    travelerName: string
    travelerPhoneNumber: string
    travelerCertificateNo: string
    emerName: string
    emerPhoneNumber: string
    travelerRelation: string
    emerTravelerRelation: string
  }
}
const ManagePeosonalDetailItem: FC<Peosonalprops> = (props) => {
  const { subordersitem } = props
  const [suborders, setSuborders] = useState(subordersitem)

  return (
    <div className="Peosonaldetail-item">
      <Flex justify="center" className="peodetail-container">
        <Flex.Item span={9}>
          <div className="personal-btn">{suborders?.travelerType == 0 ? '儿童' : '成人'}</div>
          <div className="personal-status">【待确认】</div>
        </Flex.Item>
        <Flex.Item span={15}>
          <Flex className="personal-info" gutter={14}>
            <Flex.Item span={6} className="personal-infoL">
              姓名
            </Flex.Item>
            <Flex.Item span={18} className="personal-infoR">
              {suborders?.travelerName}
              <span>{`（${RelationMap[suborders.travelerRelation]}）`}</span>
            </Flex.Item>
          </Flex>
          <Flex className="personal-info" gutter={14}>
            <Flex.Item span={6} className="personal-infoL">
              电话
            </Flex.Item>
            <Flex.Item span={18} className="personal-infoR">
              {suborders?.travelerPhoneNumber}
            </Flex.Item>
          </Flex>
          <Flex className="personal-info" gutter={14}>
            <Flex.Item span={6} className="personal-infoL">
              身份证
            </Flex.Item>
            <Flex.Item span={18} className="personal-infoR">
              {suborders?.travelerCertificateNo}
            </Flex.Item>
          </Flex>
          <Flex className="personal-info" gutter={14}>
            <Flex.Item span={6} className="personal-infoL">
              护照
            </Flex.Item>
            <Flex.Item span={18} className="personal-infoR">
              *********
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
      <Flex className="personal-contact" justify="between" align="center">
        <Flex.Item span={14}>
          <div className="personal-conleft">
            紧急联系人 {suborders?.emerName}
            <span>{`（${RelationMap[suborders.emerTravelerRelation]}）`}</span>
          </div>
        </Flex.Item>
        <Flex.Item span={10}>
          <div className="personal-conright">电话 {suborders?.emerPhoneNumber}</div>
        </Flex.Item>
      </Flex>
    </div>
  )
}
export default ManagePeosonalDetailItem
