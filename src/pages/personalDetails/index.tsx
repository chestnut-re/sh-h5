import React, { useState, FC, useRef, useEffect, useCallback } from 'react'
import {
  hooks,
  NoticeBar,
  Form,
  Radio,
  Flex,
  Toast,
  Popup,
  Area,
  Field,
  Popover,
  ConfigProvider,
  DatetimePicker,
} from 'react-vant'
import { areaList } from '@vant/area-data'
import activeIcon from '@/assets/img/activeIcon@3x.png'
import inactiveIcon from '@/assets/img/inactiveIcon@3x.png'
import OptionalInfo from '@/components/personalDetails/optionalInfo'
import { Personal } from '@/service/Personal'
import { getUrlParams, isStrNull } from '@/utils'
import { realNameAuth, rulesCardNo, rulesName } from '@/utils/tools'
import { SHBridge } from '@/jsbridge'
import UserProtocolItem from '@/components/personal/userProtocolItem'

import './index.less'
/**
 * 新增/修改出行人信息
 */
const themeVars = {
  '--rv-notice-bar-height': '9.6vw',
  '--rv-notice-bar-font-size': '3.2vw',
  '--rv-notice-bar-icon-size': '4vw',
  '--rv-cell-vertical-padding': '0',
  '--rv-cell-horizontal-padding': '0',
  '--rv-padding-sm': '5.4vw',
}
// C等登录用户与出行人关系 0 本人 1 夫妻 2 父母 3子女 4亲戚 5朋友 6兄弟 7姐妹
const actions = [
  { text: '本人', type: 0 },
  { text: '夫妻', type: 1 },
  { text: '父母', type: 2 },
  { text: '子女', type: 3 },
  { text: '亲戚', type: 4 },
  { text: '朋友', type: 5 },
  { text: '兄弟', type: 6 },
  { text: '姐妹', type: 7 },
]

