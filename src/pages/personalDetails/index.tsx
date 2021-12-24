import React, { useState, FC, useRef } from 'react'
import { hooks, NoticeBar, Form, Radio, Flex, Toast, Popup, Area, Field, Popover, ConfigProvider } from 'react-vant'
import { areaList } from '@vant/area-data'
import activeIcon from '@/assets/img/activeIcon@3x.png'
import inactiveIcon from '@/assets/img/inactiveIcon@3x.png'
import OptionalInfo from '@/components/personalDetails/optionalInfo'
import { Personal } from '@/service/Personal'

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

const PersonalDetailPage: FC = () => {
  const [userTrave, setUserTrave] = useState('与我的关系')
  const [emerTrave, setEmerTrave] = useState('身份关系')
  const [submitdata, setSubmitdata] = hooks.useSetState({
    userTravelerRelation: '', //登录用户与出行人关系
    travelerName: '', //出行人姓名
    phoneNumber: '', //手机号
    addr: '', //出行人住址
    type: 1, //出行人类型
    emerName: '', //紧急联系人姓名
    emerTravelerRelation: '', //紧急联系人出行人与紧急联系人关系
    emerPhoneNumber: '', //紧急联系人手机号
    travelerCertificate: [], //出行人证件信息
  })

  const [state, set] = hooks.useSetState({
    visible: false,
    value: '',
  })
  const optionalInfoRef = useRef()
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

  const onSubmit = () => {
    const { infolist } = optionalInfoRef.current
    const newInfolist = JSON.parse(
      JSON.stringify(infolist, (key, value) => {
        if (key == 'type') {
          return undefined
        } else if (key == 'certificateType') {
          return value == '身份证' ? 0 : 1
        } else {
          return value
        }
      })
    )
    submitdata.travelerCertificate = [...newInfolist]
    Personal.addTravelerInfo(submitdata).then((res) => {
      if (res['code'] == '200') {
        Toast({
          message: '添加成功',
        })
      }
    })
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
                        value={submitdata.travelerName}
                        placeholder="与证件姓名一致"
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
                    value={submitdata.phoneNumber}
                    placeholder="常用手机号"
                    onChange={(val) => {
                      setSubmitdata({
                        phoneNumber: val,
                      })
                    }}
                  />
                </div>
              </li>
              <li className="pch-ul-li rv-hairline--bottom">
                <div className="pul-name">常住地</div>
                <div className="pul-content">
                  <Field
                    isLink
                    readonly
                    value={state.value}
                    label=""
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

              <li className="pch-ul-li pch-ul-li-bottom">
                <div className="pul-name">出行人类型</div>
                <div className="pul-content">
                  <Radio.Group direction="horizontal" iconSize="3.8vw">
                    <Radio
                      name="r1"
                      iconRender={({ checked: isActive }) => (
                        <img alt="" className="img-icon" src={isActive ? activeIcon : inactiveIcon} />
                      )}
                    >
                      成人
                    </Radio>
                    <Radio
                      name="r2"
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
                <OptionalInfo ref={optionalInfoRef} />
              </li>

              <li className="pch-ul-li rv-hairline--bottom">
                <div className="pul-name">紧急联系人</div>
                <div className="pul-content">
                  <Flex align="center">
                    <Flex.Item span={14}>
                      <Field placeholder="联系人姓名" />
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
                  <Field placeholder="紧急联系人手机号" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="personal-protocol">点击保存表示同意 《占位协议名称》</div>
        <div onClick={onSubmit} className="personal-submit">
          <div className="personal-submit-btn">保存</div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default PersonalDetailPage
