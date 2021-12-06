import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import pic from '@/assets/img/shg.png'

/**
 * 行程详情
 */
const travelDetailsPage: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedIndex, setSelectedIndex] = useState(0)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedIndex2, setSelectedIndex2] = useState(0)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectPage, setSelectPage] = useState(0)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const travelList = [
    {
      time1: '08:30',
      point1: '已为您分配团长赵大白，请耐心等待团长与您确定出行时间',
      overDay: '2021-11-11',
    },
    {
      time1: '08:30',
      point1: '您的出行已成团，预计出行时间为2021-11-15出发',
      overDay: '2021-11-11',
    },
    {
      day: '本次行程已开始，祝您旅途愉快',
      time1: '09:30',
      time2: '13:30',
      time3: '13:30',
      time4: '15:30',
      time5: '17:30',
      time6: '18:00',
      point1: '天津 飞 三亚',
      point2: '到达亚特兰蒂斯酒店 办理豪华海景房入住',
      point3: '酒店自助午餐',
      point4: '游艇出海（含深潜、海钓、香蕉船、午餐等）',
      point5: '返回亚特兰蒂斯酒店',
      point6: '酒店自助晚餐，餐后自由安排',
    },
    {
      day: '第二天',
      time1: '09:30',
      time2: '13:30',
      time3: '13:30',
      time4: '15:30',
      time5: '17:30',
      time6: '18:00',
      point1: '天津 飞 三亚',
      point2: '到达亚特兰蒂斯酒店 办理豪华海景房入住',
      point3: '酒店自助午餐',
      point4: '游艇出海（含深潜、海钓、香蕉船、午餐等）',
      point5: '返回亚特兰蒂斯酒店',
      point6: '酒店自助晚餐，餐后自由安排',
    },
    {
      day: '第三天',
      time1: '09:30',
      time2: '13:30',
      time3: '13:30',
      time4: '15:30',
      time5: '17:30',
      time6: '18:00',
      point1: '天津 飞 三亚',
      point2: '到达亚特兰蒂斯酒店 办理豪华海景房入住',
      point3: '酒店自助午餐',
      point4: '游艇出海（含深潜、海钓、香蕉船、午餐等）',
      point5: '返回亚特兰蒂斯酒店',
      point6: '酒店自助晚餐，餐后自由安排',
    },
    {
      day: '第四天',
      time1: '09:30',
      time2: '13:30',
      time3: '13:30',
      time4: '15:30',
      time5: '17:30',
      time6: '18:00',
      point1: '天津 飞 三亚',
      point2: '到达亚特兰蒂斯酒店 办理豪华海景房入住',
      point3: '酒店自助午餐',
      point4: '游艇出海（含深潜、海钓、香蕉船、午餐等）',
      point5: '返回亚特兰蒂斯酒店',
      point6: '酒店自助晚餐，餐后自由安排',
    },
    {
      day: '第五天',
      time1: '09:30',
      time2: '13:30',
      time3: '13:30',
      time4: '15:30',
      time5: '17:30',
      time6: '18:00',
      point1: '天津 飞 三亚',
      point2: '到达亚特兰蒂斯酒店 办理豪华海景房入住',
      point3: '酒店自助午餐',
      point4: '游艇出海（含深潜、海钓、香蕉船、午餐等）',
      point5: '返回亚特兰蒂斯酒店',
      point6: '酒店自助晚餐，餐后自由安排',
    },
    {
      day: '您的行程已结束，祝您下次旅途愉快',
      overDay: '2021-11-11',
    },
  ]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useDebouncedEffect(
    () => {
      console.log('selectedIndex', selectedIndex)

      setSelectedIndex2(selectedIndex)
    },
    [selectedIndex],
    200
  )

  let isDragging = false
  const pageY = 0
  const onScroll = (e) => {
    isDragging = true
    if (isDragging) {
      const contentNode = document.getElementById('list')
      let selectPage = 0
      // console.log(e.target.scrollingElement.scrollTop)
      // console.log(contentNode.childNodes[0].clientHeight)
      if (contentNode && e.target.scrollingElement.scrollTop > contentNode.offsetTop) {
        // const stickyNode = document.getElementsByClassName('card_sticky')[0]
        let offsetY = contentNode.offsetTop + contentNode.childNodes[selectPage]['clientHeight']
        // console.log(offsetY)
        // - stickyNode.clientHeight + contentNode.childNodes[selectIndex].clientHeight;
        while (e.target.scrollingElement.scrollTop > offsetY) {
          selectPage += 1
          offsetY += contentNode.childNodes[selectPage]['clientHeight']
          // console.log(selectPage, selectedIndex, offsetY, contentNode.childNodes[selectPage].clientHeight)
        }
      }
      if (e.target.scrollingElement.scrollTop < contentNode?.childNodes[0]['clientHeight']) {
        setSelectedIndex(0)
      }
      if (selectPage !== selectedIndex) {
        setSelectedIndex(selectPage)
      }
    }
  }

  return (
    <div className="travelDetailsPage__root">
      <div className="hear-name">三亚5日自由行(5钻)·直减300『高星4晚连住』</div>
      <div className="list">
        {travelList.map((item, index) => {
          return (
            <div className="item" key={index}>
              {item.overDay ? <div className="time">{item.overDay}</div> : null}
              {item.day ? <div className="day">{item.day}</div> : null}
              {item.time1 && item.point1 ? (
                <div className="every">
                  <div className="time">{item.time1}</div>
                  <div className="text">{item.point1}</div>
                </div>
              ) : null}
              {item.time2 && item.point2 ? (
                <div className="every">
                  <div className="time">{item.time2}</div>
                  <div className="text">{item.point2}</div>
                </div>
              ) : null}
              {item.time3 && item.point3 ? (
                <div className="every">
                  <div className="time">{item.time3}</div>
                  <div className="text">{item.point3}</div>
                </div>
              ) : null}
              {item.time4 && item.point4 ? (
                <div className="every">
                  <div className="time">{item.time4}</div>
                  <div className="text">{item.point4}</div>
                </div>
              ) : null}
              {item.time5 && item.point5 ? (
                <div className="every">
                  <div className="time">{item.time5}</div>
                  <div className="text">{item.point5}</div>
                </div>
              ) : null}
              {item.time6 && item.point6 ? (
                <div className="every">
                  <div className="time">{item.time6}</div>
                  <div className="text">{item.point6}</div>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default travelDetailsPage
