import React, { useState } from 'react'
import { Divider, Calendar, Popover } from 'react-vant'
import AddTarget from '@/assets/img/add_target@3x.png'
import DeleteTarget from '@/assets/img/delete_target@3x.png'
import './index.less'

/**
 * kpi管理-创建
 */
const KpiCreatePage: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [basics, setBasics] = useState(true)
  const [second, setSecond] = useState(true)
  const [third, setThird] = useState(false)
  const [text, setText] = useState('')

  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
  const onConfirm = (rangeTime) => {
    const time = `${formatDate(rangeTime[0])} - ${formatDate(rangeTime[1])}`
    setText(time)
    setVisible(false)
    console.log(text)
  }
  return (
    <div className="create">
      <div className="create-con">
        <div className="create-name">
          <span>方案名称</span>
          <input placeholder="请输入" type="text" />
        </div>
        <Divider style={{ margin: 0 }} />
        <div className="create-time">
          <span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间</span>
          <input
            type="text"
            value={text}
            onClick={() => setVisible(true)}
            placeholder="开始时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结束时间"
          />
          <Calendar color="#32D0C6" type="range" visible={visible} onConfirm={onConfirm} />
          <span className="jiantou" onClick={() => setVisible(true)}></span>
        </div>
        <Divider style={{ margin: 0 }} />
        <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
          <span className="create-sale">
            <span className="sale">基础目标</span>
            <input placeholder="请输入" type="text" />
            <span className="yuan">元</span>
          </span>
          <span className="create-amount">
            <span>绩效佣金</span>
            <input placeholder="请输入" type="text" />
            <span className="yuan">%</span>
          </span>
          {basics ? <img className="add-target" src={AddTarget} alt="" onClick={() => setBasics(false)} /> : null}
        </div>
        <Divider style={{ margin: 0 }} />
        {!basics ? (
          <div>
            <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
              <span className="create-sale">
                <span className="sale">二阶目标</span>
                <input placeholder="请输入" type="text" />
                <span className="yuan">元</span>
              </span>
              <span className="create-amount">
                <span>绩效佣金</span>
                <input placeholder="请输入" type="text" />
                <span className="yuan">%</span>
              </span>
              {second ? (
                <div>
                  <img className="delete-target" src={DeleteTarget} alt="" onClick={() => setBasics(true)} />
                  <img
                    className="add-target1"
                    src={AddTarget}
                    alt=""
                    onClick={() => {
                      setThird(true)
                      setSecond(false)
                    }}
                  />
                </div>
              ) : null}
            </div>
            <Divider style={{ margin: 0 }} />
          </div>
        ) : null}
        {third ? (
          <div>
            <div style={{ overflow: 'hidden' }}>
              <span className="create-sale">
                <span className="sale">三阶目标</span>
                <input placeholder="请输入" type="text" />
                <span className="yuan">元</span>
              </span>
              <span className="create-amount">
                <span>绩效佣金</span>
                <input placeholder="请输入" type="text" />
                <span className="yuan">%</span>
              </span>
              <div>
                <img
                  className="delete-target"
                  src={DeleteTarget}
                  alt=""
                  onClick={() => {
                    setThird(false)
                    setSecond(true)
                  }}
                />
                <img className="add-target1" src={AddTarget} alt="" />
              </div>
            </div>
            <Divider style={{ margin: 0 }} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default KpiCreatePage
