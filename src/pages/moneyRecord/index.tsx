import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import pic from '@/assets/img/successMove/success.png'
import { AccountInfoApi } from '@/service/AccountInfo'
import { List, PullRefresh } from 'react-vant'
/**
 * 提现记录
 */
const MoneyRecordPage: React.FC = () => {
  const [finished, setFinished] = useState(false)
  //是否在请求状态
  const [isloading, setIsloading] = useState<boolean>(false)

  const [current, setCurrent] = useState(1)
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    // if (isloading) return
    // if (finished) return
    getList()
  }, [current])

  const getList = async (index = 0) => {
    setIsloading(true)
    try {
      const res = await AccountInfoApi.accountList({
        walletType: '3',
        current: index || current,
        size: 10,
      })
      setIsloading(false)
      if (current == 1) {
        setList(res.data['records'])
      } else {
        setList((v) => [...v, ...res.data['records']])
      }
      if (res.data['records'].length < 10) {
        setFinished(true)
      }
    } catch (e) {
      setIsloading(false)
    }
  }
  const onLoadRefresh = async () => {
    console.log('more')
    if (finished) return
    if (isloading) return
    setCurrent((v) => v + 1)
  }

  const onRefresh = async () => {
    setFinished(false)
    setCurrent(1)
    if (current == 1) {
      getList(1)
    }
  }

  return (
    <div className="MoneyRecordPage__root">
      <div className="list">
        <PullRefresh onRefresh={onRefresh}>
          {list.length > 0 ? (
            <List
              finished={finished}
              onLoad={onLoadRefresh}
              immediateCheck={false}
              loading={isloading}
              autoCheck={false}
            >
              {list.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div className="item_left">
                      <div className="item_left_1">
                        {item.typeName} {item.stsName}
                      </div>
                      <div className="item_left_2">{item.billDate}</div>
                    </div>
                    <div className="item_right">{item.amount}</div>
                  </div>
                )
              })}
            </List>
          ) : (
            <div className="empty">暂无数据</div>
          )}
        </PullRefresh>
      </div>
    </div>
  )
}

export default MoneyRecordPage
