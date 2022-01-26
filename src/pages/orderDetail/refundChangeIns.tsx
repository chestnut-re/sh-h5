import React, { useState, useEffect, useRef, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import { SHBridge } from '@/jsbridge'
import { OrderApi } from '@/service/OrderDetailApi'
import { Empty } from 'react-vant'
import emptyIcon from '@/assets/img/empty@3x.png'
import './refund.less'
/**
 * 退改说明
 */

const RefundChangeIns: FC = () => {
  const { search } = useLocation()
  const { goodsId } = qs.parse(search.slice(1))

  const [backinfo, setBackinfo] = useState('')
  useEffect(() => {
    SHBridge.setTitle(`退改说明`)

    OrderApi.detail({
      id: goodsId,
    }).then((res) => {
      const { code, data } = res
      if (code === '200' && data) {
        const { refundAndChangePolicyContent } = data
        setBackinfo(refundAndChangePolicyContent)
      }
      console.log('res :>> ', res)
    })
  }, [])
  return (
    <div className="RefundIns-container">
      {backinfo ? (
        <div dangerouslySetInnerHTML={{ __html: backinfo }} />
      ) : (
        <Empty className="custom-image" image={emptyIcon} description="暂无退改说明" />
      )}
    </div>
  )
}

export default RefundChangeIns
