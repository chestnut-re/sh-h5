import React, { useState } from 'react'
import { Divider, Calendar, Popover } from 'react-vant'
import './index.less'

/**
 * 激励管理-创建
 */
const CreateIncentivePage = () => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')

  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
  const onConfirm = (rangetime) => {
    const time = `${formatDate(rangetime[0])} - ${formatDate(rangetime[1])}`
    setText(time)
    setVisible(false)
    console.log(text)
  }
  const actions = [{ text: '可用金额30000', color: '#ffffff', className: 'action' }]
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
          <input type="text" value={text} onClick={() => setVisible(true)} />
          <Calendar type="range" visible={visible} onConfirm={onConfirm} />
          <span className="jiantou" onClick={() => setVisible(true)}></span>
        </div>
        <Divider style={{ margin: 0 }} />
        <div className="create-sale">
          <span className="sale">销售额目标</span>
          <input placeholder="请输入" type="text" />
          <span className="yuan">元</span>
        </div>
        <Divider style={{ margin: 0 }} />
        <Popover
          theme="dark"
          actions={actions}
          placement="top"
          reference={
            <div className="create-amount">
              <span>激励金额</span>
              <input placeholder="请输入" type="text" />
              <span className="yuan">元</span>
            </div>
          }
        />

        <Divider style={{ margin: 0 }} />
      </div>
    </div>
  )
}
export default CreateIncentivePage
