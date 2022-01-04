import React, { useEffect, useState } from 'react'
import './index.less'
import triangle from '@/assets/img/successMove/triangle.png'
import { AccountInfoApi } from '@/service/AccountInfo'
import { List, Loading, NavBar, PullRefresh } from 'react-vant'
import { Console } from 'console'
import MyNavBar from '@/components/myNavBar'
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
  const [detailListY, setDetailListY] = useState<any[]>([])
  const [finished, setFinished] = useState(false)
  //是否在请求状态
  const [isloading, setIsloading] = useState<boolean>(true)
  //当前请求页码
  const [current, setCurrent] = useState(1)
  //是否在请求状态

  const size = 10
  useEffect(() => {
    getAccountList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])
  const getAccountList = () => {
    setIsloading(true)
    AccountInfoApi.accountList({
      current: current,
      size: size,
      walletType: 1,
    })
      .then((res: any) => {
        let dataList = []
        dataList = res['records'].map((item) => {
          const timeArr = item['billDate'].split('-')
          const listTitle = timeArr[0] + '年' + timeArr[1] + '月'
          item['listTitle'] = listTitle
          return item
        })
        if (current == 1) {
          setDetailListY(dataList)
        } else {
          setDetailListY((v) => [...v, ...dataList])
        }
        if (res['records'].length < size) {
          setFinished(true)
        }
      })
      .catch(() => {
        setFinished(true)
      })
      .finally(() => {
        setIsloading(false)
      })
  }

  const onLoadRefresh = async () => {
    if (finished) return
    if (isloading) return
    setCurrent((v) => v + 1)
  }

  const onRefresh = async () => {
    setFinished(false)
    setCurrent(1)
  }
  return (
    <div className="FundDetailsPage__root">
      <MyNavBar
        title="账户资金明细"
        safeAreaInsetTop={true}
        leftArrow
        onClickLeft={() => history.back()}
        // onClickRight={toFundDetails}
        rightText={'账户资金明细'}
        border={false}
      />
      {/* <div className="tab">
        <div className={`${tabActiveIndex === 1 ? 'active' : ''}`} onClick={() => setTabActiveIndex(1)}>
          可用资金
        </div>
        <div className={`${tabActiveIndex === 2 ? 'active' : ''}`} onClick={() => setTabActiveIndex(2)}>
          冻结资金
        </div>
      </div> */}
      <div className="tab-list">
        <PullRefresh onRefresh={onRefresh}>
          <List finished={finished} onLoad={onLoadRefresh} immediateCheck={false} loading={isloading}>
            {detailListY.length
              ? detailListY.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      {index == 0 || detailListY[index]['listTitle'] != detailListY[index - 1]['listTitle'] ? (
                        <div className="month">
                          {item['listTitle']} <img className="img" src={triangle} alt="" />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div className="title">
                        <div>{item['typeName']}</div>
                        <div>{(item['amount'] / 100).toFixed(2)}</div>
                      </div>
                      <div className="counter">
                        <div>{item['title']}</div>
                        <div>订单编号{item['orderNo']}</div>
                      </div>
                      <div className="time">{item['billDate']}</div>
                    </div>
                  )
                })
              : null}
          </List>
        </PullRefresh>
      </div>
      {/* <div className={'tab-list tab-view' + `${tabActiveIndex === 2 ? 'active' : ''}`}>
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
            ) : isloading1 ? (
              <Loading className="maorder-loading" vertical color="#3AD2C5">
                加载中...
              </Loading>
            ) : null}
          </List>
        </PullRefresh>
      </div> */}
    </div>
  )
}

export default FundDetailsPage
