import React, { useState,useEffect,FC } from 'react'

import { Icon, ActionSheet, Cell, Radio } from 'react-vant'
import './index.less'
/**
 * 退款原因选择卡片
 */
const actions = [
  { name: '七天无理由退款', id: '1' },
  { name: '选项二', id: '002' },
  { name: '选项三', id: '003' },
  { name: '选项三', id: '004' },
  { name: '七天无理由退款', id: '5' },
  { name: '选项二', id: '006' },
  { name: '选项三', id: '007' },
  { name: '选项三', id: '008' },
]

const RefundReasonCard:FC = ({onchangeReason}) => {
  const [visible, setHandelVisible] = useState(false)
  const [actionvalue, setHandelActionvalue] = useState({name:"",id:""})
  const setVisible = (b) => {
    setHandelVisible(b)
  }
  const setCellHandel = (item) => {
    console.log('item :>> ', item);
    setHandelActionvalue(item)
    setVisible(false)
  }

  useEffect(() => {
    onchangeReason({
      reason:actionvalue.name
    })
  }, [actionvalue])

  return (
    <div className="refundreason-card">
      <div className="refundreason-name">退款原因</div>
      <div className="refundreason-select" onClick={() => setVisible(true)}>
        <span>{actionvalue.name?actionvalue.name:"请选择"}</span>
        <Icon color="#999999" name="arrow" />
      </div>
      <ActionSheet title="退款原因" visible={visible} onCancel={() => setVisible(false)}>
        <div className="action-main">
          <Radio.Group value={actionvalue.id}>
            <Cell.Group>
              {actions.map((item) => {
                return <Cell key={item.id} title={item.name} onClick={() => setCellHandel(item)} rightIcon={<Radio name={item.id} />} />
              })}
            </Cell.Group>
          </Radio.Group>
        </div>
      </ActionSheet>
    </div>
  )
}

export default RefundReasonCard
