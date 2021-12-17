/*
 * @Description: 待建团
 * @LastEditTime: 2021-12-16 18:27:28
 */
import React, { useState, useEffect, FC } from 'react'
import './index.less'

const ForEstablishingGroup: FC = (props: any) => {
  return (
    <div className="establishing__root">
      <div className="establishing-th">
        <div className="establishing-div">创建时间</div>
        <div className="establishing-div">发团时间</div>
        <div className="establishing-div">发团人</div>
      </div>
      <div className="establishing-tb">
        <div className="establishing-div">创建时间</div>
        <div className="establishing-div">发团时间</div>
        <div className="establishing-div">发团人</div>
      </div>
    </div>
  )
}
export default ForEstablishingGroup
