import { clearAllCookie, printCookie } from '@/utils/cookie'
import { observer } from 'mobx-react-lite'
import React from 'react'
import './index.less'
import { Button, Cell } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { isApp } from '@/jsbridge/env'

const TestPage = observer(() => {
  return (
    <div className="Mine">
      <div className="mineTitle">MineTitle</div>
      <Button
        onClick={() => {
          clearAllCookie()
        }}
      >
        清理 cookie
      </Button>
      <Button
        onClick={() => {
          document.cookie = 'nameOne=IAmDaShuaiBi'
          document.cookie = 'idOne=233'
        }}
      >
        设置 cookie
      </Button>
      <div>cookie: {document.cookie}</div>

      <div>ua: {navigator.userAgent}</div>

      <div>isApp: {isApp()}</div>

      <Cell.Group title="导航栏相关">
        <Cell
          title="设置Title"
          onClick={() => {
            console.log('title')
            SHBridge.setTitle(`${Date.now()}`)
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
          title="jump https://baidu.com"
          onClick={() => {
            SHBridge.jump('https://baidu.com')
          }}
        />
         <Cell
          title="closePage 关闭页面"
          onClick={() => {
            SHBridge.closePage()
          }}
        />
      </Cell.Group>
    </div>
  )
})

export default TestPage
