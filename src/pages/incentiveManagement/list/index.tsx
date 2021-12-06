import React, { useState } from 'react'
import { Tabs, Button } from 'react-vant'
import './index.less'

/**
 * 激励管理-列表
 */

const IncentivePage = () => {
  return (
    <div className="incentive">
      <Tabs
        active="a"
        color="#32D0C6"
        lineWidth="20px"
        lineHeight="3px"
        titleActiveColor="#333333"
        titleInactiveColor="#333333"
      >
        <Tabs.TabPane title="进行中" name="a">
          <div className="active">
            <div className="active-time">
              <span>2021-01-01</span>
              <span>至</span>
              <span>2021-01-01</span>
              <Button className="active-btn">进行中</Button>
            </div>
            <div className="active-name">方案2名称占位符</div>
            <div className="active-con">基础目标 ¥100,000</div>
            <div className="jiantou"></div>
          </div>
          <div className="active">
            <div className="active-time">
              <span>2021-01-01</span>
              <span>至</span>
              <span>2021-01-01</span>
              <Button className="active-btn">进行中</Button>
            </div>
            <div className="active-name">方案2名称占位符</div>
            <div className="active-con">基础目标 ¥100,000</div>
            <div className="jiantou"></div>
          </div>
          <div className="active">
            <div className="active-time">
              <span>2021-01-01</span>
              <span>至</span>
              <span>2021-01-01</span>
              <Button className="active-btn">进行中</Button>
            </div>
            <div className="active-name">方案2名称占位符</div>
            <div className="active-con">基础目标 ¥100,000</div>
            <div className="jiantou"></div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane title="未开始" name="b">
          <div className="active">
            <div className="active-time">
              <span>2021-01-01</span>
              <span>至</span>
              <span>2021-01-01</span>
              <Button className="active-btn1">未开始</Button>
            </div>
            <div className="active-name">方案2名称占位符</div>
            <div className="active-con">
              <span>基础目标 ¥100,000</span>
              <span className="active-commission">绩效佣金 ¥15%</span>
            </div>
            <div className="jiantou"></div>
          </div>
          <div className="active">
            <div className="active-time">
              <span>2021-01-01</span>
              <span>至</span>
              <span>2021-01-01</span>
              <Button className="active-btn1">未开始</Button>
            </div>
            <div className="active-name">方案2名称占位符</div>
            <div className="active-con">
              <span>基础目标 ¥100,000</span>
              <span className="active-commission">绩效佣金 ¥15%</span>
            </div>
            <div className="jiantou"></div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane title="已结束" name="c">
          <div className="active">
            <div className="active-time">
              <span>2021-01-01</span>
              <span>至</span>
              <span>2021-01-01</span>
              <Button className="active-btn2">已结束</Button>
            </div>
            <div className="active-name">方案2名称占位符</div>
            <div className="active-con">
              <span>基础目标 ¥100,000</span>
              <span className="active-commission">绩效佣金 ¥15%</span>
            </div>
            <div className="jiantou"></div>
          </div>
          <div className="active">
            <div className="active-time">
              <span>2021-01-01</span>
              <span>至</span>
              <span>2021-01-01</span>
              <Button className="active-btn2">已结束</Button>
            </div>
            <div className="active-name">方案2名称占位符</div>
            <div className="active-con">
              <span>基础目标 ¥100,000</span>
              <span className="active-commission">绩效佣金 ¥15%</span>
            </div>
            <div className="jiantou"></div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default IncentivePage
