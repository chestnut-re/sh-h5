import React, { useState, useEffect, FC, useImperativeHandle, forwardRef } from 'react'
import {
  Popover,
  Popup,
  DatetimePicker,
  Field,
} from 'react-vant'
import addIcon from '@/assets/img/add_icon@3x.png'

import './index.less'
/**
 * 出行人信息
 */

const infos = {
  type: 0,
  certificateNo: '',
  validity: '',
  certificateType: '身份证',
}
const actions = [
  { text: '身份证', disabled: false },
  { text: '护照', disabled: false },
]

const OptionalInfo = (props, ref) => {
  const [value2, setvalue2] = useState('')
  const [showPicker, setShowPicker] = useState(false)
  const [showPickerId, setShowPickerId] = useState()

  const [infolist, setInfolist] = useState([] as any[])
  const [newKey, setNewKey] = useState(0)

  const { certificate } = props
  useEffect(() => {
    if (certificate && certificate.length > 0) {
      certificate.map((item, index) => {
        item.type = index
        item.certificateType = item.certificateType == 0 ? '身份证' : '护照'
      })
      setInfolist([...certificate])
    } else {
      setInfolist([infos])
    }
  }, [certificate])

  const addOptionalInfo = () => {
    setNewKey(newKey + 1)
    const activeKey = `new${newKey}`
    infolist.push({ type: activeKey, certificateNo: '', certificateType: '身份证' })
    setInfolist(infolist)
  }
  const deleteHandelOptional = (i) => {
    const newInfolist = infolist.filter((item, index) => {
      return index != i
    })

    console.log('i :>> ', i, newInfolist)
    setInfolist([...newInfolist])
  }

  useImperativeHandle(ref, () => ({
    infolist: infolist,
  }))

  const onFieldChange = (value, type) => {
    const newInfolist = [...infolist]

    newInfolist.map((item, i) => {
      if (item['type'] === type) {
        item['certificateNo'] = value
      }
    })
    setInfolist(newInfolist)
  }

  const onTimeChange = (val) => {
    const d = new Date(val)
    const datetime =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1) +
      '-' +
      d.getDate() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes() +
      ':' +
      d.getSeconds()
    const newInfolist = [...infolist]

    newInfolist.map((item, i) => {
      if (item['type'] === showPickerId) {
        item['validity'] = datetime
      }
    })
    setInfolist(newInfolist)
  }

  const onSelect = (value, type) => {
    const newInfolist = [...infolist]

    newInfolist.map((item, i) => {
      if (item['type'] === type) {
        item['certificateType'] = value.text
      }
    })
    setInfolist(newInfolist)
  }

  return (
    <div className="optional-info">
      <div className="optional-info-text">儿童选填</div>
      {infolist.map((item, index) => {
        return (
          <div key={index} className="optional-info-content">
            <div className="oic-item rv-hairline--bottom">
              <div className="oic-item-label oic-item-card">
                <Popover
                  onSelect={(vals) => onSelect(vals, item['type'])}
                  actions={actions}
                  placement="bottom-start"
                  reference={<span>{item['certificateType']}</span>}
                />
              </div>
              <div className="oic-item-content">
                <Field
                  className="oic-input"
                  onChange={(val) => onFieldChange(val, item['type'])}
                  value={item['certificateNo']}
                  placeholder="请填写正确的证件号码"
                />
              </div>
            </div>
            <div className="oic-item rv-hairline--bottom">
              <div className="oic-item-label oic-label-c">有效期至</div>
              <div className="oic-item-content">
                <Field
                  isLink
                  readonly
                  value={item['validity']}
                  onClick={() => {
                    setShowPicker(true)
                    setShowPickerId(item['type'])
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
              <img className='optional-add-img' src={addIcon} />
              <div className='optional-add-txt'>添加证件</div>
            </div>
          </div>
          <div className="oic-line"></div>
        </div>
      )}

      <Popup visible={showPicker} round position="bottom" onClose={() => setShowPicker(false)}>
        <DatetimePicker
          onConfirm={(value) => {
            onTimeChange(value)
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

const WrappedForm = forwardRef(OptionalInfo)
export default WrappedForm

// export default OptionalInfo
