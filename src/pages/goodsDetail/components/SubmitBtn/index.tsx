/* eslint-disable @typescript-eslint/ban-ts-comment */
import useWXInit from '@/hooks/useWXInit'
import { SHBridge } from '@/jsbridge'
import { isWeChat } from '@/jsbridge/env'
import { generateUrl, getUrlParams } from '@/utils'
import { getCookie } from '@/utils/cookie'
import React, { useEffect, useRef, useState } from 'react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  dataAll: any
  img: string
  templateKey: PageTemplateKey
}

/**
 * 立即下单按钮
 */
const SubmitBtn: React.FC<Props> = ({ dataAll, templateKey, img }) => {
  const pageRef = useRef<any>({})
  const wxRef = useWXInit()
  const [weChat, setWeChat] = useState(false)

  useEffect(() => {
    const params = getUrlParams(window.location.href)
    pageRef.current.id = params['id']
    pageRef.current.goodsPriceId = params['goodsPriceId']

    isWeChat().then((res) => {
      setWeChat(res)
    })
  }, [])

  const makeOrder = () => {
    isWeChat().then((res) => {
      if (res) {
        return
      }
      SHBridge.jump({
        url: generateUrl(`/submit-order?id=${pageRef.current.id}&goodsPriceId=${pageRef.current.goodsPriceId}`),
        newWebView: true,
        title: '下单',
        needLogin: true,
      })
    })
  }
  const litterUrl = `${window.location.origin}${window.location.pathname}?id=${dataAll?.id}&goodsPriceId=${
    dataAll?.goodsPriceId
  }&userId=${getCookie('userId')}&isRebate=${dataAll?.isRebate}&isPurchase=${dataAll?.isPurchase}&isPurchaseAdd=${
    dataAll?.isPurchaseAdd
  }`

  const pathURL = `/pages/webview/index.html?url=${encodeURIComponent(litterUrl)}`

  if (weChat) {
    return (
      <div className={`SubmitBtn__root SubmitBtn__root__${templateKey}`}>
        {img && <img className="btn-img" src={img} onClick={makeOrder} />}
        {/* @ts-ignore */}
        <wx-open-launch-weapp
          ref={wxRef}
          username="gh_0a0abf8e5843"
          path={pathURL}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <script type="text/wxtag-template">
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
