import React, { useState, useEffect, FC } from 'react'

import { Icon, ActionSheet, Cell, Radio } from 'react-vant'
import './index.less'
/**
 * 退款原因选择卡片
 */

const RefundReasonCard: FC = ({ onchangeReason, defaultValue }) => {
  const [visible, setHandelVisible] = useState(false)
  const [actionvalue, setHandelActionvalue] = useState({ name: '', id: '' })
  const setVisible = (b) => {
    setHandelVisible(b)
  }
  const TabActions = [
    { name: '七天无理由退款', id: '1' },
    { name: '选项二', id: '2' },
    { name: '选项三', id: '3' },
    { name: '选项四', id: '4' },
    { name: '七天无', id: '5' },
    { name: '选项六', id: '6' },
    { name: '选项七', id: '7' },
    { name: '选项八', id: '8' },
  ]

  useEffect(() => {
    if (defaultValue) {
      const isactions = TabActions.find((item) => {
        console.log('itemitemitem :>> ', item)
        return item.name == defaultValue.reason
      })
      setHandelActionvalue(isactions ? isactions : { name: '', id: '' })
    }
  }, [defaultValue])

  const setCellHandel = (item) => {
    console.log('item :>> ', item)
    setHandelActionvalue(item)
    setVisible(false)
  }

  useEffect(() => {
    onchangeReason({
      reason: actionvalue.name,
    })
  }, [actionvalue])

  return (
    <div className="refundreason-card">
      <div className="refundreason-name">退款原因</div>
      <div className="refundreason-select" onClick={() => setVisible(true)}>
        <span>{actionvalue.name ? actionvalue.name : '请选择'}</span>
        <Icon color="#999999" name="arrow" />
      </div>
      <ActionSheet title="退款原因" visible={visible} onCancel={() => setVisible(false)}>
        <div className="action-main">
          <Radio.Group value={actionvalue.id}>
            <Cell.Group>
              {TabActions.map((item) => {
                return (
                  <Cell
                    key={item.id}
                    title={item.name}
                    onClick={() => setCellHandel(item)}
                    rightIcon={<Radio name={item.id} />}
                  />
                )
              })}
            </Cell.Group>
          </Radio.Group>
        </div>
      </ActionSheet>
    </div>
  )
}

export default RefundReasonCard
