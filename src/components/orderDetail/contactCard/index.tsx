import React, { useState, FC } from 'react'

import wecharIcon from '@/assets/img/wechar_icon@3x.png'
import './index.less'
/**
 * 打开微信联系团长卡片
 */
interface ContactType {
  openContactCustomer: (val) => void
}
const ContactCard: FC<ContactType> = ({ openContactCustomer }) => {
  return (
    <div className="contact_card" onClick={openContactCustomer}>
      <div className="card-l">
        <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div className="card-c">
        <div className="card-ct">五星团长 赵大白</div>
        <div className="card-cb">如有疑问 可联系我</div>
      </div>
      <div className="card-r">
        <img src={wecharIcon} />
      </div>
    </div>
  )
}

export default ContactCard
