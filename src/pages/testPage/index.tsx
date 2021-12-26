import { clearAllCookie, printCookie } from '@/utils/cookie'
import React, { useEffect, useState } from 'react'
import './index.less'
import { Button, Cell, Toast } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { isApp } from '@/jsbridge/env'
import { FileService } from '@/service/FileService'
import { generateUrl } from '@/utils'

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
            SHBridge.jump({ url: generateUrl('/order-search?isFullScreen=1'), newWebView: true })
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
      </Cell.Group>
    </div>
  )
}

export default TestPage
