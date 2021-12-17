import React, { useState, FC, useImperativeHandle, useRef, forwardRef } from 'react'
import clsx from 'clsx'
import { ConfigProvider, Image, Empty } from 'react-vant'
import './index.less'

/**
 * 员工数据板 切换今天 近7天 近30天 全部
 */
interface PropsType {
  groupBtnData: Array<any>
  setCheckedValue: any
}
const SalesRanking: FC<PropsType> = (props) => {
  const [btnGroupData, setBtnGroupData] = useState([...props.groupBtnData])
  const changeBtnActive = (item) => {
    if (btnGroupData[item].isactive) return
    props.setCheckedValue(item)
    const newbtnGroupData = btnGroupData.map((current, index) => {
      return {
        ...current,
        isactive: item === index,
      }
    })
    setBtnGroupData([...newbtnGroupData])
  }
  return (
    <div className="market-box-top">
      <ul className="market-group">
        {btnGroupData.map((item, index) => {
          return (
            <li className={clsx('market-button', { 'is-active': item.isactive })} key={index}>
              <span
                className="market-button-inner"
                onClick={() => {
                  changeBtnActive(index)
                }}
              >
                {item.text}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default SalesRanking
