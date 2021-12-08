import React, { useState,FC } from 'react'

import { Cell, Calendar } from 'react-vant'
import './index.less'
/**
 * 已知日期日历选择卡片
 */


const KnownCalendarCard:FC = (props) => {
 
  return (
    <>
    <div className="KCalendar-container">
      <div className="kcalendar-section"> 
        {[1,2,3,4,5,6,7].map((item)=>{
            return (<div className={`section-item ${item==3&&"acitve"}`} key={item}>
                    <p>10/23</p>
                    <p>周四</p>
                    <p className="price">¥1750</p>
                  </div> )
        })}
       
      </div> 
      <div className="kcalendar-box">
          <div className="kcalendar-item-l">
            出发<span>10/22 周五（10/26 周日返程）</span>
          </div>
          <div className="kcalendar-item-r">
              <span className="kcitem-tag">
              库存：11
              </span>
          </div>
      </div>
      </div>
    </>
  )
}

export default KnownCalendarCard
