import React, { useState } from 'react'
import { Tabs, Button, Tag } from 'react-vant'
import './index.less'

/**
 * kpi管理-列表
 */

const KpiListPage: React.FC = () => {
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
              <Tag color="#32D0C6" className="active-btn">
                进行中
              </Tag>
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
              <Tag color="#32D0C6" className="active-btn">
                进行中
              </Tag>
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
              <Tag color="#32D0C6" className="active-btn">
                进行中
              </Tag>
            </div>
            <div className="active-name">方案2名称占位符</div>
            <div className="active-con">
              <span>基础目标 ¥100,000</span>
              <span className="active-commission">绩效佣金 ¥15%</span>
            </div>
            <div className="jiantou"></div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane title="未开始" name="b">
          <div className="active">
            <div className="active-time">
              <span>2021-01-01</span>
              <span>至</span>
              <span>2021-01-01</span>
              <Tag color="#F15E5E" className="active-btn">
                未开始
              </Tag>
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
              <Tag color="#F15E5E" className="active-btn">
                未开始
              </Tag>
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
              <Tag color="#ffffff" className="active-btn2">
                已结束
              </Tag>
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
              <Tag color="#ffffff" className="active-btn2">
                已结束
              </Tag>
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

export default KpiListPage
