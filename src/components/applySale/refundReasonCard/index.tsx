import React, { useState, useEffect, FC } from 'react'
import { RefundApis } from '@/service/RefundApply'
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
  const [TabActions, setTabActions] = useState([])

  useEffect(() => {
    RefundApis.reason({
      current: 1,
      size: 100,
      dictCode: 'HD1',
    }).then((res) => {
      const { code, data } = res
      if (code === '200' && data) {
        const { records } = data
        setTabActions(() => {
          const newrecords = records.map((item) => {
            return {
              name: item.dictValue ? item.dictValue : '-',
              id: item.id,
            }
          })

          return [...newrecords]
        })
      }
      console.log('res退款政策 :>> ', res)
    })
  }, [])

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
