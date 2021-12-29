import React, { useState, FC, useRef, useEffect, useCallback } from 'react'
import { hooks, NoticeBar, Icon, Button, Radio, Flex, Toast, Popup, Area, Field, Popover, ConfigProvider } from 'react-vant'
import PageView from '@/components/personal/pageView'
import { Personal } from '@/service/Personal'
import inactiveIcon from '@/assets/img/inactive_Icon@3x.png'
import activeIcon from '@/assets/img/active_Icon@3x.png'

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


const PersonalBindPage: FC = () => {
  const [travelerList, setTravelerList] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [subordersList, setSubordersList] = useState([])

  const [userTrave, setUserTrave] = useState('与我的关系')

  useEffect(() => {
    getList()
    getOrderInfo()
  }, [])
  /**
   * 获取订单信息
   */

  const getOrderInfo = () => {
    Personal.getOrder('1475748114721476609').then(res => {
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

  const onSubmit = () => {
    Personal.addPedestrianInfo(subordersList).then(res => {
      console.log('paramsparams', res)
    })
  }

  return (
    <PageView>
      <div className="PersonalBind-container">
        <NoticeBar color="#fd7d81" background="#fdefef" leftIcon="warning">
          请填写真实可用信息，用于购买机票、火车票、办理住宿等
        </NoticeBar>

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

        {subordersList.length > 0 && (
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
                            onSelect={(item) => {
                              // onPopoverSelect(item, 0)
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
                    <div className="pul-name">紧急联系人</div>
                    <div className="pul-content">
                      <Flex align="center">
                        <Flex.Item span={14}>
                          <Field
                            value={item['emerName']}
                            placeholder="联系人姓名"
                            // errorMessage={state.errorMessage['emerNameMsg']}
                            onChange={(val) => {
                              // setSubmitdata({
                              //   emerName: val,
                              // })
                            }}
                          />
                        </Flex.Item>
                        <Flex.Item span={10} className="pul-content-right">
                          <Popover
                            placement="top-end"
                            actions={actions}
                            // onSelect={onPopoverSelect}
                            reference={<div className="pul-content-title">{ }</div>}
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
                          // setSubmitdata({
                          //   emerPhoneNumber: val,
                          // })
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
    </PageView>
  )
}
export default PersonalBindPage
