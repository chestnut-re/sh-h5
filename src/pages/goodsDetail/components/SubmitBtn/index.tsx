import { SHBridge } from '@/jsbridge'
import { generateUrl, getUrlParams } from '@/utils'
import React, { useEffect, useRef, useState } from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  img: string
  templateKey: PageTemplateKey
}

/**
 * 立即下单按钮
 */
const SubmitBtn: React.FC<Props> = ({ templateKey, img }) => {
  const pageRef = useRef<any>({})

  useEffect(() => {
    const params = getUrlParams(window.location.href)
    pageRef.current.id = params['id']
    pageRef.current.goodsPriceId = params['goodsPriceId']
    //TODO: test
    pageRef.current.id = pageRef.current.id || '1473837487611928576'
    pageRef.current.goodsPriceId = pageRef.current.goodsPriceId || '1473837487616122880'
    //end
  }, [])

  const makeOrder = () => {
    console.log('dainji')
    SHBridge.jump({
      url: generateUrl(`/submit-order?id=${pageRef.current.id}&goodsPriceId=${pageRef.current.goodsPriceId}`),
      newWebView: true,
      title: '下单',
      needLogin: true,
    })
  }
  return (
    <div className={`SubmitBtn__root SubmitBtn__root__${templateKey}`}>
      {img && <img className="btn-img" src={img} onClick={makeOrder} />}
    </div>
  )
}

export default SubmitBtn
