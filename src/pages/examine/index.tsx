import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import review from '@/assets/img/token/review.png'
/**
 * 审核中
 */
const ExaminePage: React.FC = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedIndex2, setSelectedIndex2] = useState(0)
  const [selectPage, setSelectPage] = useState(0)
  // useEffect(() => {
  //   console.log(props.match.params.type)
  //   window.addEventListener('scroll', onScroll)
  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //   }
  // }, [])

  // useDebouncedEffect(
  //   () => {
  //    setSelectedIndex2(selectedIndex)
  //   },
  //   [selectedIndex],
  //   200
  // )
  return (
    <div className="ExaminePage__root">
      <div className="header">
        <img className="img" src={review} />
        <div className="title">审核中</div>
        <div className="text">申请提现成功，工作人员将和您联系，请您耐心等待！</div>
        <button className="btn">返回首页</button>
      </div>
    </div>
  )
}

export default ExaminePage
