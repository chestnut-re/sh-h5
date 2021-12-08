import React, { useState, FC } from 'react'

import { ConfigProvider, Tabs, Empty } from 'react-vant'
import MineMotivation from '@/components/goalsMotivation/mineMotivation';
import TeamMotivation from '@/components/goalsMotivation/teamMotivation';

import './index.less'
/**
 * 激励目标入口页面
 */
const themeVars = {
  '--rv-tabs-bottom-bar-color': '#3BD1C4',
  '--rv-tab-font-size': '4.26667vw',
}

const GoalsMotivation: FC = (props) => {
  return (
    <div className="Goalsmot-container">
      <div className="goalsmot-header">
        <ConfigProvider themeVars={themeVars}>
          <Tabs
            lineWidth="5.6vw"
            titleInactiveColor="#333"
            ellipsis={false}
            titleActiveColor="#333333"
            lineHeight="1.06vw"
            active="b"
          >
            <Tabs.TabPane title="我的激励目标" name="a">
              <div className="goalsmot-content">
                  {[1,2,3].map((item)=>{
                    return (<div className="goalsmot-item">
                    <MineMotivation/>
                  </div>)
                  })}
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane title="团队激励目标" name="b">
            <div className="goalsmot-content">
                  {[1,2,3].map((item)=>{
                    return (<div className="goalsmot-item">
                    <TeamMotivation/>
                  </div>)
                  })}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default GoalsMotivation
