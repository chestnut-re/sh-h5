import React, { useState, FC, useRef, useEffect, useCallback } from 'react'
import {
  hooks,
  NoticeBar,
  Icon,
  Button,
  Radio,
  Flex,
  Toast,
  Popup,
  Area,
  Field,
  Popover,
  DatetimePicker,
} from 'react-vant'
import PageView from '@/components/personal/pageView'
import { Personal } from '@/service/Personal'
import inactiveIcon from '@/assets/img/inactive_Icon@3x.png'
import activeIcon from '@/assets/img/active_Icon@3x.png'
import { areaList } from '@vant/area-data'
import { getUrlParams, generateUrl, isStrNull } from '@/utils'
import { SHBridge } from '@/jsbridge'
import UserProtocolItem from '@/components/personal/userProtocolItem'
import OptionalInfo from '@/components/personalDetails/optionalInfo'

import './index.less'
import { runMain } from 'module'

/**
 * 绑定出行人信息
 */

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

const PersonalBindPage: FC = (props) => {
  const [travelerList, setTravelerList] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [subordersList, setSubordersList] = useState([])
  const [travelerCertificateDtoList, setTravelerCertificateDtoList] = useState([] as any)

  const [addrIndex, setAddrIndex] = useState(0)

  const [selectedTraveler, setSelectedTraveler] = useState([])
  const [errorMessage, setErrorMessage] = useState([] as any)

  const [selectProtocol, setSelectProtocol] = useState(false)
  // useRef 初始化为数组
  const childRefs = useRef<any>([])
  const [state, set] = hooks.useSetState({
    visible: false,
  })

  const urlParams = getUrlParams(window.location.href)

  useEffect(() => {
    getList()
    getOrderInfo()
  }, [])
  /**
   * 初始化提交证件信息字段
   * @param id
   */
  const initialTravelerInfo = (id: any, type = '1') => {
    const travelerObj = {
      certificateNo: '',
      certificateType: 1,
      createTime: '',
      id: '',
      isDelete: 0,
      suborderId: id,
      updateTime: '',
      validity: '',
      type: type,
    }
    return travelerObj
  }

  const initialErrorObj = (id = '0') => {
    const errorObj = {
      nameMsg: '',
      phoneMsg: '',
      validityMsg: '',
      emerPhoneMsg: '',
      emerNameMsg: '',
      certificateNoMsg: '',
      addrMsg: '',
      addressMsg: '',
      index: id,
    }
    return errorObj
  }
  /**
   * 表单验证
   */

  const rules = () => {
    const newErrorMessage = [...errorMessage]
    subordersList.map((item, index) => {
      const newErrorObj = newErrorMessage[index] as any
      if (!item['selectedTraveler']) {
        newErrorObj['nameMsg'] = travelerNameRules(item['travelerName'])
        newErrorObj['phoneMsg'] = travelerPhoneRules(item['travelerPhoneNumber'])

        newErrorObj['emerNameMsg'] = travelerNameRules(item['emerName'])
        newErrorObj['emerPhoneMsg'] = travelerPhoneRules(item['emerPhoneNumber'])
        newErrorObj['addrMsg'] = noEmptyRules(item['habitualResidence'])
        newErrorObj['addressMsg'] = noEmptyRules(item['address'])
      } else {
        newErrorMessage[index] = {}
      }
    })
    setErrorMessage(newErrorMessage)
    return judgeListComplete(newErrorMessage)
  }

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

  const travelerRules = (index, val) => {
    const newErrorMessage = [...errorMessage]
    const subordersObj = subordersList[index]
    const newErrorObj = newErrorMessage[index] as any
    switch (val) {
      case 'travelerName':
        newErrorObj['nameMsg'] = travelerNameRules(subordersObj['travelerName'])
        break
      case 'travelerPhone':
        newErrorObj['phoneMsg'] = travelerPhoneRules(subordersObj['travelerPhoneNumber'])
        break
      case 'addr':
        newErrorObj['addrMsg'] = noEmptyRules(subordersObj['habitualResidence'])
        break
      case 'address':
        newErrorObj['addressMsg'] = noEmptyRules(subordersObj['address'])
        break
      case 'emerName':
        newErrorObj['emerNameMsg'] = travelerNameRules(subordersObj['emerName'])
        break
      case 'emerPhone':
        newErrorObj['emerPhoneMsg'] = travelerPhoneRules(subordersObj['emerPhoneNumber'])
        break
      default:
        console.log('不符合条件')
    }
    setErrorMessage(newErrorMessage)
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

  /**
   * 获取订单信息
   */
  const getOrderInfo = () => {
    Personal.getOrder(urlParams.id).then((res) => {
      const travelerArr = [] as any
      const errorMsg = [] as any
      res.data.map((item, index) => {
        travelerArr.push([initialTravelerInfo(item.id)])
        errorMsg.push(initialErrorObj(index))
      })
      setErrorMessage(errorMsg)
      setTravelerCertificateDtoList(travelerArr)
      setSubordersList(res.data)
    })
  }

  /**
   * 获取出行人列表
   */
  const getList = () => {
    Personal.listInfo().then((res) => {
      const { data } = res
      if (!data) return
      data.map((item) => {
        item.select = false
      })
      setTravelerList(data)
    })
  }
  /**
   * 选择出行人模板
   * @param obj
   */

  const onSelectItem = (obj) => {
    const newSelectedTraveler = [...selectedTraveler]
    const newSubordersList = [...subordersList] as any
    const fillingArr = [] as any
    newSubordersList.map((item, i) => {
      if (!item['travelerName']) {
        fillingArr.push({ index: i, type: item.travelerType })
      }
    })

    if (fillingArr.length <= 0) {
      Toast({
        message: `不能继续添加行程人了`,
      })
      return
    }
    const type = fillingArr.some((val) => val.type == obj.type)
    if (!type) {
      Toast({
        message: `不能继续添加${obj.type == 1 ? '成人' : '儿童'}`,
      })
      return
    }

    const newTravelerList = [...travelerList] as any
    newTravelerList.map((item) => {
      if (obj.id == item['id']) {
        for (let i = 0; i < newSubordersList.length; i++) {
          if (!newSubordersList[i].travelerName && !newSubordersList[i].selectedTraveler) {
            if (obj.type == newSubordersList[i].travelerType) {
              item['select'] = !item['select']
              newSubordersList[i].selectedTraveler = true
              newSubordersList[i].travelerName = obj.travelerName
              newSubordersList[i].travelerPhoneNumber = obj.phoneNumber
              newSubordersList[i].travelerId = obj.id
              newSubordersList[i].habitualResidence = obj.addr || ''
              newSubordersList[i].emerName = obj.emerName
              newSubordersList[i].emerPhoneNumber = obj.emerPhoneNumber
              newSubordersList[i].emerTravelerRelation = obj.emerTravelerRelation
              newSubordersList[i].travelerRelation = obj.userTravelerRelation
              travelerCertificateDtoList[i] = obj.travelerCertificate
              break
            }
          }
        }
        newSelectedTraveler.push(obj)
      }
    })
    setSubordersList(newSubordersList)
    setSelectedTraveler(newSelectedTraveler)
    setTravelerList(newTravelerList)
  }

  /**
   * 选择出行人关系
   * @param val
   * @param i
   */

  const onPopoverSelect = (item, i, type) => {
    console.log('itemitem', item)
    const newSubordersList = [...subordersList]
    if (type == 0) {
      newSubordersList.map((items, index) => {
        if (i === index) {
          items['travelerRelation'] = item['type']
        }
      })
    } else if (type == 1) {
      if (item['type'] == 0) {
        Toast({
          message: '紧急联系人不能选择本人',
        })
        return
      }
      newSubordersList.map((items, index) => {
        if (i === index) {
          items['emerTravelerRelation'] = item['type']
        }
      })
    }
    setSubordersList(newSubordersList)
  }

  /**
   * 修改出行人名字
   * @param val
   * @param i
   */
  const onTravelerName = (val, i) => {
    const newSubordersList = [...subordersList]
    newSubordersList[i].travelerName = val
    setSubordersList(newSubordersList)
  }

  /**
   * 修改出现人手机号码
   * @param val
   * @param i
   */

  const onTravelerPhone = (val, i) => {
    const newSubordersList = [...subordersList] as any
    newSubordersList[i].travelerPhoneNumber = val
    setSubordersList(newSubordersList)
  }

  /**
   * 修改紧急联系人姓名
   * @param val
   * @param i
   */

  const onEmerTravelerName = (val, i) => {
    const newSubordersList = [...subordersList]
    newSubordersList[i].emerName = val
    setSubordersList(newSubordersList)
  }

  /**
   * 修改紧急联系人手机号码
   * @param val
   * @param i
   */

  const onEmerTravelerPhone = (val, i) => {
    const newSubordersList = [...subordersList]
    newSubordersList[i].emerPhoneNumber = val
    setSubordersList(newSubordersList)
  }

  /**
   * 联系人详细地址
   * @returns
   */

  const onTravelerAddress = (val, i) => {
    const newSubordersList = [...subordersList]
    newSubordersList[i].address = val
    setSubordersList(newSubordersList)
  }

  const onSubmit = () => {
    const isRulesPass = getCertificateRules()
    if (rules() && isRulesPass) {
      if (!selectProtocol) {
        Toast({
          message: '请先勾选同意后才可提交',
        })
        return
      }
      const postData = {
        suborderDtoList: [...subordersList],
        travelerCertificateDtoList: [
          ...travelerCertificateList(childRefs.current),
          ...selectTravelerCertificate(travelerCertificateDtoList),
        ],
      }
      Personal.addPedestrianInfo(postData).then((res) => {
        console.log('paramsparams', res)
        if (res['code'] == '200') {
          if (urlParams.from == 'orderList') {
            SHBridge.closePage()
          } else {
            SHBridge.jump({
              url: generateUrl(`/order-detail?orderId=${urlParams.id}`),
              newWebView: false,
              replace: true,
              title: '订单详情',
            })
          }
          Toast({
            message: '添加成功',
          })
        }
      })
    }
  }
  /**
   * 获取证件信息列表
   * @returns list
   */
  const travelerCertificateList = (list) => {
    const certificate = [] as any
    list.length > 0 &&
      list.forEach((childRef: any) => {
        childRef.infolist.map((itemj, j) => {
          if (itemj.certificateNo != '') {
            certificate.push(itemj)
          }
        })
      })
    return certificate
  }

  const selectTravelerCertificate = (list) => {
    const certificate = [] as any
    list.length > 0 &&
      list.forEach((item: any, index) => {
        if (subordersList[index].selectedTraveler) {
          item.forEach((element) => {
            element.suborderId = subordersList[index].id
            certificate.push(element)
          })
        }
      })
    return certificate
  }

  /**
   * 验证证件组件
   * @returns true
   */
  const getCertificateRules = () => {
    const certificateRules = [] as any
    childRefs.current &&
      childRefs.current.forEach((childRef: any, index) => {
        const travelerItem = subordersList[index] as any
        if (travelerItem.selectedTraveler) {
          certificateRules.push(true)
        } else {
          certificateRules.push(childRef.rulesPass())
        }
      })

    const isPass = certificateRules.every((item) => {
      return item == true
    })
    return isPass
  }

  const getActionsText = (type) => {
    const item = actions[type]
    if (!type && type != 0) return '身份关系'
    return item.text
  }

  /**
   *
   */
  const changeAddrVal = (val) => {
    const newSubordersList = [...subordersList] as any
    const res = val
      .map((obj) => {
        return obj.name
      })
      .join('')
    newSubordersList.map((item, index) => {
      if (addrIndex === index) {
        item['habitualResidence'] = res
      }
    })
    setSubordersList(newSubordersList)
    travelerRules(addrIndex, 'addr')
    set({ visible: false })
  }

  /**
   * 一键清空
   * @param i
   */
  const onEmpty = (i) => {
    const newSubordersList = [...subordersList] as any
    newSubordersList.map((item, index) => {
      if (i === index) {
        item['travelerName'] = ''
        item['travelerRelation'] = null
        item['travelerPhoneNumber'] = ''
        item['habitualResidence'] = ''
        item['emerName'] = ''
        item['emerPhoneNumber'] = ''
        item['emerTravelerRelation'] = null
        item['selectedTraveler'] = false
        item['address'] = ''
      }
    })

    const newTravelerList = [...travelerList] as any
    newTravelerList.map((item) => {
      if (newSubordersList[i].travelerId == item['id']) {
        item['select'] = false
      }
    })

    setTravelerList(newTravelerList)
    travelerCertificateDtoList.splice(i, 1, [initialTravelerInfo(subordersList[i].id)])
    setSubordersList(newSubordersList)
  }

  const getRelationText = (id) => {
    let relationText = ''
    actions.map((item) => {
      if (item.type == id) {
        relationText = item.text
      }
    })
    return relationText
  }

  /**
   * 选择同意用户协议
   */

  const onSelectProtocol = () => {
    setSelectProtocol(!selectProtocol)
  }

  return (
    <PageView>
      <div className="PersonalBind-container">
        <NoticeBar color="#fd7d81" background="#fdefef" leftIcon="warning">
          请填写真实可用信息，用于购买机票、火车票、办理住宿等
        </NoticeBar>
        {travelerList && travelerList.length > 0 && (
          <div className="bind-list">
            <div className="bind-itemView">
              {travelerList.map(
                (item, index) =>
                  index < 3 && (
                    <div
                      onClick={() => onSelectItem(item)}
                      key={`index${index}`}
                      className={`bind-item ${item['select'] && 'bind-item-select'}`}
                    >
                      <div className="text">{item['travelerName']}</div>
                      <div className="hint">{item['type'] == 0 ? '儿童' : '成人'}</div>
                      {item['select'] && <div className="tag">✓</div>}
                    </div>
                  )
              )}
            </div>
            <div onClick={() => setShowPopup(true)} className="bind-more">
              <span className="text">更多</span>
              <Icon name="arrow" />
            </div>
          </div>
        )}
        {subordersList &&
          subordersList.length > 0 &&
          subordersList.map((item, index) =>
            item['selectedTraveler'] ? (
              <div key={`index${index}`} className="personal-content">
                <div className="personal-content-header">
                  <ul className="pch-ul">
                    <li className="pch-ul-li rv-hairline--bottom">
                      {item['travelerType'] == 1 && <div className="pul-name">成人</div>}
                      {item['travelerType'] == 0 && <div className="pul-name">儿童</div>}
                      <div onClick={() => onEmpty(index)} className="pul-emptyView">
                        一键清空
                      </div>
                    </li>
                    <li className="pch-ul-li rv-hairline--bottom">
                      <div className="travelerView">
                        <div className="traveler-user">
                          <div className="user">
                            <div className="name">{item['travelerName']}</div>
                            <div className="tag">{getRelationText(item['travelerRelation'])}</div>
                          </div>
                          <div className="phone">{item['travelerPhoneNumber']}</div>
                        </div>
                        {travelerCertificateDtoList[index].map((travelerItem, travelerIndex) => (
                          <div key={`travelerIndex${travelerIndex}`} className="Id">
                            {travelerItem.certificateType == 1 ? '身份证 ' : '护照 '}
                            {travelerItem.certificateNo}
                          </div>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div key={`index${index}`} className="personal-content">
                <div className="personal-content-header">
                  <ul className="pch-ul">
                    <li className="pch-ul-li rv-hairline--bottom">
                      {item['travelerType'] == 1 && <div className="pul-name">成人</div>}
                      {item['travelerType'] == 0 && <div className="pul-name">儿童</div>}
                      <div onClick={() => onEmpty(index)} className="pul-emptyView">
                        一键清空
                      </div>
                    </li>
                    <li className="pch-ul-li rv-hairline--bottom">
                      <div className="pul-name">证件姓名</div>
                      <div className="pul-content">
                        <Flex align="center">
                          <Flex.Item span={14}>
                            <Field
                              value={item['travelerName']}
                              placeholder="与证件姓名一致"
                              maxlength={20}
                              onBlur={() => {
                                travelerRules(index, 'travelerName')
                              }}
                              errorMessage={errorMessage[index].nameMsg}
                              onChange={(val) => {
                                onTravelerName(val, index)
                              }}
                            />
                          </Flex.Item>
                          <Flex.Item span={10} className="pul-content-right">
                            <Popover
                              placement="bottom-end"
                              actions={actions}
                              onSelect={(actionsItem) => {
                                onPopoverSelect(actionsItem, index, 0)
                              }}
                              reference={
                                <div className="pul-content-title">{getActionsText(item['travelerRelation'])}</div>
                              }
                            />
                          </Flex.Item>
                        </Flex>
                      </div>
                    </li>
                    <li className="pch-ul-li rv-hairline--bottom">
                      <div className="pul-name">手机号</div>
                      <div className="pul-content">
                        <Field
                          value={item['travelerPhoneNumber']}
                          placeholder="常用手机号"
                          maxlength={11}
                          errorMessage={errorMessage[index].phoneMsg}
                          onBlur={() => {
                            travelerRules(index, 'travelerPhone')
                          }}
                          onChange={(val) => {
                            onTravelerPhone(val, index)
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
                          value={item.habitualResidence}
                          label=""
                          errorMessage={errorMessage[index].addrMsg}
                          placeholder="请选择出行人常住地"
                          onClick={() => {
                            setAddrIndex(index)
                            set({ visible: true })
                          }}
                        />
                      </div>
                    </li>
                    <li style={{ alignItems: 'flex-start' }} className="pch-ul-li rv-hairline--bottom">
                      <div style={{ paddingTop: 3 }} className="pul-name">
                        详细地址
                      </div>
                      <div className="pul-content">
                        <Field
                          value={item.address}
                          rows={3}
                          type="textarea"
                          errorMessage={errorMessage[index].addressMsg}
                          placeholder="街道、小区、门牌号等"
                          onBlur={() => {
                            travelerRules(index, 'address')
                          }}
                          onChange={(val) => {
                            onTravelerAddress(val, index)
                          }}
                        />
                      </div>
                    </li>
                    <li className="pch-ul-li-box rv-hairline--bottom">
                      <div className="hairline-top"></div>

                      <OptionalInfo
                        type={item['travelerType']}
                        certificate={travelerCertificateDtoList[index]}
                        ref={(ref) => {
                          if (ref) {
                            childRefs.current[index] = ref
                          }
                        }}
                      />
                    </li>

                    <li className="pch-ul-li rv-hairline--bottom">
                      <div className="pul-name">紧急联系人</div>
                      <div className="pul-content">
                        <Flex align="center">
                          <Flex.Item span={14}>
                            <Field
                              value={item['emerName']}
                              placeholder="联系人姓名"
                              maxlength={20}
                              onBlur={() => {
                                travelerRules(index, 'emerName')
                              }}
                              errorMessage={errorMessage[index].emerNameMsg}
                              onChange={(val) => {
                                onEmerTravelerName(val, index)
                              }}
                            />
                          </Flex.Item>
                          <Flex.Item span={10} className="pul-content-right">
                            <Popover
                              placement="top-end"
                              actions={actions}
                              onSelect={(actionsItem) => {
                                onPopoverSelect(actionsItem, index, 1)
                              }}
                              reference={
                                <div className="pul-content-title">{getActionsText(item['emerTravelerRelation'])}</div>
                              }
                            />
                          </Flex.Item>
                        </Flex>
                      </div>
                    </li>
                    <li className="pch-ul-li">
                      <div className="pul-name">联系人手机</div>
                      <div className="pul-content">
                        <Field
                          value={item['emerPhoneNumber']}
                          placeholder="紧急联系人手机号"
                          maxlength={11}
                          errorMessage={errorMessage[index].emerPhoneMsg}
                          onBlur={() => {
                            travelerRules(index, 'emerPhone')
                          }}
                          onChange={(val) => {
                            onEmerTravelerPhone(val, index)
                          }}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )
          )}

        <UserProtocolItem isSelect={selectProtocol} onSelect={onSelectProtocol} />

        <div
          onClick={() => {
            onSubmit()
          }}
          className={'personal-submit'}
        >
          <div className={'personal-submit-btn'}>提交信息</div>
        </div>
      </div>
      <Popup round visible={state.visible} position="bottom" onClose={() => set({ visible: false })}>
        <Area
          title="常住地选择"
          areaList={areaList}
          onConfirm={(result) => {
            changeAddrVal(result)
          }}
        />
      </Popup>
      <Popup
        visible={showPopup}
        closeable
        title="选择出行人"
        position="bottom"
        onClickCloseIcon={() => {
          setShowPopup(false)
        }}
        onClickOverlay={() => {
          setShowPopup(false)
        }}
        round
        className="PersonalBind-popupView"
        safeAreaInsetBottom
      >
        <div className="popupView">
          <div className="container">
            {travelerList.map((item, index) => (
              <div key={`index${index}`} className="travelerItem">
                <div className="info">
                  <div className="nameView">
                    <div className="name">
                      <div className="text">{item['travelerName']}</div>
                      {getRelationText(item['userTravelerRelation']) && (
                        <div className="tag">{getRelationText(item['userTravelerRelation'])}</div>
                      )}
                    </div>
                    <div className="phoneNum">{item['phoneNumber']}</div>
                  </div>
                  <div className="IDcard">身份证{item['travelerCertificate'][0].certificateNo}</div>
                </div>
                <div onClick={() => onSelectItem(item)} className="selectView">
                  <img alt="" className="img-icon" src={item['select'] ? activeIcon : inactiveIcon} />
                </div>
              </div>
            ))}
          </div>
          <div onClick={() => setShowPopup(false)} className="popupViewBtn">
            <div className="text">确定</div>
          </div>
        </div>
      </Popup>
    </PageView>
  )
}
export default PersonalBindPage
