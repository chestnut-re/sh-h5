import { clearAllCookie, printCookie } from '@/utils/cookie'
import React, { useEffect } from 'react'
import './index.less'
import { Button, Cell, Toast } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { isApp } from '@/jsbridge/env'
import { FileService } from '@/service/FileService'

/**
 * H5 设置页
 */
const TestPage = () => {
  useEffect(() => {}, [])

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
          title="设置标题action"
          onClick={() => {
            SHBridge.setTitleAction(['第一个', '第二个'], (index) => {
              Toast(index.toString())
            })
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
          title="跳转页面 https://baidu.com"
          onClick={() => {
            SHBridge.jump({ url: 'https://baidu.com' })
          }}
        />
        <Cell
          title="跳转页面/打开新页面 https://baidu.com "
          onClick={() => {
            SHBridge.jump({ url: 'https://baidu.com', newWebView: true })
          }}
        />
        <Cell
          title="closePage 关闭页面"
          onClick={() => {
            SHBridge.closePage()
          }}
        />
      </Cell.Group>
      <Cell.Group title="文件上传">
        <Cell title="图片上传-纯H5">
          <input type="file" name="image" accept="image/*" onChange={_handleImgInputChange} />
        </Cell>
      </Cell.Group>
    </div>
  )
}

export default TestPage
