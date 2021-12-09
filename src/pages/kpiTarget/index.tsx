import React from 'react'
import './index.less'
import { Progress, Divider } from 'react-vant'
import Add from '@/assets/img/add@3x.png'

/**
 * kpi目标
 */
const KpiTargetPage: React.FC = () => {
  return (
    <div className="target__root">
      <div className="my-target">
        <div className="my-target-header">我的KPI目标</div>
        <div className="my-target-time">
          <span>2021-11-1</span>
          <span>至</span>
          <span>2021-12-30</span>
        </div>
        <div className="my-target-name">方案名称1占位符</div>
        <div className="my-target-target">
          <div>
            <span>基础目标</span>
            <span>¥1000,000</span>
            <span>绩效佣金</span>
            <span>¥15%</span>
          </div>
          <div>
            <span>二阶目标</span>
            <span>¥2000,000</span>
            <span>绩效佣金</span>
            <span>¥20%</span>
          </div>
          <div>
            <span>三阶目标</span>
            <span>¥3000,000</span>
            <span>绩效佣金</span>
            <span>¥50%</span>
          </div>
        </div>
        <div className="my-target-bottom">
          <div className="bottom-img">
            <img src={Add} alt="" />
          </div>
          <div className="bottom-con">
            <div>我的业绩:</div>
            <div className="bottom-progress">
              <div className="progress-data" style={{ width: 0.6 * 285 }}>
                <span>1,800,000</span>
                <span></span>
              </div>
            </div>
            <div>
              <span>1,000,000</span>
              <span>2,000,000</span>
              <span>3,000,000</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-target team-target">
        <div className="my-target-header">团队KPI目标</div>
        <div className="my-target-time">
          <span>2021-12-25</span>
          <span>至</span>
          <span>2021-12-30</span>
        </div>
        <div className="my-target-name">方案名称1占位符</div>
        <div className="my-target-target">
          <div>
            <span>基础目标</span>
            <span>¥1000,000</span>
            <span>绩效佣金</span>
            <span>¥15%</span>
          </div>
        </div>
        <div className="my-target-bottom">
          <div className="bottom-img">
            <span>01</span>
            <img src={Add} alt="" />
          </div>
          <div className="bottom-con bottom-con-team">
            <div>张某某</div>
            <div className="bottom-progress bottom-progress-team">
              <div className="progress-data" style={{ width: 1.05 * 261 }}>
                <span>3,000,000</span>
                <span className="team-pro"></span>
              </div>
            </div>
            <div>
              <span>1,000,000</span>
              <span>2,000,000</span>
              <span>3,000,000</span>
            </div>
          </div>
        </div>
        <div className="my-target-bottom">
          <div className="bottom-img">
            <span>02</span>
            <img src={Add} alt="" />
          </div>
          <div className="bottom-con bottom-con-team">
            <div>寇某某</div>
            <div className="bottom-progress bottom-progress-team">
              <div className="progress-data" style={{ width: 0.8 * 261 }}>
                <span>2,500,000</span>
                <span className="team-pro"></span>
              </div>
            </div>
            <div>
              <span>1,000,000</span>
              <span>2,000,000</span>
              <span>3,000,000</span>
            </div>
          </div>
        </div>
        <Divider />
        <div className="my-target-time">
          <span>2021-10-27</span>
          <span>至</span>
          <span>2021-11-27</span>
        </div>
        <div className="my-target-name">方案名称1占位符</div>
        <div className="my-target-target">
          <div>
            <span>基础目标</span>
            <span>¥1000,000</span>
            <span>绩效佣金</span>
            <span>¥15%</span>
          </div>
          <div>
            <span>基础目标</span>
            <span>¥1000,000</span>
            <span>绩效佣金</span>
            <span>¥15%</span>
          </div>
        </div>
        <div className="my-target-bottom">
          <div className="bottom-img">
            <span>01</span>
            <img src={Add} alt="" />
          </div>
          <div className="bottom-con bottom-con-team">
            <div>李某某</div>
            <div className="bottom-progress bottom-progress-team">
              <div className="progress-data" style={{ width: 0.55 * 261 }}>
                <span>2,000,000</span>
                <span className="team-pro"></span>
              </div>
            </div>
            <div>
              <span>1,000,000</span>
              <span>2,000,000</span>
              <span>3,000,000</span>
            </div>
          </div>
        </div>
        <div className="my-target-bottom">
          <div className="bottom-img">
            <span>02</span>
            <img src={Add} alt="" />
          </div>
          <div className="bottom-con bottom-con-team">
            <div>寇某某</div>
            <div className="bottom-progress bottom-progress-team">
              <div className="progress-data" style={{ width: 0.35 * 261 }}>
                <span>1,500,000</span>
                <span className="team-pro"></span>
              </div>
            </div>
            <div>
              <span>1,000,000</span>
              <span>2,000,000</span>
              <span>3,000,000</span>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  )
}
export default KpiTargetPage
