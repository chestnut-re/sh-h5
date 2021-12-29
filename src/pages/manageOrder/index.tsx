import React, { useState, useEffect, FC } from 'react'
import { ConfigProvider, Tabs, Empty, List, Toast, Loading } from 'react-vant'
import ManageItem from '@/components/manageOrder/orderIMantem'
import { useHistory, useLocation } from 'react-router-dom'
import emptyIcon from '@/assets/img/empty@3x.png'
import { ManageOrder } from '@/service/ManageOrderApi'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'

import './index.less'
/**
 * 订单管理入口页面
 * 全部 待付款 待确认 已完成 退款_售后
 */
const themeVars = {
  '--rv-tabs-bottom-bar-color': '#3BD1C4',
  '--rv-tab-font-size': '3.7vw',
}
//分页大小
const PAGE_SIZE = 10

const TabsListObj = [
  { tabName: '全部', type: '', id: 0, isTag: false },
  { tabName: '待付款', type: 1, id: 1, isTag: true },
  { tabName: '待确认', type: 3, id: 2, isTag: false },
  { tabName: '已完成', type: 4, id: 3, isTag: false },
  { tabName: '退款/售后', type: 5, id: 4, isTag: false },
]
const ListData = [
  {
    id: '61ada88d4e147741543c7efd',
    orderNo: '1235 8793 1234 9090',
    orderTime: '2021-12-21 12:30:45',
    goodsName: '之前就对杜伽Fusion念念不忘\n复古的外观\n手感确实不错\n这次就可以将鼠标、手绘板、键盘三个都...',
    adultNum: 0,
    childNum: 2,
    payAmount: 1798,
    orderUserId: '41543c7e',
    orderUserName: '大头君有点困',
    state: 1,
  },
  {
    id: '71ada88d4e147741543c7efd',
    orderNo: '1235 8793 1234 9090',
    orderTime: '2021-12-21 12:30:45',
    goodsName: '合肥包公园  冬游变春游（二）\n两个多小时的拍摄，整理出了两组十二张照片，等下个季节下次再去里面...',
    adultNum: 2,
    childNum: 2,
    payAmount: 1998,
    orderUserId: '41590c7e',
    orderUserName: '既白',
    state: 2,
  }]

const ManageOrderPage: FC = () => {
  const { search } = useLocation()
  //请求是否完成
  const [finished, setFinished] = useState<boolean>(false)
  //是否在请求状态
  const [isloading, setIsloading] = useState<boolean>(true)
  //当前请求页码
  const [current, setCurrent] = useState(1)
  //列表数据
  const [listData, setListData] = useState<any[]>([])
  //高亮tab
  const [activeState, setActive] = useState<any>('')
  //当前请求页码
  const [paymentNum, setPaymentNum] = useState<number>(0)

  const getOrderListData = async () => {
    return new Promise<any>((resolve, reject) => {
//       resolve({
//         code:"200",
//         data:{
//           records:ListData,

//         },
//         total:100
//       })

// return
      ManageOrder.list({
        state: activeState,
        size: PAGE_SIZE,
        current: current,
      })
        .then((res: any) => {
          let { code } = res
          if (code == '200') {
            setCurrent((v) => v + 1)
            resolve(res)
          } else {
            reject(new Error('error'))
          }
        })
        .catch((err) => {
          Toast('系统异常')
          reject(new Error('error'))
        })
        .finally(() => {
          console.log('object :>>请求处理完成')
          setIsloading(false)
        })
    })
  }

  useEffect(() => {
    if (current === 1) {
      onLoadManageOrderList()
    }
  }, [current, activeState])

  const onLoadManageOrderList = async () => {
    const {
      data: { total, records },
    }: any = await getOrderListData()

    setListData((v) => [...v, ...records])

    if (activeState === 1 || activeState == '') {
      let setPayList = listData.filter((item) => {
        return item.state == 1
      })
      setPaymentNum(setPayList.length)
    }

    if (listData.length >= total) {
      setFinished(true)
    }
  }

  useEffect(() => {
    setIsloading(true)
    setFinished(false)
    setCurrent(1)
    setListData([])
  }, [activeState])

  const tabHandelClick = (info) => {
    const { name } = info
    setActive(name)
  }

  const manageOrderDetail = (item) => {
    // history.push(`/management-details${search}&id=${item.id}`)
    SHBridge.jump({
      url: generateUrl(`/management-details${search}&id=${item.id}`),
      newWebView: true,
      title: '订单管理',
    })
  }
  return (
    <div className="Maorder-container">
      <div className="maorder-nav">
        <ConfigProvider themeVars={themeVars}>
          <Tabs
            active={activeState}
            lineWidth="5.3vw"
            titleInactiveColor="#333"
            ellipsis={false}
            titleActiveColor="#333333"
            lineHeight="0.8vw"
            onClickTab={(info) => tabHandelClick(info)}
          >
            {TabsListObj.map((item) => (
              <Tabs.TabPane
                key={item.id}
                name={item.type}
                renderTitle={() => {
                  return !item.isTag ? (
                    item.tabName
                  ) : (
                    <>
                      {item.tabName}
                      {paymentNum > 0 ? <span className="maorder-tag">{`(${paymentNum})`}</span> : null}
                    </>
                  )
                }}
              />
            ))}
          </Tabs>
        </ConfigProvider>
      </div>
      <div className="maorder-content">
        {listData.length ? (
          <List
            finished={finished}
            errorText="请求失败，点击重新加载"
            onLoad={onLoadManageOrderList}
            immediateCheck={false}
          >
            {listData.map((item, index) => {
              return (
                <div
                  className="morderitem"
                  key={item.id + index}
                  onClick={() => {
                    manageOrderDetail(item)
                  }}
                >
                  <ManageItem orderItem={item} />
                </div>
              )
            })}
          </List>
        ) : isloading ? (
          <Loading className="maorder-loading" vertical color="#3AD2C5">
            加载中...
          </Loading>
        ) : (
          <Empty className="custom-image" image={emptyIcon} description="暂无数据" />
        )}
      </div>
    </div>
  )
}

export default ManageOrderPage
