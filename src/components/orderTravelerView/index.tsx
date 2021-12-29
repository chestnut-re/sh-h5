import React, { FC, useState, useEffect } from 'react'
import addIcon from '@/assets/img/add_icon@3x.png'
import {
  Popover,
  Popup,
  DatetimePicker,
  Field,
  hooks
} from 'react-vant'
import './index.less'
/**
 * 
 */
interface Props {
  onFieldChange: () => void
}
const infos = {
  type: 0,
  certificateNo: '',
  validity: '',
  certificateType: '身份证',
}

const OrderTravelerView: FC<Props> = (props) => {
  const [infolist, setInfolist] = useState([] as any[])
  useEffect(() => {
    setInfolist([infos])
  }, [])

  const { onFieldChange } = props;

  const onIndexChange = (value, type) => {
    const newInfolist = [...infolist]

    newInfolist.map((item, i) => {
      if (item['type'] === type) {
        item['certificateNo'] = value
      }
    })
    onFieldChange(value, '1')
    setInfolist(newInfolist)
  }

  const addOptionalInfo = () => {
    console.log('123')
  }

  return (
    <div className="optional-info">
      <div className="optional-info-text">儿童选填</div>
      {infolist.map((item, index) => (
        <div key={index} className="optional-info-content">
          <div className="oic-item rv-hairline--bottom">
            <div className="oic-item-label oic-item-card">
              <Popover
                // onSelect={(vals) => onSelect(vals, item['type'])}
                // actions={actions}
                placement="bottom-start"
                reference={<span>{item['certificateType']}</span>}
              />
            </div>
            <div className="oic-item-content">
              <Field
                className="oic-input"
                onChange={(val) => onIndexChange(val, item['type'])}
                value={item['certificateNo'] || ''}
                placeholder="请填写正确的证件号码"
              />
            </div>
          </div>
        </div>
      ))}
      {infolist.length <= 1 && (
        <div>
          <div className="optional-add  rv-hairline--top">
            <div
              className="optional-add-btn"
              onClick={() => {
                addOptionalInfo()
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
  )
}

export default OrderTravelerView