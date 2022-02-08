import React, { useState, useEffect, FC, useImperativeHandle, forwardRef } from 'react'
import { Popover, Popup, DatetimePicker, Field, hooks } from 'react-vant'
import { isStrNull } from '@/utils'
import { Personal } from '@/service/Personal'

import addIcon from '@/assets/img/add_icon@3x.png'

import './index.less'
/**
 * 出行人信息
 */

const infos = {
  type: 0,
  certificateNo: '',
  validity: '',
  certificateType: '1',
}
const certificateTypeActions = [
  { text: '身份证', disabled: false },
  { text: '护照', disabled: false },
]

const rulesInfo = {
  certificateErrorMsg: '',
  type: 0,
}

const OptionalInfo = (props, ref) => {
  const [actions, setActions] = useState(certificateTypeActions)
  const [infolist, setInfolist] = useState([] as any[])
  const [errorInfoList, setErrorInfoList] = useState([] as any[])
  const [newKey, setNewKey] = useState(0)

  const { certificate } = props
  useEffect(() => {
    if (certificate && certificate.length > 0) {
      const newErrorObj = [] as any
      console.log('1231231certificatecertificate', certificate)
      certificate.map((item, index) => {
        item.type = index
        item.certificateType = item.certificateType
        // item.validity = item.validity
        newErrorObj.push({
          certificateErrorMsg: '',
          // validityErrorMsg: '',
          type: index,
        })
      })
      setErrorInfoList(newErrorObj)
      setInfolist([...certificate])
    } else {
      setInfolist([infos])
      setErrorInfoList([rulesInfo])
    }
  }, [certificate])

  /**
   * 添加出行人其他证件信息
   */
  const addOptionalInfo = () => {
    setNewKey(newKey + 1)
    const activeKey = `new${newKey}`
    const pushInfoObj = {} as any
    pushInfoObj.type = activeKey
    pushInfoObj.certificateNo = ''
    if (infolist[0].certificateType == 1) {
      pushInfoObj.certificateType = 2
    } else {
      pushInfoObj.certificateType = 1
    }

    if (infolist[0] && infolist[0].suborderId) {
      pushInfoObj.suborderId = infolist[0].suborderId
    }
    infolist.push(pushInfoObj)
    errorInfoList.push({
      certificateErrorMsg: '',
      type: activeKey,
    })
    if (infolist.length == 2) {
      const newActions = [...actions]
      newActions[0].disabled = true
      newActions[1].disabled = true
      setActions(newActions)
    }
    setInfolist(infolist)
    setErrorInfoList(errorInfoList)
  }

  /**
   * 删除其他出行证件信息
   * @param i
   */
  const deleteHandelOptional = (i) => {
    const newInfolist = infolist.filter((item, index) => {
      return index != i
    })

    const newErrorInfoList = errorInfoList.filter((item, index) => {
      return index != i
    })

    if (newInfolist.length == 1) {
      const newActions = [...actions]
      newActions[0].disabled = false
      newActions[1].disabled = false
      setActions(newActions)
    }

    setInfolist([...newInfolist])
    setErrorInfoList([...newErrorInfoList])
  }

  useImperativeHandle(ref, () => ({
    infolist: infolist,
    rulesPass: rules,
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

  const onSelect = (value, type) => {
    const newInfolist = [...infolist]
    newInfolist.map((item, i) => {
      if (item['type'] === type) {
        item['certificateType'] = value.text == '身份证' ? 1 : 2
      }
    })
    setInfolist(newInfolist)
  }

  const rules = () => {
    infolist.map((item, index) => {
      if (props.type == 1) {
        if (!item.certificateNo || isStrNull(item.certificateNo)) {
          errorInfoList[index].certificateErrorMsg = '请输入证件号'
        } else {
          errorInfoList[index].certificateErrorMsg = ''
        }
      } else {
        errorInfoList[index].certificateErrorMsg = ''
      }
    })
    return judgeListComplete(errorInfoList)
  }

  const travelerRules = (index) => {
    if (props.type != 1) {
      errorInfoList[index].certificateErrorMsg = ''
      setErrorInfoList([...errorInfoList])
      return
    }
    if (!infolist[index].certificateNo || isStrNull(infolist[index].certificateNo)) {
      errorInfoList[index].certificateErrorMsg = '请输入证件号'
    } else {
      errorInfoList[index].certificateErrorMsg = ''
    }
    setErrorInfoList([...errorInfoList])
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
    const isNotComplete = list.findIndex((item) => {
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
      {props.type == 0 && <div className="optional-info-text">儿童选填</div>}
      {infolist.map((item, index) => {
        return (
          <div key={index} className="optional-info-content">
            <div className="oic-item rv-hairline--bottom">
              <div className="oic-item-label oic-item-card">
                <Popover
                  onSelect={(vals) => onSelect(vals, item['type'])}
                  actions={actions}
                  placement="bottom-start"
                  reference={<span>{item['certificateType'] == 1 ? '身份证' : '护照'}</span>}
                />
              </div>
              <div className="oic-item-content">
                <Field
                  className="oic-input"
                  onChange={(val) => onFieldChange(val, item['type'])}
                  value={item['certificateNo']}
                  placeholder="请填写正确的证件号码"
                  maxlength={18}
                  onBlur={() => {
                    travelerRules(index)
                    props.onBlur && props.onBlur()
                  }}
                  errorMessage={errorInfoList[index].certificateErrorMsg}
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
              <img className="optional-add-img" src={addIcon} />
              <div className="optional-add-txt">添加其他证件</div>
            </div>
          </div>
          <div className="oic-line"></div>
        </div>
      )}
    </div>
  )
}

const WrappedForm = forwardRef(OptionalInfo)
export default WrappedForm
