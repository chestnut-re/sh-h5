import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import pic from '@/assets/img/shg.png'
import { SHBridge } from '@/jsbridge'
/**
 * 账户资金
 */
const UserCapitalPage: React.FC = () => {
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
    <div className="UserCapitalPage__root">
      <div className="one">可用金额</div>
      <div className="two">¥23999.01</div>
      <div>
        <button className="btn">提现</button>
      </div>
      <div className="three">
        <div>锁定金额</div>
        <div>¥10000.89</div>
      </div>
      <div>提现记录</div>
    </div>
  )
}

export default UserCapitalPage
