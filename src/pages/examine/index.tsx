import React, { useEffect, useState } from 'react'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './index.less'
import review from '@/assets/img/token/review.png'
/**
 * 审核中
 */
const ExaminePage: React.FC = (props) => {
  
  const backHome = ()=>{
    SHBridge.jump({ url: generateUrl('/my-token'), replace: true, title: '我的乐豆' })
  }
  return (
    <div className="ExaminePage__root">
      <div className="header">
        <img className="img" src={review} />
        <div className="title">审核中</div>
        <div className="text">申请提现成功，工作人员将和您联系，请您耐心等待！</div>
        <button className="btn" onClick={backHome}>返回首页</button>
      </div>
    </div>
  )
}

export default ExaminePage
