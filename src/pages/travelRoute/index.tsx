import React, { useEffect, useState, useRef } from 'react'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import { useLocation } from 'react-router-dom'
import { getUrlParams } from '@/utils'
import qs from 'query-string'
import { TravelDetailService } from '@/service/TravelDetailService'

import './index.less'

/**
 * 参考行程
 */
const TravelRoutePage: React.FC = () => {
  const pageRef = useRef<any>({})
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedIndex2, setSelectedIndex2] = useState(0)
  const [days, setDays] = useState<any[]>([])
  useEffect(() => {
    const params = getUrlParams(window.location.href)
    pageRef.current.id = params['id']
    pageRef.current.goodsPriceId = params['goodsPriceId']
    console.log(params['id'])
    window.addEventListener('scroll', onScroll)
    //获取参考行程
    TravelDetailService.get({ goodsId: pageRef.current.id, goodsPriceId: pageRef.current.goodsPriceId }).then((res) => {
      console.log(res)
      setDays(res.data)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useDebouncedEffect(
    () => {
      console.log('selectedIndex', selectedIndex)

      setSelectedIndex2(selectedIndex)
    },
    [selectedIndex],
    200
  )

  const tabClickHandle = (index) => {
    const length = days.length
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
          {days?.map((item, index) => {
            const isSelected = selectedIndex2 === index
            return (
              <li
                className={isSelected ? 'item1' : 'item'}
                onClick={() => {
                  tabClickHandle(index)
                }}
                key={index}
              >
                {item.whatDay}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="list" id="list" onScroll={onScroll}>
        {days?.map((item, index) => {
          return (
            <div id={`title${index}`} className="itemList" key={index}>
              <div className="itemHeader">
                <span className="itemDay">{item.whatDay}</span>
                <span>{item.date ?? ''}</span>
              </div>
              {item.travelDetails?.map((it, index) => {
                return (
                  <div className="itemPoint" key={index}>
                    <div className="itemTime">{it.travelTime}</div>
                    <span className="point"></span>
                    <div className="item-title">{it.travelTitle}</div>
                  </div>
                )
              })}
              {/* <div className="itemPoint">
                <div className="itemTime">{item.time6}</div>
                <span className="lastPoint"></span>
                {item.point6}
              </div> */}
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
