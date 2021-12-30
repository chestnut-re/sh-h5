import React, { useState, useEffect, useRef, FC } from 'react'
import dayjs from 'dayjs'
import { Calendar } from 'react-vant'
import type { CalendarInstance } from 'react-vant'
import './index.less'
/**
 * 已知日期日历选择卡片
 */
const RMB_CON = 100
const WeekMap = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
}
//判断当前日历是否可选
const isCalendarDisabled = (time, timelist: any[] = []) => {
  time = dayjs(time.date).format('YYYY-MM-DD')
  const timestate = timelist.find((item) => {
    return item.startDate == time
  })

  if (timestate) {
    return {
      bottomInfo: timestate.personMarkPrice,
      type: timestate.stock==0?'disabled':'',
      ...timestate,
    }
  } else {
    return {
      type: 'disabled',
    }
  }
}

interface KnownCalendarType {
  calendata?: any[] //可选时间 集合
  selecttime: any //选中时间
  selectedHandelCalend: (val) => void //时间选择回调函数
}

const KnownCalendarCard: FC<KnownCalendarType> = (props) => {
  const { calendata=[], selecttime } = props
  //ref获取日历方法
  const calendarRef = useRef<CalendarInstance>()
  //显隐日历
  const [visible, setVisible] = useState(false)
  //监听数据改变更改日历对应时间高亮
  useEffect(() => {
    calendarRef.current.reset(dayjs(selecttime?.startDate).toDate())
  }, [selecttime])

  //日期选择确定
  const onConfirms = (date) => {
    const dateStr = dayjs(date).format('YYYY-MM-DD')
    const dayitem = calendata?.find((item) => {
      return item.startDate == dateStr
    })

    setVisible(false)
    props.selectedHandelCalend(dayitem)
  }
  //父组件发送数据
  const onHandelSelected = (item) => {
    props.selectedHandelCalend(item)
  }
  //格式化日历对应数据
  const formatter = (day) => {
    const dayitem = isCalendarDisabled(day, calendata)

    if (dayitem.type == 'disabled') {
      day.type = 'disabled'
    } else {
      day.bottomInfo = `¥${dayitem.bottomInfo / RMB_CON}`
    }
    return day
  }

  return (
    <>
      <div className="KCalendar-container">
        <div className="kcalendar-box">
          <div className="kcalendar-section">
            {calendata?.map((item) => {
              return (
                <div
                  className={`section-item ${item.startDate == selecttime?.startDate && 'acitve'}`}
                  key={item.goodsPriceId}
                  onClick={() => {
                    onHandelSelected(item)
                  }}
                >
                  <p>{dayjs(item.startDate).format('MM-DD')}</p>
                  <p>{WeekMap[dayjs(item.startDate).format('d')]}</p>
                  <p className="price">¥{item.personMarkPrice / RMB_CON}</p>
                </div>
              )
            })}
          </div>
          {calendata.length>4?(<div className="kcalendar-more">
            <div className="more-btn" onClick={() => setVisible(true)}>
              查看更多
            </div>
          </div>):null}
        </div>
        <div className="kcalendar-box">
          <div className="kcalendar-item-l">
            出发<span>{selecttime?.startDate} </span>
          </div>
          <div className="kcalendar-item-r">
            <span className="kcitem-tag">库存：{selecttime?.stock}</span>
          </div>
        </div>
      </div>
      <Calendar
        ref={calendarRef}
        title="选择出发日期"
        weekdays={['周日', '周一', '周二', '周三', '周四', '周五', '周六']}
        onClose={() => setVisible(false)}
        visible={visible}
        showConfirm={false}
        color="#4dcfc5"
        formatter={formatter}
        onConfirm={onConfirms}
      />
    </>
  )
}

export default KnownCalendarCard
