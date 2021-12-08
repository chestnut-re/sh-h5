import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import pic from '@/assets/img/successMove/success.png'
/**
 * 支付成功
 */
const SuccessMovePage: React.FC = (props) => {
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
    <div className="SuccessMovePage__root">
      <div className="btn-div">
        <button
          className="btn"
          onClick={() => {
            history.back()
          }}
        >
          完成
        </button>
      </div>
      <div className="all">
        <img className="img" src={pic} alt="" />
        <div className="num">¥100.90</div>
        <div className="text">
          {props.match.params.type == '转入'
            ? '成功转入¥100.90到运营账户'
            : props.match.params.type == '转出'
            ? '成功转出¥100.90到资金账户'
            : '提现成功'}
        </div>
      </div>
    </div>
  )
}

export default SuccessMovePage
