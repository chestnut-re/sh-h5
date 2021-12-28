import React, { FC } from 'react'
import { ConfigProvider } from 'react-vant'

import './index.less'
/**
 * 
 */

const themeVars = {
  '--rv-notice-bar-height': '9.6vw',
  '--rv-notice-bar-font-size': '3.2vw',
  '--rv-notice-bar-icon-size': '4vw',
  '--rv-cell-vertical-padding': '0',
  '--rv-cell-horizontal-padding': '0',
  '--rv-padding-sm': '5.4vw',
}

const PersonalPageView: FC = (props) => {
  return (
    <ConfigProvider themeVars={themeVars}>
      {props.children}
    </ConfigProvider>
  )
}

export default PersonalPageView