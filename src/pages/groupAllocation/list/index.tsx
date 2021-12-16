/*
 * @Description:团期分配-列表  约定出行 /group/list?type=appoint  固定出行 /group/list?type=fixed
 * @LastEditTime: 2021-12-16 18:31:56
 */
import React, { useState } from 'react'
import { Tabs } from 'react-vant'
import ForEstablishingGroup from '@/components/group/forEstablishingGroup'
import CommittedGroup from '@/components/group/committedGroup'
import SendTheGroup from '@/components/group/sendTheGroup'


import './index.less'
const groupDistribution: React.FC = () => {
 

  return (
    <div className="group__root">
      <Tabs
        active="a"
        color="#32D0C6"
        lineWidth="20px"
        lineHeight="3px"
        titleActiveColor="#000000"
        titleInactiveColor="#000000"
      >
        <Tabs.TabPane title="待建团" name="a">
          <ForEstablishingGroup />
        </Tabs.TabPane>
        <Tabs.TabPane title="待发团" name="b">
          <CommittedGroup />
        </Tabs.TabPane>
        <Tabs.TabPane title="发团中" name="c">
          <SendTheGroup />
        </Tabs.TabPane>
        <Tabs.TabPane title="已结束" name="d">
          <SendTheGroup />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default (groupDistribution)
