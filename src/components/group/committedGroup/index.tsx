/*
 * @Description: 待发团
 * @LastEditTime: 2021-12-16 18:30:10
 */
import React, { useState, useEffect, FC } from 'react'
import { Icon } from 'react-vant'

import { withRouter } from 'react-router-dom'
import './index.less'

const CommittedGroup: FC = (props: any) => {
  const goDetail = () => {
    props.history.push('/group/send-people')
  }
  return (
    <div className="establishing__root">
      <div className="establishing-th">
        <div className="establishing-div">创建时间</div>
        <div className="establishing-div">发团人</div>
        <div className="establishing-div">操作</div>
      </div>
      <div className="establishing-tb">
        <div className="establishing-div">创建时间</div>
        <div className="establishing-div">发团时间</div>
        <div className="establishing-div">
          <div className="establishing-appoint" onClick={() => goDetail()}>
            指定发团人 <Icon className="establishing-appoint-add" name="add-o" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default withRouter(CommittedGroup)
