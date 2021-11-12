import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

const MinePage = observer(() => {
  const store = useStore()
  return (
    <div className="Mine">
      <h1 className="title">MinePage</h1>
      <div className="mineTitle">MineTitle</div>
      <p>user name: {JSON.stringify(store)}</p>
      <Link to="/home">To HomePage</Link>
    </div>
  )
})

export default MinePage
