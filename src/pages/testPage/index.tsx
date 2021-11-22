import { clearAllCookie, printCookie } from '@/utils/cookie'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

const TestPage = observer(() => {
  return (
    <div className="Mine">
      <div className="mineTitle">MineTitle</div>
      <button
        onClick={() => {
          clearAllCookie()
        }}
      >
        清理 cookie
      </button>
      <button
        onClick={() => {
          document.cookie = 'nameOne=IAmDaShuaiBi'
          document.cookie = 'idOne=233'
        }}
      >
        设置 cookie
      </button>
      <div>cookie: {document.cookie}</div>
    </div>
  )
})

export default TestPage
