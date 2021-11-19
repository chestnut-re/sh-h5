import React, { useEffect, useState } from 'react'
import { useStore } from '@/store/context'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'

/**
 * 参考行程
 */
const TravelRoutePage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedIndex2, setSelectedIndex2] = useState(0)
  const [selectPage, setSelectPage] = useState(0)
  const store = useStore()
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  const tabList = [
    {
      tabName: '第一天',
      id: 1,
    },
    {
      tabName: '第二天',
      id: 2,
    },
    {
      tabName: '第三天',
      id: 3,
    },
    {
      tabName: '第四天',
      id: 4,
    },
    {
      tabName: '第五天',
      id: 5,
    },
    {
      tabName: '第六天',
      id: 6,
    },
    {
      tabName: '第七天',
      id: 7,
    },
    {
      tabName: '第八天',
      id: 8,
    },
    {
      tabName: '第九天',
      id: 9,
    },
  ]
  const list = [
    {
      day: '第1天',
      date: '10/22',
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
      day: '第2天',
      date: '10/23',
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
      day: '第3天',
      date: '10/24',
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
      day: '第4天',
      date: '10/25',
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
      day: '第5天',
      date: '10/26',
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
      day: '第6天',
      date: '10/27',
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
      day: '第7天',
      date: '10/28',
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
      day: '第8天',
      date: '10/29',
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
      day: '第9天',
      date: '10/30',
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
  ]

  useDebouncedEffect(
    () => {
      console.log('selectedIndex', selectedIndex)

      setSelectedIndex2(selectedIndex)
    },
    [selectedIndex],
    200
  )

  const tabClickHandle = (index) => {
    const length = tabList.length
    console.log(length, selectedIndex, index)
    // 滚动到的位置，如果点击当前后面的某个就让被点击的后面两个进入视口。如果点的是当前前面的某个
    // 就让被点击的前面两个滚动进视口
    let scrollIndex = selectedIndex > index ? index - 2 : index + 2
    console.log(scrollIndex)
    // 边界判定
    if (scrollIndex > length - 1) {
      scrollIndex = length - 1
    }
    if (scrollIndex < 0) {
      scrollIndex = 0
    }

    const element = document.getElementsByTagName('li')[scrollIndex]

    // 使用behavior:smooth定义动画过渡效果。block:定义垂直对齐方向。inline:定义水平对齐方向。
    element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    // setTimeout(() => {
    setSelectedIndex2(index)
    // }, 3000)

    console.log(selectedIndex, index)
    const selectElement = document.getElementById(`title${index}`)
    if (selectElement) {
      selectElement.scrollIntoView({ behavior: 'smooth' })
    }
  }
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

  // const onTouchMove = (e) => {
  //   isDragging = true

  //   if (pageY > e.touches[0].pageY) {
  //     console.log('👆')
  //   } else if (pageY < e.touches[0].pageY) {
  //     console.log('👇')
  //   }
  // }

  // const onTouchEnd = () => {
  //   isDragging = false
  // }
  return (
    <div className="TravelRoute__root">
      <div className="tabBox">
        <ul className="tab">
          {tabList.map((item, index) => {
            const isSelected = selectedIndex2 === index
            return (
              <li
                className={isSelected ? 'item1' : 'item'}
                onClick={() => {
                  tabClickHandle(index)
                }}
                key={index}
              >
                {item.tabName}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="list" id="list" onScroll={onScroll}>
        {list.map((item, index) => {
          return (
            <div id={`title${index}`} className="itemList" key={index}>
              <div className="itemHeader">
                <span className="itemDay">{item.day}</span>
                <span>{item.date}</span>
              </div>

              <div className="itemPoint">
                <div className="itemTime">{item.time1}</div>
                <span className="point"></span>
                {item.point1}
              </div>
              <div className="itemPoint">
                <div className="itemTime">{item.time2}</div>
                <span className="point"></span>
                {item.point2}
              </div>
              <div className="itemPoint">
                <div className="itemTime">{item.time3}</div>
                <span className="point"></span>
                {item.point3}
              </div>
              <div className="itemPoint">
                <div className="itemTime">{item.time4}</div>
                <span className="point"></span>
                {item.point4}
              </div>
              <div className="itemPoint">
                <div className="itemTime">{item.time5}</div>
                <span className="point"></span>
                {item.point5}
              </div>
              <div className="itemPoint">
                <div className="itemTime">{item.time6}</div>
                <span className="lastPoint"></span>
                {item.point6}
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">行程结束</div>
      {/* <div className={`tabContent`}>
        {item.day} {item.date}
        <p>{item.point1}</p>
        <p>{item.point2}</p>
        <p>{item.point3}</p>
        <p>{item.point4}</p>
        <p>{item.point5}</p>
        <p>{item.point6}</p>
      </div> */}
    </div>
  )
}

export default TravelRoutePage
