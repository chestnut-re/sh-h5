import { common } from '@/service'
import React, { useEffect, useState } from 'react'
import Test from '@/components/Test'
import { Link } from 'react-router-dom'
import './index.less'
import nft from '@/assets/img/nft.png'

const DemoPage: React.FC = () => {
  const [getResult, setGetResult] = useState('')

  useEffect(() => {
    console.log('init DemoPage')
  }, [])

  const testGetRequest = async () => {
    const res = await common.getUser()
    setGetResult(JSON.stringify(res))
  }

  return (
    <div className="Demo">
      <div className="title">DemoPage</div>
      <Test />
      <button onClick={testGetRequest}>Test get requestTest</button>
      <div className="block">测试 UI 适配</div>
      <p>{getResult}</p>
      <Link to="/mine">测试跳转：To MinePage</Link>
      <img src={nft} />
    </div>
  )
}

export default DemoPage
