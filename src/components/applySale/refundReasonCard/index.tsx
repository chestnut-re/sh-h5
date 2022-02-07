import React, { useState, useEffect, FC } from 'react'
import { RefundApis } from '@/service/RefundApply'
import { Icon, ActionSheet, Cell, Radio } from 'react-vant'
import activeIcon from '@/assets/img/active_Icon@3x.png'
import inactiveIcon from '@/assets/img/inactiveIcon@3x.png'
import './index.less'
/**
 * 退款原因选择卡片
 */

interface Refundtype {
  onchangeReason: (val) => void
  defaultValue: any
}

const RefundReasonCard: FC<Refundtype> = ({ onchangeReason, defaultValue }) => {
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
    })
  }, [])

  useEffect(() => {
    if (defaultValue) {
      console.log('defaultValue :>> ', defaultValue, TabActions)
      const { reason } = defaultValue
      const isactions = TabActions.find((item) => {
        return item.name == reason
      })
      console.log('isactions', isactions)
      setHandelActionvalue(isactions ? isactions : { name: '', id: '' })
    }
  }, [defaultValue, TabActions])

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
            <Cell.Group border={false}>
              {TabActions.map((item) => {
                return (
                  <Cell
                    key={item.id}
                    title={item.name}
                    onClick={() => setCellHandel(item)}
                    rightIcon={
                      <Radio
                        name={item.id}
                        iconRender={({ checked: isActive }) => (
                          <img
                            alt=""
                            className="img-icons"
                            style={{ width: '4.8vw' }}
                            src={isActive ? activeIcon : inactiveIcon}
                          />
                        )}
                      />
                    }
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
