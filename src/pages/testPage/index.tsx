import { clearAllCookie, printCookie } from '@/utils/cookie'
import React, { useEffect } from 'react'
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
          title="设置TitleColor"
          onClick={() => {
            console.log('title')
            SHBridge.setTitleColor('#ff0000')
          }}
        />
        <Cell
          title="设置标题action"
          onClick={() => {
            SHBridge.setTitleAction(
              [
                { text: '第一个', type: 'text' },
                {
                  text: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=icon&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3181153752,3984838184&os=3143546603,3954237760&simid=3468328744,312494263&pn=30&rn=1&di=134860&ln=1877&fr=&fmq=1639991279425_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fimg.zcool.cn%252Fcommunity%252F0179995befdd37a8012092526f378c.jpg%25402o.jpg%26refer%3Dhttp%253A%252F%252Fimg.zcool.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1642583279%26t%3D3dc61069427fd93bb6ea37d3b0626aec&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDYsMSw0LDIsNSw4LDcsOQ%3D%3D',
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
