import React, { useState, useEffect, useRef, FC } from 'react'
import dayjs from 'dayjs'
import { Calendar, ConfigProvider } from 'react-vant'
import type { CalendarInstance } from 'react-vant'
import './index.less'
/**
 * 已知日期日历选择卡片
 */
const RMB_CON = 1000
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
      bottomInfo: timestate.personCurrentPrice,
      type: '',
      ...timestate,
    }
  } else {
    return {
      type: 'disabled',
    }
  }
}
const themeVars = {
  '--rv-calendar-header-title-height': 0,
  '--rv-calendar-popup-height': '10%',
}
interface KnownCalendarType {
  calendata?: any[] //可选时间 集合
  selecttime: any //选中时间
  selectedHandelCalend: (val) => void //时间选择回调函数
}

const KnownCalendarCard: FC<KnownCalendarType> = ({ calendata = [], selecttime, selectedHandelCalend }) => {
  const refContainer = useRef<any>(null)
  const activeRef = useRef(null)

  //ref获取日历方法
  const calendarRef = useRef<CalendarInstance>()
  //显隐日历
  const [visible, setVisible] = useState(false)

  //监听数据改变更改日历对应时间高亮
  useEffect(() => {
    calendarRef.current.reset(dayjs(selecttime?.startDate).toDate())
    if (selecttime && activeRef.current) {
      // console.log(activeRef.current);
      onTransformScroll(activeRef.current)
    }
  }, [selecttime])

  //日期选择确定
  const onConfirms = (date) => {
    console.log('object执行时间选择 :>> ', date)
    const dateStr = dayjs(date).format('YYYY-MM-DD')
    const dayitem = calendata?.find((item) => {
      return item.startDate == dateStr
    })

    setVisible(false)
    selectedHandelCalend(dayitem)
  }
  //父组件发送数据
  const onHandelSelected = (item) => {
    selectedHandelCalend(item)
  }
  //格式化日历对应数据
  const formatter = (day) => {
    const dayitem = isCalendarDisabled(day, calendata)

    if (dayitem.type == 'disabled') {
      day.type = 'disabled'
    } else {
      day.topInfo = `库存${dayitem.stock}`
      day.bottomInfo = `¥${dayitem.bottomInfo / RMB_CON}`
    }
    return day
  }
  const setHnadelVisible = () => {
    if (!visible) {
      setVisible(true)
    }
  }
  const onTransformScroll = (target, animation = 'smooth') => {
    // 计算当前标签到最左侧的宽度,本身的宽度
    const { offsetLeft: itemLeft, offsetWidth: itemWidth } = target
    // 可移动区域宽度
    const { offsetWidth: containerWidth } = refContainer.current
    // 当前标签中心点到最左侧的距离
    const curCenter = itemLeft + itemWidth / 2
    // 可移动区域中心点（减去的30是列表两边的15像素的留白）
    const center = (containerWidth - 60) / 2

    // console.log(curCenter, center);
    if (curCenter > center) {
      refContainer.current.scrollTo({
        left: curCenter - center,
        behavior: animation,
      })
    } else {
      refContainer.current.scrollTo({
        left: 0,
        behavior: animation,
      })
    }
  }

  const TitleDom = () => {
    return (
      <div className="kcalendar-title-b">
        <p>选择出发日期</p>
        {/* <div className='kcalendar-save-btn'>确认</div> */}
      </div>
    )
  }

  return (
    <>
      <div className="KCalendar-container">
        <div className="kcalendar-box">
          <div className="kcalendar-section" ref={refContainer}>
            {calendata?.map((item) => {
              return (
                <div
                  className={`section-item ${item.startDate == selecttime?.startDate && 'acitve'}`}
                  key={item.goodsPriceId}
                  ref={item.startDate == selecttime?.startDate ? activeRef : null}
                  onClick={() => {
                    onHandelSelected(item)
                  }}
                >
                  <p>{dayjs(item.startDate).format('MM-DD')}</p>
                  <p>{WeekMap[dayjs(item.startDate).format('d')]}</p>
                  <p className="price">¥{item.personCurrentPrice / RMB_CON}</p>
                </div>
              )
            })}
          </div>
          {calendata.length > 4 ? (
            <div className="kcalendar-more">
              <div className="more-btn" onClick={() => setHnadelVisible()}>
                查看更多
              </div>
            </div>
          ) : null}
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
      <ConfigProvider themeVars={themeVars}>
        <Calendar
          ref={calendarRef}
          title="选择出发日期"
          weekdays={['周日', '周一', '周二', '周三', '周四', '周五', '周六']}
          onClose={() => setVisible(false)}
          visible={visible}
          showConfirm={false}
          color="#4dcfc5"
          rowHeight={'17.06667vw'}
          formatter={formatter}
          showMark={false}
          // formatMonthTitle={(date) => ``}
          title={<TitleDom />}
          onConfirm={onConfirms}
        />
      </ConfigProvider>
    </>
  )
}

export default KnownCalendarCard
