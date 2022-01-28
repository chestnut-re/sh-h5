import React, { useState, useEffect, FC } from 'react'
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
const MaStatusMap = {
  1: { text: '【待付款】', bgName: 'BGdaifk', cName: 'CF57272', type: 1 },
  2: { text: '【已失效】', bgName: 'BGyisx', cName: 'C999999', type: 2 },
  3: { text: '【待核销】', bgName: 'BGdaiqr', cName: 'C7193f4', type: 3 },
  4: { text: '【已完成】', bgName: 'BGyiwc', cName: 'C666666', type: 4 },
  5: { text: '【退款中】', bgName: 'BGtuikz', cName: 'CF5B572', type: 5 },
  6: { text: '【退款成功】', bgName: 'BGyitk', cName: 'C666666', type: 6 },
  7: { text: '【退款失败】', bgName: 'BGyitk', cName: 'C999999', type: 7 },
  '': { text: '未知', bgName: 'BGyisx', cName: '', type: '' },
}
interface Peosonalprops {
  subordersitem: any[]
  changeOrderDetail: (val) => void
}
const ManagePeosonalDetailItem: FC<Peosonalprops> = ({ subordersitem, changeOrderDetail }) => {
  return (
    <div className="pdetail-item">
      <div className="pdetail-item-box">
        <div className={`pdetail-item-box-left ${MaStatusMap[subordersitem[0].state]?.['cName']}`}>
          {MaStatusMap[subordersitem[0].state].text}
        </div>
        <div className="pdetail-item-box-right">
          {subordersitem?.map((item, index) => {
            return (
              <div className="pibr-box" key={index}>
                <ul className="pibr-box-ul">
                  <li className="pibr-box-li">
                    <span className="pibr-label">{item?.travelerType == 0 ? '儿童' : '成人'}</span>
                  </li>
                  {item?.travelerName ? (
                    <li className="pibr-box-li">
                      <span className="pibr-name">{item?.travelerName}</span>
                      <span className="pibr-tag rv-hairline--surround">{RelationMap[item.travelerRelation]}</span>
                    </li>
                  ) : null}
                  <li className="pibr-box-li">
                    <span className="pibr-label">电&emsp;&emsp;话</span>
                    <span className="pibr-content">{item?.travelerPhoneNumber}</span>
                  </li>
                  <li className="pibr-box-li">
                    <span className="pibr-label">订单编号</span>
                    <span className="pibr-content">{item?.suborderNo}</span>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      {subordersitem[0]?.refundState ? (
        <div className="pdetail-refund rv-hairline--top">
          <div
            className="pdetail-refund-btn"
            onClick={() => {
              changeOrderDetail(subordersitem)
            }}
          >
            退款详情
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ManagePeosonalDetailItem
