import { type } from 'os'
import React, { useState, useEffect, FC } from 'react'
import {
  hooks,
  Popover,
  Form,
  Radio,
  Flex,
  Toast,
  Popup,
  DatetimePicker,
  Field,
  Calendar,
  ConfigProvider,
} from 'react-vant'

import './index.less'
/**
 * 出行人信息
 */

const infos = {
  type: 0,
  value: '',
}
const actions = [
  { text: '身份证', disabled: false },
  { text: '护照', disabled: false },
]

const OptionalInfo: FC = () => {
  const [value2, setvalue2] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [infolist, setInfolist] = useState([])

  useEffect(() => {
    setInfolist([infos])
  }, [])

  const addOptionalInfo = () => {
    setInfolist([...infolist, infos])
  }
  const deleteHandelOptional = (i) => {
    const newInfolist = infolist.filter((item, index) => {
      return index != i
    })
    console.log('i :>> ', i, newInfolist)
    setInfolist([...newInfolist])
  }

  return (
    <div className="optional-info">
      <div className="optional-info-text">儿童选填</div>
      {infolist.map((item, index) => {
        return (
          <div className="optional-info-content">
            <div className="oic-item rv-hairline--bottom">
              <div className="oic-item-label oic-item-card">
                <Popover actions={actions} placement="bottom-start" reference={<span>身份证</span>} />
              </div>
              <div className="oic-item-content">
                <Field className="oic-input" value={value2} placeholder="请填写正确的证件号码" />
              </div>
            </div>
            <div className="oic-item rv-hairline--bottom">
              <div className="oic-item-label oic-label-c">有效期至</div>
              <div className="oic-item-content">
                <Field
                  isLink
                  readonly
                  value={value2}
                  onClick={() => {
                    setShowPicker(true)
                  }}
                  placeholder="请选择"
                />
              </div>
            </div>
            {infolist.length > 1 && (
              <div
                className="optional-info-del"
                onClick={() => {
                  deleteHandelOptional(index)
                }}
              ></div>
            )}
            {infolist.length > 1 && <div className="oic-line"></div>}
          </div>
        )
      })}
      {infolist.length <= 1 && (
        <div>
          <div className="optional-add  rv-hairline--top">
            <div
              className="optional-add-btn"
              onClick={() => {
                addOptionalInfo()
              }}
            >
              添加证件
            </div>
          </div>
          <div className="oic-line"></div>
        </div>
      )}

      <Popup visible={showPicker} round position="bottom" onClose={() => setShowPicker(false)}>
        <DatetimePicker
          onConfirm={(value: string) => {
            setShowPicker(false)
          }}
          type="date"
          minDate={new Date(2021, 11, 21)}
          maxDate={new Date(2221, 1, 1)}
          value={new Date()}
        />
      </Popup>
    </div>
  )
}

export default OptionalInfo
