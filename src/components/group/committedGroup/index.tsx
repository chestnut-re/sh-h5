/*
 * @Description: 待发团
 * @LastEditTime: 2021-12-16 17:56:11
 */
import React, { useState, useEffect, FC } from 'react'
import { Icon} from 'react-vant'

import { withRouter } from 'react-router-dom'
import './index.less'

const CommittedGroup: FC = (props: any) => {
  const goDetail = () => {
    props.history.push('/group/send-people')
  }
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
          <div className="Establishing-appoint" onClick={()=>goDetail()}>
          指定发团人 <Icon className="Establishing-appoint-add" name="add-o" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default withRouter(CommittedGroup)
