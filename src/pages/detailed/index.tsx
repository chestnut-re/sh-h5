import React, { useEffect, useState } from 'react'
import { Toast, List } from 'react-vant'
import { MyTokenService } from '@/service/MyTokenService'
import emptyIcon from '@/assets/img/token/token_empty@3x.png'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import './index.less'
/**
 * 收支明细
 * url 参数说明
 * ""全部 1：收支明细 2提现明细
 */
let currentIndex = 1
const PAGE_SIZE = 10

const listMap = {
  1: '#FD7D81',
  2: '#4DCFC5',
  3: '#FD7D81',
}

const DetailedPage: React.FC = () => {
  const { search } = useLocation()
  const { type } = qs.parse(search.slice(1))
  //列表数据
  const [details, setDetails] = useState<any[]>([])
  //加载状态
  const [finished, setFinished] = useState(false)

  const onLoadList = async () => {
    const { code, msg, data } = await MyTokenService.getWalletPage({
      size: PAGE_SIZE,
      current: currentIndex,
      billType: type && type != 'null' && type != 'undefined' ? type : '',
    })

    if (code === '200' && data) {
      const records = data['records']
      currentIndex++
      setDetails((v) => {
        const newList = [...v, ...records]
        if (PAGE_SIZE > records.length) {
          setFinished(true)
        }
        return newList
      })
    } else {
      Toast(msg)
      setFinished(true)
    }
  }

  return (
    <div className="DetailedPage__root">
      <div className="list">
        <List finished={finished} finishedText="没有了" errorText="请求失败，点击重试" onLoad={onLoadList}>
          {details.map((item, index) => {
            return (
              <div className="item rv-hairline--bottom" key={index}>
                <div className="counter">
                  <div className="text">{item.typeName}</div>
                  <div className="money">{item.amount}</div>
                </div>
                <div className="goods-name">{item.title}</div>
                <div className="under">
                  <div className="time">{item.billDate}</div>
                  {item.stsName ? (
                    <div className="title" style={{ color: listMap[item.sts] }}>
                      {item.stsName}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </List>
      </div>
    </div>
  )
}

export default DetailedPage
