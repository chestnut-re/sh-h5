import React, { useState, useEffect, FC, useImperativeHandle, forwardRef } from 'react'
import {
  Popover,
  Popup,
  DatetimePicker,
  Field,
  hooks
} from 'react-vant'
import { isStrNull } from '@/utils'

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

const rulesInfo = {
  certificateErrorMsg: '',
  validityErrorMsg: '',
  type: 0
}


const OptionalInfo = (props, ref) => {
  const [showPicker, setShowPicker] = useState(false)
  const [showPickerId, setShowPickerId] = useState()

  const [infolist, setInfolist] = useState([] as any[])
  const [errorInfoList, setErrorInfoList] = useState([] as any[])
  const [newKey, setNewKey] = useState(0)

  const { certificate } = props
  useEffect(() => {
    if (certificate && certificate.length > 0) {
      console.log(certificate)

      const newErrorObj = [] as any
      certificate.map((item, index) => {
        item.type = index
        item.certificateType = item.certificateType == 1 ? '身份证' : '护照'
        item.validity = item.validity
        newErrorObj.push({
          certificateErrorMsg: '',
          validityErrorMsg: '',
          type: index
        })
      })
      setErrorInfoList(newErrorObj)
      setInfolist([...certificate])
    } else {
      setInfolist([infos])
      setErrorInfoList([rulesInfo])
    }
  }, [certificate])

  const addOptionalInfo = () => {
    setNewKey(newKey + 1)
    const activeKey = `new${newKey}`
    infolist.push({
      type: activeKey,
      certificateNo: '',
      validity: '',
      certificateType: '身份证'
    })
    errorInfoList.push({
      certificateErrorMsg: '',
      validityErrorMsg: '',
      type: activeKey
    })
    setInfolist(infolist)
    setErrorInfoList(errorInfoList)
  }
  const deleteHandelOptional = (i) => {
    const newInfolist = infolist.filter((item, index) => {
      return index != i
    })

    const newErrorInfoList = errorInfoList.filter((item, index) => {
      return index != i
    })

    console.log('i :>> ', i, newInfolist)
    setInfolist([...newInfolist])
    setErrorInfoList([...newErrorInfoList])
  }

  useImperativeHandle(ref, () => ({
    infolist: infolist,
    rulesPass: rules
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

  const rules = () => {
    infolist.map((item, index) => {
      if (props.type != 1) {
        if (!item.certificateNo || isStrNull(item.certificateNo)) {
          errorInfoList[index].certificateErrorMsg = '请输入证件号'
        } else {
          errorInfoList[index].certificateErrorMsg = ''
        }

        if (!item.validity || isStrNull(item.validity)) {
          errorInfoList[index].validityErrorMsg = '请输入证件号有效期'
        } else {
          errorInfoList[index].validityErrorMsg = ''
        }
      } else {
        errorInfoList[index].certificateErrorMsg = ''
        errorInfoList[index].validityErrorMsg = ''
      }
    })
    console.log('errorInfoList', errorInfoList)
    return judgeListComplete(errorInfoList)
  }

  const judgeObjectComplete = (ObjectValue) => {
    let flag = new Boolean()
    flag = true
    for (const key in ObjectValue) {
      ObjectValue.type = ''
      if (ObjectValue[key] == '') {

      } else {
        flag = false
      }
    }
    if (!flag) {
      return false
    } else {
      return true
    }
  }
  const judgeListComplete = (list) => {
    const isNotComplete = list.findIndex(item => {
      return judgeObjectComplete(item) === false
    })
    if (isNotComplete > -1) {
      return false
    } else {
      return true
    }
  }

  return (
    <div className="optional-info">
      {props.type == 1 && <div className="optional-info-text">儿童选填</div>}
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
                  errorMessage={errorInfoList[index].certificateErrorMsg}
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
                  errorMessage={errorInfoList[index].validityErrorMsg}
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
              <div className='optional-add-txt'>添加其他证件</div>
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
