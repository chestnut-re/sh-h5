import React, { useEffect, useState } from 'react'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import triangle from '@/assets/img/successMove/triangle.png'
import { AccountInfoApi } from '@/service/AccountInfo'
import { List, Loading, PullRefresh } from 'react-vant'
import { ListInstance } from 'react-vant/es/list/PropsType'
import { Console } from 'console'
/**
 * 资金明细
 */

// class DetailListY{
//   amount:string | undefined;
//   billDate: string | undefined;
//   title:string | undefined;
//   typeName: string | undefined;
// }

const FundDetailsPage: React.FC = () => {
  const [tabActiveIndex, setTabActiveIndex] = useState(1)
  const [billDate, setBillDate] = useState()
  const [billType, setBillType] = useState(1)
  const [detailListY, setDetailListY] = useState<any[]>([])
  const [detailListN, setDetailListN] = useState<any[]>([])
  const [finished, setFinished] = useState(false)
  //是否在请求状态
  const [isloading, setIsloading] = useState<boolean>(true)
  //当前请求页码
  const [current, setCurrent] = useState(1)

  const [finished1, setFinished1] = useState(false)
  //是否在请求状态
  const [isloading1, setIsloading1] = useState<boolean>(true)
  //当前请求页码
  const [current1, setCurrent1] = useState(1)

  const size = 10
  useEffect(() => {
    getAccountList()
    getAccountNoList()
  }, [billType])
  const getAccountList = () => {
    setIsloading(true)
    AccountInfoApi.accountList({
      current: current,
      size: size,
      billDate: billDate,
      billType: 1,
      walletType: 1,
    })
      .then((res: any) => {
        let dataList = []
        dataList = res['records'].map((item, index) => {
          const timeArr = item['billDate'].split('-')
          const listTitle = timeArr[0] + '年' + timeArr[1] + '月'
          item['listTitle'] = listTitle
          return item
        })
        setDetailListY((v) => [...v, ...dataList])
        if (res['records'].length < size) {
          setFinished(true)
        }
      })
      .finally(() => {
        setIsloading(false)
      })
  }
  ///冻结的
  const getAccountNoList = () => {
    setIsloading1(true)
    AccountInfoApi.accountList({
      current: current1,
      size: size,
      billDate: billDate,
      billType: 2,
      walletType: 1,
    })
      .then((res: any) => {
        let dataList = []
        dataList = res['records'].map((item, index) => {
          const timeArr = item['billDate'].split('-')
          const listTitle = timeArr[0] + '年' + timeArr[1] + '月'
          item['listTitle'] = listTitle
          return item
        })
        setDetailListN((v) => [...v, ...dataList])
        if (res['records'].length < size) {
          setFinished1(true)
        }
      })
      .finally(() => {
        setIsloading1(false)
      })
  }
  const onLoadRefresh = async () => {
    if (tabActiveIndex === 1) {
      if (finished) return
      setCurrent((v) => v + 1)
      getAccountList()
    } else {
      if (finished1) return
      setCurrent1((v) => v + 1)
      getAccountNoList()
    }
  }

  const onRefresh = async () => {
    if (tabActiveIndex === 1) {
      setFinished(false)
      setCurrent(1)
      setDetailListY([])
      getAccountList()
    } else {
      setFinished1(false)
      setCurrent1(1)
      setDetailListN([])
      getAccountNoList()
    }
  }
  return (
    <div className="FundDetailsPage__root">
      <div className="tab">
        <div className={`${tabActiveIndex === 1 ? 'active' : ''}`} onClick={() => setTabActiveIndex(1)}>
          可用资金
        </div>
        <div className={`${tabActiveIndex === 2 ? 'active' : ''}`} onClick={() => setTabActiveIndex(2)}>
          冻结资金
        </div>
      </div>
      <div className={'tab-list tab-view' + `${tabActiveIndex === 1 ? 'active' : ''}`}>
        <PullRefresh onRefresh={onRefresh}>
          <List finished={finished} onLoad={onLoadRefresh} immediateCheck={false} loading={isloading}>
            {detailListY.length ? (
              detailListY.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    {index == 0 || detailListY[index]['listTitle'] != detailListY[index - 1]['listTitle'] ? (
                      <div className="month">
                        {item['listTitle']} <img className="img" src={triangle} alt="" />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="counter">
                      <div>{item['billDate']}</div>
                      <div>{item['amount']}</div>
                    </div>
                    <div className="text">{item['typeName']}</div>
                  </div>
                )
              })
            ) : isloading ? (
              <Loading className="maorder-loading" vertical color="#3AD2C5">
                加载中...
              </Loading>
            ) : null}
          </List>
        </PullRefresh>
      </div>
      <div className={'tab-list tab-view' + `${tabActiveIndex === 2 ? 'active' : ''}`}>
        <PullRefresh onRefresh={onRefresh}>
          <List finished={finished1} onLoad={onLoadRefresh} immediateCheck={false} loading={isloading1}>
            {detailListN.length ? (
              detailListN.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    {index == 0 || detailListN[index]['listTitle'] != detailListN[index - 1]['listTitle'] ? (
                      <div className="month">
                        {item['listTitle']} <img className="img" src={triangle} alt="" />
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="counter">
                      <div>{item['billDate']}</div>
                      <div>{item['amount']}</div>
                    </div>
                    <div className="text">{item['typeName']}</div>
                  </div>
                )
              })
            ) : isloading ? (
              <Loading className="maorder-loading" vertical color="#3AD2C5">
                加载中...
              </Loading>
            ) : null}
          </List>
        </PullRefresh>
      </div>
    </div>
  )
}

export default FundDetailsPage
