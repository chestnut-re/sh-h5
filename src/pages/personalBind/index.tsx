import React, { useState, FC, useRef, useEffect, useCallback } from 'react'
import { hooks, NoticeBar, Icon, Button, Radio, Flex, Toast, Popup, Area, Field, Popover, DatetimePicker } from 'react-vant'
import PageView from '@/components/personal/pageView'
import { Personal } from '@/service/Personal'
import inactiveIcon from '@/assets/img/inactive_Icon@3x.png'
import activeIcon from '@/assets/img/active_Icon@3x.png'
import { areaList } from '@vant/area-data'
import OrderTravelerView from '@/components/orderTravelerView'
import addIcon from '@/assets/img/add_icon@3x.png'
import { getUrlParams } from '@/utils'
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

const PersonalBindPage: FC = () => {
  const [showPicker, setShowPicker] = useState(false)
  const [showPickerId, setShowPickerId] = useState()

  const [travelerList, setTravelerList] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [subordersList, setSubordersList] = useState([])
  const [travelerCertificateDtoList, setTravelerCertificateDtoList] = useState([])
  const [newKey, setNewKey] = useState(1)

  const [timeIndex, setTimeIndex] = useState(0)
  const [addrIndex, setAddrIndex] = useState(0)

  const fieldRef = useRef();

  const optionalInfoRef = useRef()

  const [state, set] = hooks.useSetState({
    visible: false,
    travelerCertificate: [], //出行人证件信息
  })

  const urlParams = getUrlParams(window.location.href)


  useEffect(() => {
    getList()
    getOrderInfo()
  }, [])
  /**
   * 获取订单信息
   */

  const getOrderInfo = () => {
    Personal.getOrder(urlParams.id).then(res => {
      const travelerArr = []
      res.data.map((item) => {
        item['addr'] = ''
        travelerArr.push([
          {
            "certificateNo": "",
            "certificateType": 1,
            "createTime": "",
            "id": item.id,
            "isDelete": 0,
            "suborderId": 0,
            "updateTime": "",
            "validity": "",
            'type': 1
          }
        ])
      })
      setTravelerCertificateDtoList(travelerArr)
      setSubordersList(res.data)
      console.log('resresresresres', res)
    })
  }
  /**
   * 获取出行人列表
   */
  const getList = () => {
    Personal.list().then(res => {
      const { data } = res
      if (!data) return
      data.map(item => {
        item.select = false
      })
      setTravelerList(data)
    })
  }
  const onSelectItem = (obj) => {
    const newTravelerList = [...travelerList]
    newTravelerList.map(item => {
      if (obj.travelerId == item['travelerId']) {
        item['select'] = !item['select']
      }
    })
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
    newSubordersList.map((item, index) => {
      if (i === index) {
        item['travelerName'] = val
      }
    })
    setSubordersList(newSubordersList)
  }

  /**
   * 修改出现人手机号码
   * @param val 
   * @param i 
   */

  const onTravelerPhone = (val, i) => {
    const newSubordersList = [...subordersList]
    newSubordersList.map((item, index) => {
      if (i === index) {
        item['travelerPhoneNumber'] = val
      }
    })
    setSubordersList(newSubordersList)
  }

  /**
   * 修改紧急联系人姓名
   * @param val 
   * @param i 
   */

  const onEmerTravelerName = (val, i) => {
    const newSubordersList = [...subordersList]
    newSubordersList.map((item, index) => {
      if (i === index) {
        item['emerName'] = val
      }
    })
    setSubordersList(newSubordersList)
  }

  /**
   * 修改紧急联系人手机号码
   * @param val 
   * @param i 
   */

  const onEmerTravelerPhone = (val, i) => {
    const newSubordersList = [...subordersList]
    newSubordersList.map((item, index) => {
      if (i === index) {
        item['emerPhoneNumber'] = val
      }
    })
    setSubordersList(newSubordersList)
  }

  const onSubmit = () => {
    // console.log('pruneprune', prune())
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
    console.log('postDatapostData', postData)
    Personal.addPedestrianInfo(postData).then(res => {
      if (res['code'] == '200') {
        SHBridge.closePage()
        Toast({
          message: '添加成功',
        })
      }
      console.log('paramsparams', res)
    })
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
    newObj[index].push({
      "certificateNo": "",
      "certificateType": 1,
      "createTime": "",
      "id": subordersList[index].id,
      "isDelete": 0,
      "suborderId": '1',
      "updateTime": "",
      "validity": "",
      'type': activeKey
    })
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
    console.log('newObj', newObj, type)
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
        item['addr'] = res
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
                    <span className='text'>{item['travelerName']}</span>
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
            <div key={`index${index}`} className="personal-content">
              <div className="personal-content-header">
                <ul className="pch-ul">
                  <li className="pch-ul-li rv-hairline--bottom">
                    {item['travelerType'] == 1 && <div className="pul-name">成人</div>}
                    {item['travelerType'] == 0 && <div className="pul-name">儿童</div>}
                  </li>
                  <li className="pch-ul-li rv-hairline--bottom">
                    <div className="pul-name">证件姓名</div>
                    <div className="pul-content">
                      <Flex align="center">
                        <Flex.Item span={14}>
                          <Field
                            value={item['travelerName']}
                            placeholder="与证件姓名一致"
                            // errorMessage={state.errorMessage['nameMsg']}
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
                        // errorMessage={state.errorMessage['phoneMsg']}
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
                        value={item.addr}
                        label=""
                        // errorMessage={state.errorMessage['addrMsg']}
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
                      <div onClick={addOptionalInfo} className="optional-info-text">儿童选填</div>
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
                              <div className='optional-add-txt'>添加证件</div>
                            </div>
                          </div>
                          <div className="oic-line"></div>
                        </div>
                      )}


                    </div>
                    {/* <OrderTravelerView onFieldChange={onOrderTravelerChange} /> */}
                  </li>

                  <li className="pch-ul-li rv-hairline--bottom">
                    <div className="pul-name">紧急联系人</div>
                    <div className="pul-content">
                      <Flex align="center">
                        <Flex.Item span={14}>
                          <Field
                            value={item['emerName']}
                            placeholder="联系人姓名"
                            // errorMessage={state.errorMessage['emerNameMsg']}
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
                        // errorMessage={state.errorMessage['emerPhoneMsg']}
                        onChange={(val) => {
                          onEmerTravelerPhone(val, index)
                        }}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
        style={{ height: '50%' }}
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
                      <div className='tag'>
                        本人
                      </div>
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
