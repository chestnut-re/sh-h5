import React from 'react'
import { Tabs } from 'react-vant'

import { withRouter } from 'react-router-dom'
import './index.less'

/**
 * 团期分配-列表
 */

const GroupDistribution: React.FC = (props: any) => {
  const goDetail = () => {
    props.history.push('/group/list')
  }
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
        <Tabs.TabPane title="约定出行" name="a">
          <div className="group" onClick={() => goDetail()}>
            <div className="group-time">北京环球影城一日游（7大主…题+全聚德券）</div>
            <div className="group-name">
              <div className="group-list">
                <div className="group-item">
                  <span>待成团游客</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>
                <div className="group-item">
                  <span>待建团</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>
                <div className="group-item">
                  <span>未授权</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>{' '}
              </div>
              <div className="icon-right"></div>
            </div>
          </div>
          <div className="group" onClick={() => goDetail()}>
            <div className="group-time">北京环球影城一日游（7大主…题+全聚德券）</div>
            <div className="group-name">
              <div className="group-list">
                <div className="group-item">
                  <span>待成团游客</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>
                <div className="group-item">
                  <span>待建团</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>
                <div className="group-item">
                  <span>未授权</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>{' '}
              </div>
              <div className="icon-right"></div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane title="固定出行" name="b">
          <div className="group" onClick={() => goDetail()}>
            <div className="group-time">北京环球影城一日游（7大主…题+全聚德券）</div>
            <div className="group-name">
              <div className="group-list">
                <div className="group-item">
                  <span>待成团游客</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>
                <div className="group-item">
                  <span>待建团</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>
                <div className="group-item">
                  <span>未授权</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>{' '}
              </div>
              <div className="icon-right"></div>
            </div>
          </div>
          <div className="group" onClick={() => goDetail()}>
            <div className="group-time">北京环球影城一日游（7大主…题+全聚德券）</div>
            <div className="group-name">
              <div className="group-list">
                <div className="group-item">
                  <span>待成团游客</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>
                <div className="group-item">
                  <span>待建团</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>
                <div className="group-item">
                  <span>未授权</span>
                  <span color="#32D0C6" className="group-num">
                    200
                  </span>
                </div>{' '}
              </div>
              <div className="icon-right"></div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default withRouter(GroupDistribution)
