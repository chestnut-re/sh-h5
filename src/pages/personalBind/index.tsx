import React, { useState, FC, useRef, useEffect, useCallback } from 'react'
import { hooks, NoticeBar, Icon, Button, Radio, Flex, Toast, Popup, Area, Field, Popover, DatetimePicker } from 'react-vant'
import PageView from '@/components/personal/pageView'
import { Personal } from '@/service/Personal'
import inactiveIcon from '@/assets/img/inactive_Icon@3x.png'
import activeIcon from '@/assets/img/active_Icon@3x.png'
import { areaList } from '@vant/area-data'
import OrderTravelerView from '@/components/orderTravelerView'
import addIcon from '@/assets/img/add_icon@3x.png'
import { getUrlParams, generateUrl } from '@/utils'
import { SHBridge } from '@/jsbridge'
import './index.less'

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

const actionsCertificate = [
  { text: '身份证', disabled: false },
  { text: '护照', disabled: false },
]

const PersonalBindPage: FC = (props) => {
  const [showPicker, setShowPicker] = useState(false)
  const [showPickerId, setShowPickerId] = useState()

  const [travelerList, setTravelerList] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [subordersList, setSubordersList] = useState([])
  const [travelerCertificateDtoList, setTravelerCertificateDtoList] = useState([])
  const [newKey, setNewKey] = useState(1)

  const [timeIndex, setTimeIndex] = useState(0)
  const [addrIndex, setAddrIndex] = useState(0)

  const [selectedTraveler, setSelectedTraveler] = useState([])
  const [fillingArr, setFillingArr] = useState([])
  const [errorMessage, setErrorMessage] = useState([])


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
      certificateNo: "",
      certificateType: 1,
      createTime: "",
      id: '',
      isDelete: 0,
      suborderId: id,
      updateTime: "",
      validity: "",
      addrMsg: '',
      type: type
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
      index: id
    }
    return errorObj
  }
  /**
   * 表单验证
   */

  const rules = () => {
    const newErrorMessage = [...errorMessage]
    const nameReg = /^[\u4E00-\u9FA5]{2,4}$/
    const phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/
    subordersList.map((item, index) => {
      const nameTxt = nameReg.test(item['travelerName'])
      const phoneTxt = phoneReg.test(item['travelerPhoneNumber'])
      const emerNameTxt = nameReg.test(item['emerName'])
      const emerPhoneTxt = phoneReg.test(item['emerPhoneNumber'])
      const habitualResidencetext = item['habitualResidence']
      const travelerCertificateObj = travelerCertificateDtoList[index][0]
      const certificateNoText = travelerCertificateObj['certificateNo']
      const validityText = travelerCertificateObj['validity']
      if (!item.selectedTraveler) {
        if (!nameTxt) {
          newErrorMessage[index].nameMsg = item['travelerName'] == '' ? '请输入姓名' : '请输入正确的证件姓名'
        } else {
          newErrorMessage[index].nameMsg = ''
        }

        if (!phoneTxt) {
          newErrorMessage[index].phoneMsg = item['phoneNumber'] == '' ? '请输入手机号码' : '请输入正确的手机号'
        } else {
          newErrorMessage[index].phoneMsg = ''
        }

        if (!emerNameTxt) {
          newErrorMessage[index].emerNameMsg = item['emerName'] == '' ? '请输入紧急联系人' : '请输入正确联系人姓名'
        } else {
          newErrorMessage[index].emerNameMsg = ''
        }

        if (!emerPhoneTxt) {
          newErrorMessage[index].emerPhoneMsg = item['emerPhoneNumber'] == '' ? '请输入紧急联系人手机号码' : '请输入正确的手机号'
        } else {
          newErrorMessage[index].emerPhoneMsg = ''
        }
        if (item['travelerType'] == 1) {
          if (certificateNoText == '') {
            newErrorMessage[index].certificateNoMsg = '请输入证件号'
          } else {
            newErrorMessage[index].certificateNoMsg = ''
          }
          if (validityText == '') {
            newErrorMessage[index].validityMsg = '请输入证件过期日期'
          } else {
            newErrorMessage[index].validityMsg = ''
          }
        }
        if (habitualResidencetext) {
          newErrorMessage[index].addrMsg = ''
        } else {
          newErrorMessage[index].addrMsg = '请输入用户常住地址'
        }
      } else {
        newErrorMessage[index] = {}
      }
    })
    setErrorMessage(newErrorMessage)
    return judgeListComplete(newErrorMessage)
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
    const isNotComplete = list.findIndex(item => {
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
    Personal.getOrder(urlParams.id).then(res => {
      const travelerArr = []
      const errorMsg = []
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
    Personal.listInfo().then(res => {
      const { data } = res
      if (!data) return
      data.map(item => {
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
    const newSubordersList = [...subordersList]
    const fillingArr = []
    newSubordersList.map((item, i) => {
      if (obj.select) {
        newSubordersList.map((item, iList) => {
          console.log('item.travelerId == obj.id', item.travelerId == obj.id)
          if (item.travelerId == obj.id) {
            console.log('fillingArr', iList)
            onEmpty(iList)
          }
        })
      }
      if (!item['travelerName']) {
        fillingArr.push({ index: i })
      }
    })

    const newTravelerList = [...travelerList]
    newTravelerList.map(item => {
      console.log('fillingArr.length', fillingArr.length)
      if (obj.id == item['id']) {
        if (fillingArr.length > 0) {
          item['select'] = !item['select']
          for (let i = 0; i < newSubordersList.length; i++) {
            if (!newSubordersList[i].travelerName && !newSubordersList[i].selectedTraveler) {
              console.log('obj.travelerId', obj.id)
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
              break;
            }
          }
          newSelectedTraveler.push(obj)
        } else {
          Toast({
            message: `不能继续添加行程人了`,
          })
        }
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
    const newSubordersList = [...subordersList]
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

  const onSubmit = () => {
    if (rules()) {
      const certificate = []
      travelerCertificateDtoList.map((item, i) => {
        item.map((itemj, j) => {
          if (itemj.certificateNo != '') {
            certificate.push(itemj)
          }
        })
      })
      const postData = {
        suborderDtoList: [...subordersList],
        travelerCertificateDtoList: [...certificate]
      }
      console.log(postData)
      Personal.addPedestrianInfo(postData).then(res => {
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

  const getActionsText = (type) => {
    const item = actions[type]
    if (!type && type != 0) return '身份关系'
    return item.text
  }
  /**
   * 添加多个证件信息
   * @param val 
   * @param type 
   */

  const addOptionalInfo = (index) => {
    setNewKey(newKey + 1)
    const activeKey = `new${newKey}`
    const newObj = [...travelerCertificateDtoList]
    newObj[index].push(initialTravelerInfo(subordersList[index].id, activeKey))
    setTravelerCertificateDtoList(newObj)
  }

  const onSelect = (value, type, index) => {
    const newObj = [...travelerCertificateDtoList]

    newObj[index].map((item, i) => {
      if (item.type == type) {
        item['certificateType'] = value.text == '身份证' ? 1 : 2
      }
    })
    setTravelerCertificateDtoList(newObj)
  }
  /**
   * 证件过期时间
   */
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
    const newObj = [...travelerCertificateDtoList]

    newObj[timeIndex].map((item, i) => {
      if (item['type'] === showPickerId) {
        item['validity'] = datetime
      }
    })
    setTravelerCertificateDtoList(newObj)
  }
  /**
   * 证件号码
   */
  const onFieldChange = (value, type, index) => {

    const newObj = [...travelerCertificateDtoList]

    newObj[index].map((item, i) => {
      if (item.type == type) {
        item['certificateNo'] = value
      }
    })
    setTravelerCertificateDtoList(newObj)
  }

  /**
   * 
   */
  const changeAddrVal = (val) => {
    const newSubordersList = [...subordersList]
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
    set({ visible: false })
  }

  const deleteHandelOptional = (i, j) => {
    const list = travelerCertificateDtoList[i]

    const newInfolist = list.filter((item, index) => {
      return index != j
    })
    travelerCertificateDtoList.splice(i, 1, newInfolist)
    setTravelerCertificateDtoList([...travelerCertificateDtoList])
  }
  /**
   * 一键清空
   * @param i
   */
  const onEmpty = (i) => {
    const newSubordersList = [...subordersList]
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
      }
    })

    const newTravelerList = [...travelerList]
    newTravelerList.map(item => {
      if (newSubordersList[i].travelerId == item['id']) {
        item['select'] = false
      }
    })


    setTravelerList(newTravelerList)
    travelerCertificateDtoList.splice(i, 1, [initialTravelerInfo(subordersList[i].id)]);
    setSubordersList(newSubordersList)
  }

  const getRelationText = (id) => {
    let relationText = ''
    actions.map(item => {
      if (item.type == id) {
        relationText = item.text
      }
    })
    return relationText
  }

  return (
    <PageView>
      <div className="PersonalBind-container">
        <NoticeBar color="#fd7d81" background="#fdefef" leftIcon="warning">
          请填写真实可用信息，用于购买机票、火车票、办理住宿等
        </NoticeBar>
        {travelerList && travelerList.length > 0 && (
          <div className='bind-list'>
            <div className='bind-itemView'>
              {travelerList.map((item, index) => (
                index < 3 && (
                  <div onClick={() => onSelectItem(item)} key={`index${index}`} className={`bind-item ${item['select'] && 'bind-item-select'}`}>
                    <div className='text'>{item['travelerName']}</div>
                    <div className='hint'>{getRelationText(item['userTravelerRelation'])}</div>
                    {item['select'] && <div className='tag'>✓</div>}
                  </div>
                )
              ))}
            </div>
            <div onClick={() => setShowPopup(true)} className='bind-more'>
              <span className='text'>更多</span>
              <Icon name="arrow" />
            </div>
          </div>
        )}
        {subordersList && subordersList.length > 0 && (
          subordersList.map((item, index) => (
            item.selectedTraveler ? (
              <div key={`index${index}`} className="personal-content">
                <div className="personal-content-header">
                  <ul className="pch-ul">
                    <li className="pch-ul-li rv-hairline--bottom">
                      {item['travelerType'] == 1 && <div className="pul-name">成人</div>}
                      {item['travelerType'] == 0 && <div className="pul-name">儿童</div>}
                      <div onClick={() => onEmpty(index)} className='pul-emptyView'>一键清空</div>
                    </li>
                    <li className="pch-ul-li rv-hairline--bottom">
                      <div className='travelerView'>
                        <div className='traveler-user'>
                          <div className='user'>
                            <div className='name'>{item['travelerName']}</div>
                            <div className='tag'>{getRelationText(item['travelerRelation'])}</div>
                          </div>
                          <div className='phone'>{item['travelerPhoneNumber']}</div>
                        </div>
                        {travelerCertificateDtoList[index].map((travelerItem, travelerIndex) => (
                          <div key={`travelerIndex${travelerIndex}`} className='Id'>
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
                      <div onClick={() => onEmpty(index)} className='pul-emptyView'>一键清空</div>
                    </li>
                    <li className="pch-ul-li rv-hairline--bottom">
                      <div className="pul-name">证件姓名</div>
                      <div className="pul-content">
                        <Flex align="center">
                          <Flex.Item span={14}>
                            <Field
                              value={item['travelerName']}
                              placeholder="与证件姓名一致"
                              maxlength={10}
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
                              onSelect={(actionsItem) => { onPopoverSelect(actionsItem, index, 0) }}
                              reference={<div className="pul-content-title">{getActionsText(item['travelerRelation'])}</div>}
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
                          onChange={(val) => {
                            onTravelerPhone(val, index)
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
                    <li className="pch-ul-li-box rv-hairline--bottom">
                      <div className="hairline-top"></div>
                      <div className="optional-info">
                        {item['travelerType'] == 0 && <div className="optional-info-text">儿童选填</div>}
                        {travelerCertificateDtoList[index].map((travelerItem, travelerIndex) => {
                          return (
                            <div key={travelerIndex} className="optional-info-content">
                              <div className="oic-item rv-hairline--bottom">
                                <div className="oic-item-label oic-item-card">
                                  <Popover
                                    onSelect={(vals) => onSelect(vals, travelerItem.type, index)}
                                    actions={actionsCertificate}
                                    placement="bottom-start"
                                    reference={<span>{travelerItem['certificateType'] == 1 ? '身份证' : '护照'}</span>}
                                  />
                                </div>
                                <div className="oic-item-content">
                                  <Field
                                    className="oic-input"
                                    onChange={(val) => onFieldChange(val, travelerItem['type'], index)}
                                    value={travelerItem['certificateNo'] || ''}
                                    placeholder="请填写正确的证件号码"
                                    errorMessage={errorMessage[index].certificateNoMsg}
                                  />
                                </div>
                              </div>
                              <div className="oic-item rv-hairline--bottom">
                                <div className="oic-item-label oic-label-c">有效期至</div>
                                <div className="oic-item-content">
                                  <Field
                                    isLink
                                    readonly
                                    value={travelerItem['validity'] || ''}
                                    errorMessage={errorMessage[index].validityMsg}
                                    onClick={() => {
                                      setTimeIndex(index)
                                      setShowPicker(true)
                                      setShowPickerId(travelerItem['type'])
                                    }}
                                    placeholder="请选择"
                                  />
                                </div>
                              </div>
                              {travelerCertificateDtoList[index].length > 1 && (
                                <div
                                  className="optional-info-del"
                                  onClick={() => {
                                    deleteHandelOptional(index, travelerIndex)
                                  }}
                                ></div>
                              )}
                              {travelerCertificateDtoList[index].length > 1 && <div className="oic-line"></div>}
                            </div>
                          )
                        })}
                        {travelerCertificateDtoList[index].length <= 1 && (
                          <div>
                            <div className="optional-add  rv-hairline--top">
                              <div
                                className="optional-add-btn"
                                onClick={() => {
                                  addOptionalInfo(index)
                                }}
                              >
                                <img className='optional-add-img' src={addIcon} />
                                <div className='optional-add-txt'>添加其他证件</div>
                              </div>
                            </div>
                            <div className="oic-line"></div>
                          </div>
                        )}


                      </div>
                    </li>

                    <li className="pch-ul-li rv-hairline--bottom">
                      <div className="pul-name">紧急联系人</div>
                      <div className="pul-content">
                        <Flex align="center">
                          <Flex.Item span={14}>
                            <Field
                              value={item['emerName']}
                              placeholder="联系人姓名"
                              maxlength={10}
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
                              onSelect={(actionsItem) => { onPopoverSelect(actionsItem, index, 1) }}
                              reference={<div className="pul-content-title">{getActionsText(item['emerTravelerRelation'])}</div>}
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
          ))
        )}
        <div
          onClick={() => {
            onSubmit()
          }}
          className={'personal-submit'}
        >
          <div className={'personal-submit-btn'}>
            提交信息
          </div>
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
      <Popup
        visible={showPopup}
        closeable
        title='选择出行人'
        style={{ height: '60%' }}
        position="bottom"
        onClickCloseIcon={() => {
          setShowPopup(false)
        }}
        onClickOverlay={() => {
          setShowPopup(false)
        }}
        round
        className='PersonalBind-popupView'
        safeAreaInsetBottom
      >
        <div className='popupView'>
          <div className='container'>
            {travelerList.map((item, index) => (
              <div key={`index${index}`} className='travelerItem'>
                <div className='info'>
                  <div className='nameView'>
                    <div className='name'>
                      <div className='text'>
                        {item['travelerName']}
                      </div>
                      {getRelationText(item['userTravelerRelation']) && (
                        <div className='tag'>
                          {getRelationText(item['userTravelerRelation'])}
                        </div>
                      )}

                    </div>
                    <div className='phoneNum'>{item['phoneNumber']}</div>
                  </div>
                  <div className='IDcard'>
                    身份证{item['travelerCertificate'][0].certificateNo}
                  </div>
                </div>
                <div onClick={() => onSelectItem(item)} className='selectView'>
                  <img alt="" className="img-icon" src={item['select'] ? activeIcon : inactiveIcon} />
                </div>
              </div>
            ))}
          </div>
          <div className='popupViewBtn'>
            <div className='text'>确定</div>
          </div>
        </div>
      </Popup>
    </PageView >
  )
}
export default PersonalBindPage