const PersonalDetailPage: FC = (props: any) => {
  const [userTrave, setUserTrave] = useState('与我的关系')
  const [emerTrave, setEmerTrave] = useState('身份关系')
  const [selectProtocol, setSelectProtocol] = useState(false)
  const [submittal, setSubmitdata] = hooks.useSetState({
    userTravelerRelation: '', //登录用户与出行人关系
    travelerName: '', //出行人姓名 411421199310226438
    phoneNumber: '', //手机号
    addr: '', //出行人住址
    type: 1, //出行人类型
    emerName: '', //紧急联系人姓名
    emerTravelerRelation: '', //紧急联系人出行人与紧急联系人关系
    emerPhoneNumber: '', //紧急联系人手机号
    travelerCertificate: [], //出行人证件信息
    detailAddress: '', // 出行人详细地址
  })

  const [state, set] = hooks.useSetState({
    visible: false,
    value: '',
    subBtnDisabled: false,
    errorMessage: {},
  })
  const optionalInfoRef = useRef()
  const urlParams = getUrlParams(window.location.href)

  const [realName, setRealName] = useState() as any

  useEffect(() => {
    if (urlParams.id) {
      SHBridge.setTitle('编辑出行人')
      getInfo()
    } else {
      SHBridge.setTitle('添加出行人')
    }
  }, [])

  const getInfo = () => {
    Personal.info(urlParams.id).then((res) => {
      console.log('res.data', res.data)
      setSubmitdata(res.data)
      onPopoverSelect(actions[res.data.userTravelerRelation], 0)
      onPopoverSelect(actions[res.data.emerTravelerRelation], null)
    })
  }

  const onPopoverSelect = (item, type) => {
    if (type === 0) {
      setSubmitdata({
        userTravelerRelation: item.type,
      })
      setUserTrave(item.text)
    } else {
      setSubmitdata({
        emerTravelerRelation: item.type,
      })
      setEmerTrave(item.text)
    }
    console.log('item :>> ', item)
  }
  const changeAreaVal = (info) => {
    console.log('info :>> ', info)
    const res = info
      .map((obj) => {
        return obj.name
      })
      .join('')
    setSubmitdata({
      addr: res,
    })
    set({ visible: false, value: res })
  }

  /**
   * 表单验证
   */

  const noEmptyRules = (val, msg = '该字段不能为空') => {
    let errMsg = ''
    if (isStrNull(val)) {
      errMsg = msg
    } else {
      errMsg = ''
    }
    return errMsg
  }

  const travelerNameRules = (val) => {
    let errMsg = ''
    const nameReg = /^[\u4E00-\u9FA5]{2,20}$/
    const nameTxt = nameReg.test(val)
    if (!nameTxt) {
      errMsg = '请输入正确的证件姓名'
    } else {
      errMsg = ''
    }
    return errMsg
  }

  const travelerPhoneRules = (val) => {
    let errMsg = ''
    const phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
    const phoneTxt = phoneReg.test(val)
    if (!phoneTxt) {
      errMsg = '请输入正确的手机号'
    } else {
      errMsg = ''
    }
    return errMsg
  }

  const travelerRules = (val) => {
    const errorMsg = { ...state.errorMessage }
    switch (val) {
      case 'travelerName':
        errorMsg['nameMsg'] = travelerNameRules(submittal.travelerName)
        break
      case 'travelerPhone':
        errorMsg['phoneMsg'] = travelerPhoneRules(submittal.phoneNumber)
        break
      case 'addr':
        console.log('addr', submittal.addr)
        errorMsg['addrMsg'] = noEmptyRules(submittal.addr)
        break
      case 'address':
        errorMsg['detailAddrMsg'] = noEmptyRules(submittal.detailAddress)
        break
      case 'emerName':
        errorMsg['emerNameMsg'] = travelerNameRules(submittal.emerName)
        break
      case 'emerPhone':
        errorMsg['emerPhoneMsg'] = travelerPhoneRules(submittal.emerPhoneNumber)
        break
      default:
        console.log('不符合条件')
    }
    set({
      errorMessage: errorMsg,
    })
  }

  const rules = () => {
    const errorMsg = { ...state.errorMessage }

    errorMsg['nameMsg'] = travelerNameRules(submittal.travelerName)
    errorMsg['phoneMsg'] = travelerPhoneRules(submittal.phoneNumber)

    errorMsg['emerNameMsg'] = travelerNameRules(submittal.emerName)
    errorMsg['emerPhoneMsg'] = travelerPhoneRules(submittal.emerPhoneNumber)
    errorMsg['addrMsg'] = noEmptyRules(submittal.addr)
    errorMsg['detailAddrMsg'] = noEmptyRules(submittal.detailAddress)
    set({
      errorMessage: errorMsg,
    })
    return judgeObjectComplete(errorMsg)
  }

  const judgeObjectComplete = (ObjectValue) => {
    let flag = new Boolean()
    flag = true
    for (const key in ObjectValue) {
      ObjectValue.index = ''
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

  const onSubmit = useCallback(async () => {
    let cardNo = ''

    const { rulesPass }: any = optionalInfoRef.current
    const rulesCertificate = rulesPass()
    if (rules() && rulesCertificate) {
      if (!selectProtocol) {
        Toast({
          message: '请勾选用户协议',
        })
        return
      }
      const pruneList = prune()
      submittal.travelerCertificate = pruneList
      pruneList.map((item, index) => {
        if (item['certificateType'] == 1) {
          cardNo = item['certificateNo']
        }
      })
      const realName = await realNameAuth(cardNo, submittal.travelerName)
      console.log('realName', realName)
      if (submittal.type == 1 && cardNo != '' && !realName.isok) {
        Toast({
          message: '姓名和证件号不匹配',
        })
        return
      }

      if (urlParams.id) {
        edit()
      } else {
        add()
      }
    }
  }, [submittal, state.errorMessage, selectProtocol])

  /**
   * 新增出行人
   */

  const add = () => {
    set({ subBtnDisabled: true })
    Personal.add(submittal)
      .then((res) => {
        set({ subBtnDisabled: false })
        if (res['code'] == '200') {
          SHBridge.closePage()
          Toast({
            message: '添加成功',
          })
        } else {
          Toast({
            message: res['msg'] || '添加失败',
          })
        }
      })
      .catch(() => {
        set({ subBtnDisabled: false })
      })
  }

  /**
   * 编辑出行人
   */

  const edit = () => {
    set({ subBtnDisabled: true })
    submittal['id'] = urlParams.id
    Personal.edit(submittal)
      .then((res) => {
        console.log('resres', res)

        set({ subBtnDisabled: false })
        if (res['code'] == '200') {
          Toast({
            message: '修改成功',
          })
          SHBridge.closePage()
        } else {
          Toast({
            message: res['msg'] || '添加失败',
          })
        }
      })
      .catch(() => {
        set({ subBtnDisabled: false })
      })
  }

  /**
   * 删除请求多余的字段和
   */

  const prune = () => {
    const { infolist }: any = optionalInfoRef.current
    const newInfolist = JSON.parse(
      JSON.stringify(infolist, (key, value) => {
        if (key == 'type') {
          return undefined
        } else if (key == 'certificateType') {
          return value == '身份证' ? 1 : 2
        } else {
          return value
        }
      })
    )
    return newInfolist
  }

  const onSelectProtocol = () => {
    setSelectProtocol(!selectProtocol)
  }

  const onCardNo = () => {
    let realName = {} as any
    const { infolist }: any = optionalInfoRef.current
    infolist.map(async (item, index) => {
      if (item.certificateType == '身份证') {
        if (!rulesCardNo(item.certificateNo) && !rulesName(submittal.travelerName)) return
        const res = await realNameAuth(item.certificateNo, submittal.travelerName)
        console.log('resresres', res)
        setRealName(res)
        realName = res
      }
    })
    return realName
  }

  return (
    <ConfigProvider themeVars={themeVars}>
      <div className="Personal-container">
        <div className="personal-header">
          <NoticeBar color="#fd7d81" background="#fdefef" leftIcon="warning">
            请填写真实可用信息，用于购买机票、火车票、办理住宿等
          </NoticeBar>
        </div>

        <div className="personal-content">
          <div className="personal-content-header">
            <ul className="pch-ul">
              <li className="pch-ul-li rv-hairline--bottom">
                <div className="pul-name">证件姓名</div>
                <div className="pul-content">
                  <Flex align="center">
                    <Flex.Item span={14}>
                      <Field
                        maxlength={10}
                        value={submittal.travelerName}
                        placeholder="与证件姓名一致"
                        errorMessage={state.errorMessage['nameMsg']}
                        onChange={(val) => {
                          setSubmitdata({
                            travelerName: val,
                          })
                        }}
                        onBlur={() => {
                          travelerRules('travelerName')
                        }}
                      />
                    </Flex.Item>
                    <Flex.Item span={10} className="pul-content-right">
                      <Popover
                        placement="bottom-end"
                        actions={actions}
                        onSelect={(item) => {
                          onPopoverSelect(item, 0)
                        }}
                        reference={<div className="pul-content-title">{userTrave}</div>}
                      />
                    </Flex.Item>
                  </Flex>
                </div>
              </li>

              <li className="pch-ul-li rv-hairline--bottom">
                <div className="pul-name">手机号</div>
                <div className="pul-content">
                  <Field
                    value={submittal.phoneNumber}
                    placeholder="常用手机号"
                    errorMessage={state.errorMessage['phoneMsg']}
                    maxlength={11}
                    type="number"
                    onChange={(val) => {
                      setSubmitdata({
                        phoneNumber: val,
                      })
                    }}
                    onBlur={() => {
                      travelerRules('travelerPhone')
                    }}
                  />
                </div>
              </li>
              <li className="pch-ul-li rv-hairline--bottom">
                <div className="pul-name">所在地区</div>
                <div className="pul-content">
                  <Field
                    isLink
                    readonly
                    value={submittal.addr}
                    errorMessage={state.errorMessage['addrMsg']}
                    placeholder="请选择出行人常住地"
                    onClick={() => set({ visible: true })}
                  />
                </div>
              </li>

              <li style={{ alignItems: 'flex-start' }} className="pch-ul-li rv-hairline--bottom">
                <div style={{ paddingTop: 3 }} className="pul-name">
                  详细地址
                </div>
                <div className="pul-content">
                  <Field
                    value={submittal.detailAddress}
                    rows={3}
                    type="textarea"
                    errorMessage={state.errorMessage['detailAddrMsg']}
                    placeholder="街道、小区、门牌号等"
                    onChange={(val) => {
                      setSubmitdata({
                        detailAddress: val,
                      })
                    }}
                    onBlur={() => {
                      travelerRules('address')
                    }}
                  />
                </div>
              </li>

              <li className="pch-ul-li pch-ul-li-bottom">
                <div className="pul-name">出行人类型</div>
                <div className="pul-content">
                  <Radio.Group
                    value={submittal.type}
                    onChange={(val) => {
                      setSubmitdata({
                        type: Number(val),
                      })
                    }}
                    direction="horizontal"
                    iconSize="3.8vw"
                  >
                    <Radio
                      name={1}
                      iconRender={({ checked: isActive }) => (
                        <img alt="" className="img-icon" src={isActive ? activeIcon : inactiveIcon} />
                      )}
                    >
                      成人
                    </Radio>
                    <Radio
                      name={0}
                      iconRender={({ checked: isActive }) => (
                        <img alt="" className="img-icon" src={isActive ? activeIcon : inactiveIcon} />
                      )}
                    >
                      儿童
                    </Radio>
                  </Radio.Group>
                </div>
              </li>

              <li className="pch-ul-li-box rv-hairline--bottom">
                <div className="hairline-top"></div>
                <OptionalInfo type={submittal.type} certificate={submittal.travelerCertificate} ref={optionalInfoRef} />
              </li>

              <li className="pch-ul-li rv-hairline--bottom">
                <div className="pul-name">紧急联系人</div>
                <div className="pul-content">
                  <Flex align="center">
                    <Flex.Item span={14}>
                      <Field
                        value={submittal.emerName}
                        placeholder="联系人姓名"
                        maxlength={10}
                        errorMessage={state.errorMessage['emerNameMsg']}
                        onChange={(val) => {
                          setSubmitdata({
                            emerName: val,
                          })
                        }}
                        onBlur={() => {
                          travelerRules('emerName')
                        }}
                      />
                    </Flex.Item>
                    <Flex.Item span={10} className="pul-content-right">
                      <Popover
                        placement="top-end"
                        actions={actions}
                        onSelect={onPopoverSelect}
                        reference={<div className="pul-content-title">{emerTrave}</div>}
                      />
                    </Flex.Item>
                  </Flex>
                </div>
              </li>

              <li className="pch-ul-li">
                <div className="pul-name">联系人手机</div>
                <div className="pul-content">
                  <Field
                    value={submittal.emerPhoneNumber}
                    placeholder="紧急联系人手机号"
                    maxlength={11}
                    type="number"
                    errorMessage={state.errorMessage['emerPhoneMsg']}
                    onChange={(val) => {
                      setSubmitdata({
                        emerPhoneNumber: val,
                      })
                    }}
                    onBlur={() => {
                      travelerRules('emerPhone')
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <UserProtocolItem isSelect={selectProtocol} onSelect={onSelectProtocol} />
        <div
          onClick={() => {
            !state.subBtnDisabled && onSubmit()
          }}
          className={'personal-submit'}
        >
          <div className={state.subBtnDisabled ? 'personal-submit-btn personal-submit-btnDis' : 'personal-submit-btn'}>
            {urlParams.id ? '修改' : '保存'}
          </div>
        </div>
      </div>
      <Popup round visible={state.visible} position="bottom" onClose={() => set({ visible: false })}>
        <Area
          title="常住地选择"
          areaList={areaList}
          onConfirm={(result) => {
            changeAreaVal(result)
          }}
        />
      </Popup>
    </ConfigProvider>
  )
}

export default PersonalDetailPage
