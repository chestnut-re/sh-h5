/*
 * @Description: 待发团
 * @LastEditTime: 2021-12-15 17:58:10
 */
import React, { useState, useEffect, FC } from 'react'
import { Icon} from 'react-vant'
import './index.less'

const CommittedGroup: FC = (props: any) => {
  return (
    <div className="Establishing-item">
      <div className="Establishing-th">
        <div className="Establishing-div">创建时间</div>
        <div className="Establishing-div">发团人</div>
        <div className="Establishing-div">操作</div>
      </div>
      <div className="Establishing-tb">
        <div className="Establishing-div">创建时间</div>
        <div className="Establishing-div">发团时间</div>
        <div className="Establishing-div">
          <div className="Establishing-appoint">
          指定发团人 <Icon className="Establishing-appoint-add" name="add-o" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CommittedGroup
