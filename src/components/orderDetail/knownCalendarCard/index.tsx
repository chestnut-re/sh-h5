import React, { useState, FC } from 'react'

import { Cell, Calendar } from 'react-vant'
import './index.less'
/**
 * 已知日期日历选择卡片
 */
const formatter = (day) => {
  let week = day.date.getDay()
  if (week === 0) {
    day.type = 'disabled'
  } else {
    day.bottomInfo = '1798'
  }

  // if (day.type === 'start') {
  //   day.topInfo = '开始'
  // } else if (day.type === 'end') {
  //   day.topInfo = '结束'
  // }

  return day
}
const formatDate = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}`
}

const KnownCalendarCard: FC = (props) => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const onConfirms = (date) => {
    const dateStr = formatDate(date)
    setText(dateStr)
    setVisible(false)
  }
  const set = (b) => {
    setVisible(b)
  }
  return (
    <>
      <div className="KCalendar-container">
        <div className="kcalendar-box">
          <div className="kcalendar-section">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => {
              return (
                <div className={`section-item ${item == 3 && 'acitve'}`} key={item}>
                  <p>10/23</p>
                  <p>周四</p>
                  <p className="price">¥1750</p>
                </div>
              )
            })}
          </div>
          <div className="kcalendar-more">
            <div className="more-btn" onClick={() => setVisible(true)}>
              查看更多
            </div>
          </div>
        </div>
        <div className="kcalendar-box">
          <div className="kcalendar-item-l">
            出发<span>{text} 周五（10/26 周日返程）</span>
          </div>
          <div className="kcalendar-item-r">
            <span className="kcitem-tag">库存：11</span>
          </div>
        </div>
      </div>
      <Calendar
        title="选择出发日期"
        onClose={() => set(false)}
        visible={visible}
        showConfirm={false}
        color="#4dcfc5"
        className="abs-ady"
        formatter={formatter}
        onConfirm={onConfirms}
      />
    </>
  )
}

export default KnownCalendarCard
