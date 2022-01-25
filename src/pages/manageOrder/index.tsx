import React, { useState, useEffect, FC } from 'react'
import { ConfigProvider, Tabs, Empty, List, Toast, Loading, PullRefresh } from 'react-vant'
import ManageItem from '@/components/manageOrder/orderIMantem'
import { useLocation } from 'react-router-dom'
import emptyIcon from '@/assets/img/empty_b@3x.png'
import { ManageOrder } from '@/service/ManageOrderApi'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import qs from 'query-string'
import './index.less'
/**
 * 订单管理入口页面
 * 全部 待付款 待确认 已完成 退款_售后
 */
const themeVars = {
  '--rv-tabs-bottom-bar-color': '#7193f4',
  '--rv-tab-font-size': '3.7vw',
}
//分页大小
const PAGE_SIZE = 10

const TabsListObj = [
  { tabName: '全部', state: '', id: 0, isTag: false, type: 1 },
  { tabName: '待付款', state: 1, id: 1, isTag: true, type: 1 },
  { tabName: '待核销', state: 3, id: 2, isTag: false, type: 1 },
  { tabName: '已完成', state: 4, id: 3, isTag: false, type: 1 },
  { tabName: '退款/售后', state: 5, id: 4, isTag: false, type: 0 },
]

let current = 1
const ManageOrderPage: FC = () => {
  const { search } = useLocation()
  //获取url是否携带
  const { action_type } = qs.parse(search.slice(1))

  //请求是否完成
  const [finished, setFinished] = useState<boolean>(false)
  //是否在请求状态
  const [isloading, setIsloading] = useState<boolean>(true)

  //列表数据
  const [listData, setListData] = useState<any[]>([])
  //高亮tab
  const [activeState, setActive] = useState<any>(action_type ? Number(action_type) : '')

  //待付款数量
  const [paymentNum, setpaymentNum] = useState(0)
  const getOrderListData = async () => {
    return new Promise<any>((resolve, reject) => {
      ManageOrder.list({
        state: activeState == 5 ? '' : activeState,
        size: PAGE_SIZE,
        current: current,
        type: activeState == 5 ? 2 : 1,
      })
        .then((res: any) => {
          const { code, msg } = res
          if (code == '200') {
            current++
            resolve(res)
          } else {
            Toast(msg)
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
    onLoadManageOrderList(1)
    getOrderStateCount()
  }, [activeState])

  const onLoadManageOrderList = async (isRefresh?) => {
    const {
      data: { total, records },
    }: any = await getOrderListData()

    setListData((v) => {
      const newList = isRefresh ? records : [...v, ...records]
      if (PAGE_SIZE > records.length) {
        setFinished(true)
      }
      return newList
    })
  }

  const getOrderStateCount = () => {
    ManageOrder.biz().then((res) => {
      console.log('res :>> ', res)
      const { code, data } = res
      if (code === '200' && data) {
        const istate = data.find((item) => {
          return item.state == 1
        })
        console.log('istate :>> ', istate)
        setpaymentNum(istate.count ?? 0)
      }
    })
  }

  const onLoadRefresh = async () => {
    console.log('obje下拉刷新ct :>> ')
    setIsloading(true)
    setFinished(false)
    setListData([])
    // setCurrent(1);
    current = 1
    await onLoadManageOrderList(1)
  }

  useEffect(() => {
    setIsloading(true)
    setFinished(false)

    setListData([])
  }, [activeState])

  useEffect(() => {
    SHBridge.setTitleAction(
      [
        {
          value:
            'https://shanhai-shoping.oss-cn-beijing.aliyuncs.com/img/user/pic/a3046d485c8c4898b14cd7587dcfafde.png',
          type: 'img',
        },
      ],
      (index) => {
        SHBridge.jump({
          url: generateUrl(`/order-search`),
          newWebView: true,
          title: '订单搜索',
        })
      }
    )
  }, [])
  const tabHandelClick = (info) => {
    const { name } = info
    if (isloading) {
      Toast('数据加载中，请稍后')
      return
    }
    current = 1
    setActive(name)
  }
  //type 1跳转订单详情 2跳转退款性情
  const manageOrderDetail = (item, type) => {
    console.log('item :>> ', item)
    if (type === 1) {
      SHBridge.jump({
        url: generateUrl(`/management-details${search}&id=${item.id}`),
        newWebView: true,
        title: '订单管理',
      })
    } else {
      SHBridge.jump({
        url: generateUrl(`/reimburse-detail?id=${item.id}`),
        newWebView: true,
        title: '退款详情',
      })
    }
    // history.push(`/management-details${search}&id=${item.id}`)
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
                name={item.state}
                renderTitle={() => {
                  return !item.isTag ? (
                    item.tabName
                  ) : (
                    <>
                      {item.tabName}
                      {paymentNum > 0 ? <span className="maorder-tag">{`(${paymentNum})`}</span> : null}
                    </>
                    // <>{item.tabName}</>
                  )
                }}
              />
            ))}
          </Tabs>
        </ConfigProvider>
      </div>
      <div className="maorder-content">
        <PullRefresh className="refresh-box" onRefresh={onLoadRefresh}>
          {listData.length ? (
            <List
              finished={finished}
              errorText="请求失败，点击重新加载"
              onLoad={onLoadManageOrderList}
              immediateCheck={false}
            >
              {listData.map((item, index) => {
                return (
                  <div className="morderitem" key={item.id + index}>
                    <ManageItem {...item} changeViewDetails={manageOrderDetail} />
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
        </PullRefresh>
      </div>
    </div>
  )
}

export default ManageOrderPage
