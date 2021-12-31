import React, { FC, useState } from 'react'
import activeIcon from '@/assets/img/activeIcon@3x.png'
import inactiveIcon from '@/assets/img/inactiveIcon@3x.png'
import { getUrlParams, generateUrl } from '@/utils'
import { SHBridge } from '@/jsbridge'

import './index.less'
/**
 * 用户协议View Selected
 */

interface Props {
  isSelect: boolean
  onSelect: (val) => void
  // defaultExpandedKeys: Array<any>
}

const UserProtocolView: FC<Props> = ({ isSelect, onSelect }) => {

  const onService = (e) => {
    e.stopPropagation();
    SHBridge.jump({
      url: generateUrl('/protocol/personal-information'),
      newWebView: true,
      title: '个人信息保护授权协议'
    })
  }
  return (
    <div className="UserProtocol">
      <div onClick={onSelect} className='selectProtocol'>
        <img alt="" className="img-icon" src={isSelect ? activeIcon : inactiveIcon} />
        <span className='text'>点击保存表示同意 <span onClick={onService} className='text-a'>《个人信息保护授权协议》</span></span>
      </div>
    </div>
  )
}

export default UserProtocolView