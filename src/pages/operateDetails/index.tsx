import React, { useEffect, useState } from 'react'
import './index.less'
import triangle from '@/assets/img/successMove/triangle.png'
import { AccountInfoApi } from '@/service/AccountInfo'
import { DatetimePicker, List, Loading, NavBar, Popup, PullRefresh } from 'react-vant'
import arr from '@/assets/img/capital/time_arr.png'
import dayjs from 'dayjs'
/**
 * 资金明细
 */

// class DetailListY{
//   amount:string | undefined;
//   billDate: string | undefined;
//   title:string | undefined;
//   typeName: string | undefined;
// }

const OperateDetailsPage: React.FC = () => {
  const [detailListY, setDetailListY] = useState<any[]>([])
  const [finished, setFinished] = useState(false)
  //是否在请求状态
  const [isloading, setIsloading] = useState<boolean>(true)
  //当前请求页码
  const [current, setCurrent] = useState(1)
  //是否在请求状态
  const [isShowTime, setShowTime] = useState(false)
  const [showTimeText, setShowTimeText] = useState('')
  const [time, setTime] = useState(new Date())

  const size = 20

  useEffect(() => {
    setShowTimeText(getNowTime(Date.now()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getAccountList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, time])
  const getAccountList = (index = 0) => {
    setIsloading(true)
    AccountInfoApi.accountList({
      current: index || current,
      size: size,
      walletType: 2,
      billDate: getTimeApi(time),
    }).then((res: any) => {
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
      setIsloading(false)
    })
  }

  const getNowTime = (val) => {
    return dayjs(val).format('YYYY年MM月')
  }
  const getTimeApi = (val) => {
    return dayjs(val).format('YYYY-MM')
  }
  const getTime = (val) => {
    setShowTime(false)
    setShowTimeText(getNowTime(val))
    setFinished(false)
    setDetailListY([])
    setTime(val)
    setCurrent(1)
  }
  const setShow = () => {
    setShowTime(true)
  }
  const closePop = () => {
    setShowTime(false)
  }
  const onLoadRefresh = async () => {
    console.log('more')
    setCurrent((v) => v + 1)
  }

  const onRefresh = async () => {
    setFinished(false)
    setCurrent(1)
    if (current == 1) {
      getAccountList(1)
    }
  }
  return (
    <div className="OperateDetailsPage__root">
      {/* <MyNavBar
        title="账户资金明细"
        safeAreaInsetTop={true}
        leftArrow
        onClickLeft={() => history.back()}
        // onClickRight={toFundDetails}
        rightText={'账户资金明细'}
        border={false}
      /> */}
      <div className="content">
        <div className="search_time" onClick={setShow}>
          {showTimeText}
          <img src={arr}></img>
        </div>
        <div className="bank"></div>
        <div className="tab-list">
          <PullRefresh onRefresh={onRefresh}>
            <List
              finished={finished}
              onLoad={onLoadRefresh}
              immediateCheck={false}
              loading={isloading}
              autoCheck={false}
            >
              {detailListY.length
                ? detailListY.map((item, index) => {
                    return (
                      <div className="item" key={index}>
                        <div className="left">
                          <div className="type_name">{item['typeName']}</div>
                          <div className="title">{item['title']}</div>
                          <div className="time">{item['billDate']}</div>
                        </div>
                        <div className="right">
                          <div className={'amount' + ' ' + (item['sts'] != 2 ? 'grey' : 'black')}>{item['amount']}</div>
                          <div className="order_no"> {!item['subOrderNo'] ? '' : `订单编号${item['subOrderNo']}`} </div>
                          <div className="state">{item['stsName']}</div>
                        </div>
                      </div>
                    )
                  })
                : null}
            </List>
          </PullRefresh>
        </div>
      </div>
      <Popup visible={isShowTime} position="bottom">
        <DatetimePicker
          type="year-month"
          minDate={new Date(2020, 0, 1)}
          maxDate={new Date()}
          value={time}
          onConfirm={getTime}
          onCancel={closePop}
          formatter={(type: string, val: string) => {
            if (type === 'year') {
              return `${val}年`
            }
            if (type === 'month') {
              return `${val}月`
            }
            return val
          }}
        />
      </Popup>
    </div>
  )
}

export default OperateDetailsPage
