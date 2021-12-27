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

const isCalendarDisabled = (time, timelist: any[] = []) => {
  time = dayjs(time.date).format('YYYY-MM-DD')
  const timestate = timelist.find((item) => {
    return item.startDate == time
  })
  // return false
  if (timestate) {
    return {
      bottomInfo: timestate.personMarkPrice,
      type: '',
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
  const calendarRef = useRef<CalendarInstance>()
  const [visible, setVisible] = useState(false)
  const [selectedcalen, setSelectedcalen] = useState({})
  const [stepinfo, setStepinfo] = useState<KnownCalendarType>()

  useEffect(() => {
    setStepinfo(props)
    setSelectedcalen(props.selecttime)
  }, [props])

  useEffect(() => {
    calendarRef.current.reset(dayjs(selectedcalen?.startDate).toDate())
  }, [selectedcalen])

  const onConfirms = (date) => {
    // calendarRef.current.scrollToDate(date)
    console.log('date :>> ', date)
    const dateStr = dayjs(date).format('YYYY-MM-DD')
    console.log('dateStr :>> ', dateStr)
    const dayitem = stepinfo['calendata']?.find((item) => {
      return item.startDate == dateStr
    })

    console.log('dayitem :>> ', dayitem)
    setSelectedcalen(dayitem)
    setVisible(false)
    props.selectedHandelCalend(dayitem)
  }

  const onHandelSelected = (item) => {
    setSelectedcalen(item)
    props.selectedHandelCalend(item)
  }
  const set = (b) => {
    setVisible(b)
  }
  const formatter = (day) => {
    const dayitem = isCalendarDisabled(day, stepinfo?.calendata)

    if (dayitem.type == 'disabled') {
      day.type = 'disabled'
    } else {
      day.bottomInfo = `¥${dayitem.bottomInfo/RMB_CON}`
    }
    return day
  }

  return (
    <>
      <div className="KCalendar-container">
        <div className="kcalendar-box">
          <div className="kcalendar-section">
            {stepinfo?.calendata.map((item) => {
              return (
                <div
                  className={`section-item ${item.startDate == selectedcalen?.startDate && 'acitve'}`}
                  key={item.goodsPriceId}
                  onClick={() => {
                    onHandelSelected(item)
                  }}
                >
                  <p>{dayjs(item.startDate).format('MM-DD')}</p>
                  <p>{WeekMap[dayjs(item.startDate).format('d')]}</p>
                  <p className="price">¥{item.personMarkPrice/ RMB_CON}</p>
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
            出发<span>{selectedcalen?.startDate} </span>
          </div>
          <div className="kcalendar-item-r">
            <span className="kcitem-tag">库存：{selectedcalen?.stock}</span>
          </div>
        </div>
      </div>
      <Calendar
        ref={calendarRef}
        title="选择出发日期"
        onClose={() => set(false)}
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
function ref<T>() {
  throw new Error('Function not implemented.')
}
