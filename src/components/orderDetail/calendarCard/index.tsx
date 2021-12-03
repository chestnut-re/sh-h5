import React, { useState,FC } from 'react'

import { Cell, Calendar } from 'react-vant'
import './index.less'
/**
 * 日历选择卡片
 */
const formatter = (day) => {
  const month = day.date.getMonth() + 1
  const date = day.date.getDate()

  day.bottomInfo = '1798'
  if (day.type === 'start') {
    day.topInfo = '开始'
  } else if (day.type === 'end') {
    day.topInfo = '结束'
  }

  return day
}

const CalendarCard:FC = (props) => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`
  const onConfirms = (start, end) => {
    setText(`${formatDate(start)} - ${formatDate(end)}`)
    setVisible(false)
  }
  const set = (b) => {
    setVisible(b)
  }
  return (
    <>
      <Cell title="日历占位选择出发日期" value={text} onClick={() => setVisible(true)} />
      <Calendar
        title="选择出发日期"
        type="range"
        onClose={() => set(false)}
        visible={visible}
        showConfirm={false}
        color="#4dcfc5"
        formatter={formatter}
        onConfirm={(v) => onConfirms(v[0], v[1])}
      />
    </>
  )
}

export default CalendarCard
