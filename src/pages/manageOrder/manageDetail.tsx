import React, { useState,useEffect, FC } from 'react'
import { ConfigProvider, Tabs } from 'react-vant'
import ManageDetail from '@/components/manageOrder/manageDetail'
import PersonalDetails from '@/components/manageOrder/personalDetails'

import './index.less'
/**
 * 订单管理详情入口页面
 * 全部 待付款 待确认 已完成 退款_售后
 */
const MaorderDetailPage: FC = (props:any) => {
  
  return (
    <div className="MaorderDetail-container">
        <ManageDetail/>
        <div className="maorder-list">
            {[1,2,3,4,5,6].map((item)=>{
              return (<div className="maorder-list-item" key={item}>
              <PersonalDetails />
          </div>)
            })}
        </div>
        <div className="contact-btn">
          <div className="contact-bitem">联系</div>
      </div>
    </div>
  )
}

export default MaorderDetailPage
