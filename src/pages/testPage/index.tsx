import { clearAllCookie, printCookie } from '@/utils/cookie'
import React, { useEffect, useState } from 'react'
import './index.less'
import { Button, Cell, Toast } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { isApp, isMini } from '@/jsbridge/env'
import { FileService } from '@/service/FileService'
import { generateUrl } from '@/utils'
import TravelCodeCard from '@/components/orderDetail/travelCodeCard'

/**
 * H5 设置页
 */
const TestPage = () => {
  useEffect(() => {
    console.log('load data')
  }, [])
  const [appInfo, setAppInfo] = useState({})
  /**图片上传 */
  const _handleImgInputChange = (event) => {
    console.log(event)
    const file = event.target.files[0]
    FileService.uploadImg(file).then((res) => {
      console.log(res)
      // {"code":"200","msg":"成功","data":{"ossServerUrl":"https://shanhai-shoping.oss-cn-beijing.aliyuncs.com/","fileUrl":"img/user/pic34c43201aad3457da85f00dd7defd06f.jpg"}}
    })
  }

  return (
    <div className="Mine">
      <Cell.Group title="数据">
        <Cell title="cookie">{document.cookie}</Cell>
        <Cell title="ua">{navigator.userAgent}</Cell>
        <Cell
          title="清理 cookie"
          onClick={() => {
            clearAllCookie()
          }}
        />
        <Cell
          title="设置 cookie"
          onClick={() => {
            document.cookie = 'nameOne=IAmDaShuaiBi'
            document.cookie = 'idOne=233'
          }}
        />
        <Cell
          title="获取app信息"
          onClick={() => {
            SHBridge.getAppInfo((info) => {
              console.log(info)
              Toast(JSON.stringify(info))
              setAppInfo(info)
            })
          }}
        >
          {JSON.stringify(appInfo)}
        </Cell>
      </Cell.Group>
      <Cell.Group title="导航栏相关">
        <Cell
          title="环境判断"
          onClick={() => {
            if (isApp()) {
              SHBridge.showToast(`App: true`)
            }

            isMini().then((res) => {
              console.log(res)
              if (res) {
                SHBridge.showToast(`微信小程序:${res}`)
              }
            })
          }}
        />
      </Cell.Group>

      <Cell.Group title="导航栏相关">
        <Cell
          title="设置Title"
          onClick={() => {
            console.log('title')
            SHBridge.setTitle(`${Date.now()}`)
          }}
        />
        <Cell
          title="设置TitleColor"
          onClick={() => {
            console.log('title')
            SHBridge.setTitleColor('#ff0000')
          }}
        />
        <Cell
          title="设置全屏"
          onClick={() => {
            SHBridge.setFullScreen('1')
          }}
        />
        <Cell
          title="取消全屏"
          onClick={() => {
            SHBridge.setFullScreen('0')
          }}
        />
        <Cell
          title="设置标题action"
          onClick={() => {
            SHBridge.setTitleAction(
              [
                { value: '第一个', type: 'text' },
                {
                  value:
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0179995befdd37a8012092526f378c.jpg%402o.jpg',
                  type: 'img',
                },
              ],
              (index) => {
                Toast(index.toString())
              }
            )
          }}
        />
        <Cell
          title="设置导航栏背景色"
          onClick={() => {
            SHBridge.setNavBgColor('#ff0000')
          }}
        />
      </Cell.Group>
      <Cell.Group title="UI 相关">
        <Cell
          title="showToast"
          onClick={() => {
            SHBridge.showToast('提示')
          }}
        />
      </Cell.Group>
      <Cell.Group title="跳转">
        <Cell
          title="跳转页面 /money-record"
          onClick={() => {
            SHBridge.jump({ url: generateUrl('/money-record') })
          }}
        />
        <Cell
          title="跳转页面/打开新页面 /money-record "
          onClick={() => {
            SHBridge.jump({ url: generateUrl('/money-record'), newWebView: true })
          }}
        />
        <Cell
          title="closePage 关闭页面"
          onClick={() => {
            SHBridge.closePage()
          }}
        />
        <Cell
          title="打开订单管理 /order-management "
          onClick={() => {
            SHBridge.jump({ url: generateUrl('/order-management'), newWebView: true, title: '订单管理' })
          }}
        />
        <Cell
          title="打开订单搜索 /order-search "
          onClick={() => {
            SHBridge.jump({ url: generateUrl('/order-search'), newWebView: true, title: '订单搜索' })
          }}
        />
        <Cell
          title="打开主题活动 /special-events "
          onClick={() => {
            SHBridge.jump({ url: generateUrl('/special-events'), newWebView: true })
          }}
        />
      </Cell.Group>
      <Cell.Group title="文件上传">
        <Cell title="图片上传-纯H5">
          <input type="file" name="image" accept="image/*" onChange={_handleImgInputChange} />
        </Cell>
      </Cell.Group>

      <Cell.Group title="支付">
        <Cell
          title="支付宝支付 "
          onClick={() => {
            SHBridge.alipay('ssdsd', (res) => {
              console.log(res)
            })
          }}
        />
        <Cell
          title="wx支付0"
          onClick={() => {
            SHBridge.wxpay(
              {
                sign: '6273E317EDD13030BE43A42736EAD036',
                prepayId: 'wx2814184311027687378e512ff1572f0000',
                partnerId: '1616096595',
                appId: 'wx170bc3c8dbf95e06',
                packageValue: 'Sign=WXPay',
                timeStamp: '1640672323',
                nonceStr: '1o85w4TFAaXpplno',
              },
              (res) => {
                // 成功返回
                const successRes = {
                  errorCode: 0,
                  errorMsg: 0,
                  returnKy: '',
                }
                console.log(res)
              }
            )
          }}
        />
        <Cell
          title="小程序支付"
          onClick={() => {
            const data = {
              appId: 'wx99c32486e840e570',
              timeStamp: '1640671611',
              nonceStr: 'uQzeFXcIUfWzZvlH',
              package: 'prepay_id=wx28140651756841b6ed35c097345bc10000',
              signType: 'MD5',
              paySign: '955D0ED896A76143F1A13CA3B7F4FDE7',
            }
            SHBridge.minipay(JSON.stringify(data), 1,"1495909405900 ")
          }}
        />
      </Cell.Group>

      <TravelCodeCard {...{travelerName:"测试码",
        id:"213123123123",
        orderId:"88812381283",
        state:3}}/>
    </div>
  )
}

export default TestPage
