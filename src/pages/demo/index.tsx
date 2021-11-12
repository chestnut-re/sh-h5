import { common } from '@/service'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Test from '@/components/Test'
import { Link } from 'react-router-dom'
import './index.less'

const DemoPage = observer(() => {
  const [getResult, setGetResult] = useState('')
  const store = useStore()

  const testGetRequest = async () => {
    const res = await common.getUser()
    setGetResult(JSON.stringify(res))
  }

  const changeUserName = () => {
    console.log(store)
    store.userStore.setUserName('asds')
  }

  return (
    <div className="Home">
      <div className="title">DemoPage</div>
      <Test />
      <button onClick={testGetRequest}>Test get requestTest</button>
      <div className="block">测试 UI 适配</div>
      <p>{getResult}</p>
      <button onClick={changeUserName}>Change User Name</button>
      <Link to="/mine">测试跳转：To MinePage</Link>
    </div>
  )
})

export default DemoPage
