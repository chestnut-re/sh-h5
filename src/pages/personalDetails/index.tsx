import React, { useState, FC, useRef, useEffect, useCallback } from 'react'
import { hooks, NoticeBar, Form, Radio, Flex, Toast, Popup, Area, Field, Popover, ConfigProvider, DatetimePicker } from 'react-vant'
import { areaList } from '@vant/area-data'
import activeIcon from '@/assets/img/activeIcon@3x.png'
import inactiveIcon from '@/assets/img/inactiveIcon@3x.png'
import OptionalInfo from '@/components/personalDetails/optionalInfo'
import { Personal } from '@/service/Personal'
import { getUrlParams, isStrNull } from '@/utils'
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
    travelerName: '', //出行人姓名
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

  useEffect(() => {
    if (urlParams.id) {
      getInfo()
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

  const rules = () => {
    const { rulesPass }: any = optionalInfoRef.current;


    const errorMsg = {}
    const nameReg = /^[\u4E00-\u9FA5]{2,10}$/
    const phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
    const nameTxt = nameReg.test(submittal.travelerName)
    const phoneTxt = phoneReg.test(submittal.phoneNumber)
    const emerNameTxt = nameReg.test(submittal.emerName)
    const emerPhoneTxt = phoneReg.test(submittal.emerPhoneNumber)

    const rulesCertificate = rulesPass()


    if (!nameTxt || !phoneTxt || !emerNameTxt || !emerPhoneTxt || isStrNull(submittal.addr) || isStrNull(submittal.detailAddress) || !rulesCertificate) {
      if (!nameTxt) {
        errorMsg['nameMsg'] = submittal.travelerName == '' ? '请输入姓名' : '请输入正确的证件姓名'
      }
      if (!phoneTxt) {
        errorMsg['phoneMsg'] = submittal.phoneNumber == '' ? '请输入手机号码' : '请输入正确的手机号'
      }
      if (!emerNameTxt) {
        errorMsg['emerNameMsg'] = submittal.emerName == '' ? '请输入紧急联系人' : '请输入正确联系人姓名'
      }
      if (!emerPhoneTxt) {
        errorMsg['emerPhoneMsg'] = submittal.emerPhoneNumber == '' ? '请输入紧急联系人手机号码' : '请输入正确的手机号'
      }
      if (isStrNull(submittal.addr)) {
        errorMsg['addrMsg'] = '请输入常住地址'
      }

      if (isStrNull(submittal.detailAddress)) {
        errorMsg['detailAddrMsg'] = '请输入详细地址'
      }

      set({
        errorMessage: errorMsg,
      })
      return false
    } else {
      if (submittal.phoneNumber == submittal.emerPhoneNumber) {
        errorMsg['emerPhoneMsg'] = '紧急联系人手机号码不能是本人手机号'
        set({
          errorMessage: errorMsg,
        })
        return false
      }
      set({
        errorMessage: {},
      })
      return true
    }
  }

  const onSubmit = useCallback(() => {
    if (rules()) {
      if (!selectProtocol) {
        Toast({
          message: '请勾选用户协议',
        })
        return
      }
      submittal.travelerCertificate = prune()
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
    Personal.add(submittal).then((res) => {
      set({ subBtnDisabled: false })
      if (res['code'] == '200') {
        SHBridge.closePage()
        Toast({
          message: '添加成功',
        })
      } else {
        Toast({
          message: '添加失败',
        })
      }
    }).catch(() => {
      set({ subBtnDisabled: false })
    })
  }

  /**
   * 编辑出行人
   */

  const edit = () => {
    set({ subBtnDisabled: true })
    submittal['id'] = urlParams.id
    Personal.edit(submittal).then((res) => {
      set({ subBtnDisabled: false })
      if (res['code'] == '200') {
        Toast({
          message: '修改成功',
        })
        SHBridge.closePage()
      } else {
        Toast({
          message: '添加失败',
        })
      }
    }).catch(() => {
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
                    type='number'
                    onChange={(val) => {
                      setSubmitdata({
                        phoneNumber: val,
                      })
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
                    label=""
                    errorMessage={state.errorMessage['addrMsg']}
                    placeholder="请选择出行人常住地"
                    onClick={() => set({ visible: true })}
                  />
                  <Popup round visible={state.visible} position="bottom" onClose={() => set({ visible: false })}>
                    <Area
                      title="常住地选择"
                      areaList={areaList}
                      onConfirm={(result) => {
                        changeAreaVal(result)
                      }}
                    />
                  </Popup>
                </div>
              </li>

              <li style={{ alignItems: 'flex-start' }} className="pch-ul-li rv-hairline--bottom">
                <div style={{ paddingTop: 3 }} className="pul-name">详细地址</div>
                <div className="pul-content">
                  <Field
                    value={submittal.detailAddress}
                    rows={3}
                    type="textarea"
                    errorMessage={state.errorMessage['detailAddrMsg']}
                    placeholder="街道、小区、门牌号等"
                    onChange={(val) => {
                      setSubmitdata({
                        detailAddress: val
                      })
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
                        type: Number(val)
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
                    type='number'
                    errorMessage={state.errorMessage['emerPhoneMsg']}
                    onChange={(val) => {
                      setSubmitdata({
                        emerPhoneNumber: val,
                      })
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <UserProtocolItem
          isSelect={selectProtocol}
          onSelect={onSelectProtocol}
        />
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
    </ConfigProvider>
  )
}

export default PersonalDetailPage
