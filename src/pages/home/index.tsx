import { common } from '@/service'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Test from '@/components/Test'
import { Link } from 'react-router-dom'
import './index.less'

const HomePage = observer(() => {
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
      <h1 className="title">HomePage</h1>
      <Test />
      <button onClick={testGetRequest}>Test get requestTest</button>
      <div className="block">ss</div>
      <p>{getResult}</p>
      <button onClick={changeUserName}>Change User Name</button>
      <p>user name: {JSON.stringify(store.userStore.user)}</p>
      <Link to="/mine">To MinePage</Link>
      <Link to="/demo">To DemoPage</Link>
      <Link to="/orderdetail/1">打开订单详情</Link>
      
      <Link to="/abulkshop">打开 团小店</Link>
      <Link to="/puorder">提交订单</Link>
      
    </div>
  )
})

export default HomePage
