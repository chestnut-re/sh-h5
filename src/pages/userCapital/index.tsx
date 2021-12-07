import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import pic from '@/assets/img/shg.png'
import tip from '@/assets/img/capital/tip.png'
import jump from '@/assets/img/capital/jump.png'
import tips from '@/assets/img/capital/tips.png'
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
      <div className="top">
        <div className="one">
          <div>可用金额</div> <img className="pic" src={tip} alt="" />
        </div>
        <div className="two">
          <span>¥</span>
          <span className="num">&nbsp;23999.01</span>
        </div>
        <div className="three">
          <div>冻结资金 ¥10000</div>
          <img className="pic" src={tips} alt="" />
        </div>
      </div>
      <div className="btn">
        <button className="btn">提现</button>
      </div>
      <button>提现成功</button>
      <div className="footer">
        <div>提现记录</div>
        <img className="pic" src={jump} alt="" />
      </div>
    </div>
  )
}

export default UserCapitalPage
