import React, { useState, useEffect, FC } from 'react'
import './index.less'
/**
 * 订单管理详情
 * 包含 订单号 订单状态 购买用户 下单时间 商品名称 价格
 */
const MaStatusMap = {
  1: { text: '待付款', bgName: 'BGdaifk',cName:"CF15E5E" },
  2: { text: '已失效', bgName: 'BGyisx',cName:"C999999" },
  3: { text: '待确认', bgName: 'BGdaiqr',cName:"C3AD2C5" },
  4: { text: '已完成', bgName: 'BGyiwc',cName:"C999999" },
  5: { text: '退款中', bgName: 'BGtuikz',cName:"CF48B43" },
  6: { text: '已退款', bgName: 'BGyitk',cName:"C999999" },
  '': { text: '未知', bgName: 'BGyisx',cName:"" },
}


const ManageDetailItem: FC = (props: any) => {
  const [mastatus,setMastatus] = useState(MaStatusMap[4])

  return (
    <div className="Maorderdetail-item">
        <div className="detail-box">
            <ul className="detail-listUl">
              <li className="detail-listLi">
                  <div className="listLi-left">
                    订单编号
                  </div>
                  <div className="listLi-right">
                    1011 6489 9000
                  </div>
              </li>
              <li className="detail-listLi">
                  <div className="listLi-left">
                    购买用户
                  </div>
                  <div className="listLi-right">
                  康姆士
                  </div>
              </li>
              <li className="detail-listLi">
                  <div className="listLi-left">
                    下单时间
                  </div>
                  <div className="listLi-right">
                  2021-12-26 12:00:22
                  </div>
              </li>
              <li className="detail-listLi">
                  <div className="listLi-left">
                    商品
                  </div>
                  <div className="listLi-right rv-ellipsis">
                  北京环球影城一日游（7大玩乐主题北环球影游…
                  </div>
              </li>
              <li className="detail-listLi">
                  <div className="listLi-left">
                    付款
                  </div>
                  <div className="listLi-right">
                  ¥ 1999
                  </div>
              </li>
            </ul>
        </div>
        <div className={`detail-status ${mastatus?.bgName}`}>
            <div className={`status-text ${mastatus?.cName}`}>
              <h1>{mastatus?.text}</h1>
              <p>退款金额:¥1999</p>
            </div>
        </div>
    </div> 
  )
}
export default ManageDetailItem
