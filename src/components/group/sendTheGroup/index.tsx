/*
 * @Description: 发团中 & 已结束
 * @LastEditTime: 2021-12-16 18:30:48
 */
import React, { useState, useEffect, FC } from 'react'
import './index.less'

const SendTheGroup: FC = (props: any) => {
  return (
    <div className="establishing__root">
      <div className="establishing-th">
        <div className="establishing-div">创建时间</div>
        <div className="establishing-div"></div>
        <div className="establishing-div">发团人</div>
      </div>
      <div className="establishing-tb">
        <div className="establishing-div">创建时间</div>
        <div className="establishing-div"></div>
        <div className="establishing-div">发团人</div>
      </div>
    </div>
  )
}
export default SendTheGroup
