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
    <div className="Order-container">
        <div className="order-main">

        </div>
        <div className="order-action">
            <div className="order-action-item"></div>
        </div>
    </div>
  )
})

export default HomePage
