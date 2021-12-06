import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import pic from '@/assets/img/shg.png'
import { SHBridge } from '@/jsbridge'
/**
 * 我的行程
 */
const MyTravelPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedIndex2, setSelectedIndex2] = useState(0)
  const [selectPage, setSelectPage] = useState(0)
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  const travelList = [
    {
      orderName: '三亚5日自由行(5钻)·直减300『高星4…',
      date: '10/22 周五出发 10/26 周二返程',
    },
    {
      orderName: '三亚5日自由行(5钻)·直减300『高星4…',
      date: '10/22 周五出发 10/26 周二返程',
    },
    {
      orderName: '三亚5日自由行(5钻)·直减300『高星4…',
      date: '10/22 周五出发 10/26 周二返程',
    },
  ]
  const list = []

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
  const toDetails = () => {
    // ('/myTravel/details')
    window.location.href = '/myTravel/details'
  }
  return (
    <div className="MyTravelPage__root">
      <div className="travel">
        <div className="no-travel">
          <div>“您当前没有行程”</div>
          <div>多逛逛，开启新的旅途</div>
        </div>
      </div>
      <div className="history">历史行程</div>
      <div className="list">
        {travelList.map((item, index) => {
          return (
            <div className="item" key={index} onClick={toDetails}>
              <div className="month">2021年9月</div>
              <div className="order-name">
                <img className="pic" src={pic} alt="" />
                <div>
                  <div className="on"> {item.orderName}</div>
                  <div className="up">{item.date}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div></div>

      {/* <div className="list" id="list" onScroll={onScroll}>
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
      </div> */}
      {/* <div className="footer">行程结束</div> */}
    </div>
  )
}

export default MyTravelPage
