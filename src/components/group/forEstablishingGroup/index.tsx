/*
 * @Description: 待建团
 * @LastEditTime: 2021-12-15 17:56:16
 */
import React, { useState, useEffect, FC } from 'react'
import './index.less'

const ForEstablishingGroup: FC = (props: any) => {
  return (
    <div className="Establishing-item">
      <div className="Establishing-th">
        <div className="Establishing-div">创建时间</div>
        <div className="Establishing-div">发团时间</div>
        <div className="Establishing-div">发团人</div>
      </div>
      <div className="Establishing-tb">
        <div className="Establishing-div">创建时间</div>
        <div className="Establishing-div">发团时间</div>
        <div className="Establishing-div">发团人</div>
      </div>
    </div>
  )
}
export default ForEstablishingGroup
