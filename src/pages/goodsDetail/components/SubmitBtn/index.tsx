/* eslint-disable @typescript-eslint/ban-ts-comment */
import useWXInit from '@/hooks/useWXInit'
import { SHBridge } from '@/jsbridge'
import { isWeChat } from '@/jsbridge/env'
import { generateUrl } from '@/utils'
import React, { useEffect, useState } from 'react'
import { Divider } from 'react-vant'
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
  const wxRef = useWXInit()
  const [weChat, setWeChat] = useState(false)

  useEffect(() => {
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
        url: generateUrl(`/submit-order`),
        newWebView: true,
        title: '下单',
        needLogin: true,
      })
    })
  }
  // const litterUrl = `${window.location.origin}${window.location.pathname}?id=${dataAll?.id}&goodsPriceId=${dataAll?.goodsPriceId}&userId=${pageRef.current.userId}&isPurchase=${dataAll?.isPurchase}&isPurchaseAdd=${dataAll?.isPurchaseAdd}&source=${pageRef.current.source}`

  const litterUrl = generateUrl(
    `/goods-detail?goodsPriceId=${dataAll?.goodsPriceId}&isPurchase=${dataAll?.isPurchase}&isPurchaseAdd=${dataAll?.isPurchaseAdd}`
  )

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
      {img && (
        <div className="img-wrapper">
          <img className="img" src={img} onClick={makeOrder} />
        </div>
      )}
    </div>
  )
}

export default SubmitBtn
