import React, { useState, FC, useEffect } from 'react'
import { SHBridge } from '@/jsbridge'
import wecharIcon from '@/assets/img/wx_icon@3x.png'
import { ContactApi } from '@/service/Customerservice'
import { Image, Toast } from 'react-vant'
import './index.less'
/**
 * 打开微信联系团长卡片
 * type：1 订单客服 2 咨询客服 3 专属客服
 */
interface ContactType {
  type: number
  id: number | string
}
const ContactCard: FC<ContactType> = ({ type, id }) => {
  //客服信息
  const [contactInfo, setContactInfo] = useState()
  useEffect(() => {
    getcontactData()
  }, [])
  const getcontactData = async () => {
    let dataInfo
    if (type === 1) {
      dataInfo = await ContactApi.orderContact(id)
    } else if (type === 2) {
      dataInfo = await ContactApi.consultContact(id)
    } else if (type === 3) {
      dataInfo = await ContactApi.exclusiveContact(id)
    }
    if (dataInfo) {
      const { code, data } = dataInfo
      if (code === '200' && data) {
        setContactInfo(data)
      }
      console.log('object客服信息 :>> ', code, dataInfo)
    }
  }

  const openContactCustomerService = () => {
    const { userId } = contactInfo
    if (SHBridge.isLogin()) {
      if (!userId) {
        Toast('客服信息有误，请稍后再试')
        return
      }
      SHBridge.toChat(userId)
    } else {
      SHBridge.login()
    }
  }

  return (
    <>
      {contactInfo ? (
        <div className="contact_card" onClick={openContactCustomerService}>
          <div className="card-l">
            <Image width="100%" height="100%" fit="cover" src={contactInfo['pic']} />
          </div>
          <div className="card-c">
            <div className="card-ct">{contactInfo['realName']}</div>
            <div className="card-cb">如有疑问 可联系我</div>
          </div>
          <div className="card-r">
            <img src={wecharIcon} />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ContactCard
