import React, { useState, FC } from 'react'

import { ConfigProvider, Progress, Image } from 'react-vant'
import './index.less'
/**
 * 团队激励目标
 */

const TeamMotivationCard: FC = (props) => {
  return (
    <div className="teamMot-box">
      <div className="teamMot-header">
        <span>2021-11-01</span>
        <span className="header-split">至</span>
        <span>2021-12-30</span>
      </div>
      <div className="teamMot-rew">
        <p className="teamMot-name">方案名称1占位符</p>
        <p className="teamMot-rewnum">奖励 ¥10,000</p>
      </div>
      <div className="teamMot-ranking">
        <ul className="ranking-ul">
          {[1, 2, 3, 4].map((item, index) => {
            return (
              <li className="ranking-li">
                <div className="ranking-num">0{index + 1}</div>
                <div className="ranking-avator">
                  <Image round width="8.6vw" height="8.6vw" src={`http://picsum.photos/128?t=`} />
                </div>
                <div className="ranking-progress">
                  <div className="ranking-protop">
                    <div className="ranking-name">张某某</div>
                    <div className="ranking-proitem">
                      <span>60,000</span>/100,000
                    </div>
                  </div>
                  <div className="ranking-probottom">
                    <Progress
                      percentage={100 - 20 * index}
                      strokeWidth="2.14vw"
                      trackColor="#EEEEEE"
                      color="#00D2C6"
                      showPivot={false}
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TeamMotivationCard
