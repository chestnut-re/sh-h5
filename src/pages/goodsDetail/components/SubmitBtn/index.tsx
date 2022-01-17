/* eslint-disable @typescript-eslint/ban-ts-comment */
import useWXInit from '@/hooks/useWXInit'
import { SHBridge } from '@/jsbridge'
import { isWeChat } from '@/jsbridge/env'
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
  const wxRef = useWXInit()

  useEffect(() => {
    const params = getUrlParams(window.location.href)
    pageRef.current.id = params['id']
    pageRef.current.goodsPriceId = params['goodsPriceId']
  }, [])

  const makeOrder = () => {
    SHBridge.jump({
      url: generateUrl(`/submit-order?id=${pageRef.current.id}&goodsPriceId=${pageRef.current.goodsPriceId}`),
      newWebView: true,
      title: '下单',
      needLogin: true,
    })
  }

  if (isWeChat()) {
    return (
      <div className={`SubmitBtn__root SubmitBtn__root__${templateKey}`}>
        {img && <img className="btn-img" src={img} onClick={makeOrder} />}
        {/* @ts-ignore */}
        <wx-open-launch-weapp
          ref={wxRef}
          username="gh_0a0abf8e5843" //小程序原始ID
          path="pages/index/index.html"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <script type="text/wxtag-template">
            {/* 这里唤起小程序的点按区域 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
              }}
            ></div>
          </script>
          {/* @ts-ignore */}
        </wx-open-launch-weapp>
      </div>
    )
  }
  return (
    <div className={`SubmitBtn__root SubmitBtn__root__${templateKey}`}>
      {img && <img className="btn-img" src={img} onClick={makeOrder} />}
    </div>
  )
}

export default SubmitBtn
