import React, { useState, useEffect, FC } from 'react'
import ManageItem from '@/components/manageOrder/orderIMantem'
import { ManageOrder } from '@/service/ManageOrder'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import { Empty, Toast, List, Field, ConfigProvider } from 'react-vant'
import emptyIcon from '@/assets/img/empty@3x.png'
import './search.less'

/**
 * 工作台订单搜索入口页
 */
const themeVars = {
  '--rv-cell-vertical-padding': '2px',
  '--rv-cell-font-size': '3.2vw',
}

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
  },
  {
    id: '61ada8464e14774472198507',
    orderNo: '1235 8793 1234 9090',
    orderTime: '2021-12-21 12:30:45',
    goodsName: '富士与古风\n上个周末，带着朋友拍了一组古风，第二次尝试古风的拍摄，害我很多需要改进的地方，这次拍...',
    adultNum: 2,
    childNum: 2,
    payAmount: 1998,
    orderUserId: '41590c7e',
    orderUserName: '毛彬彬',
    state: 2,
  },
  {
    id: '61ada5684e1477454e3498d3',
    orderNo: '1235 8793 1234 9090',
    orderTime: '2021-12-21 12:30:45',
    goodsName: '趁着换了iPhone 13 Pro Max的机会，试了试不少壳，从8块包邮到300块的都有，快速...',
    adultNum: 2,
    childNum: 2,
    payAmount: 1998,
    orderUserId: '41590c7e',
    orderUserName: '罗莱尔特',
    state: 3,
  },
]
const OrderSearchPage: FC = () => {
  const history = useHistory()
  const { search } = useLocation()
  const [keyWords, setKeyWords] = useState('')
  //请求是否完成
  const [finished, setFinished] = useState<boolean>(false)
  //是否在请求状态
  const [isloading, setIsloading] = useState<boolean>(true)
  //当前请求页码
  const [current, setCurrent] = useState(1)
  const [listData, setListData] = useState<any[]>([])

  const searchOrderListData = async (keyWords) => {
    return new Promise<any>((resolve, reject) => {
      ManageOrder.search({
        keyWords,
        current,
        size: 20,
      })
        .then((res: any) => {
          let { code } = res
          if (code == '200') {
            setCurrent((v) => v + 1)
            setTimeout(() => {
              resolve(res)
            }, 3000)
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
        })
    })
  }

  const onLoadManageOrderSearch = async () => {
    const {
      data: { total, records },
    }: any = await searchOrderListData(keyWords)
    setIsloading(false)
    setListData((v) => [...v, ...records])
    if (listData.length >= total) {
      setFinished(true)
    }
  }

  const searchOrderHandeldata = () => {
    if (keyWords) {
      onLoadManageOrderSearch()
    }
    console.log('searchOrderHandeldata :>> ', 'searchOrderHandeldata')
  }

  const manageOrderDetail = (item) => {
    history.push(`/management-details${search}&id=${item.id}`)
  }
  return (
    <ConfigProvider themeVars={themeVars}>
      <div className="orderSearch-container">
        <div className="orderSearch-navbar">
          <div className="orderSearch-navbar-content">
            <div className="orderSearch-navbar-left"></div>
            <div className="orderSearch-navbar-center">
              <Field value={keyWords} placeholder="请输入商品名称或订单编号" onChange={setKeyWords} />
            </div>
            <div className="orderSearch-navbar-right" onClick={searchOrderHandeldata}>
              <div className="onr-btn">搜索</div>
            </div>
          </div>
        </div>

        <div className="search-content">
          {keyWords ? (
            <List
              finished={finished}
              errorText="请求失败，点击重新加载"
              onLoad={onLoadManageOrderSearch}
              immediateCheck={false}
            >
              {listData.length ? (
                listData.map((item, index) => {
                  return (
                    <div
                      className="search-item"
                      key={item.id + index}
                      onClick={() => {
                        manageOrderDetail(item)
                      }}
                    >
                      <ManageItem orderItem={item} />
                    </div>
                  )
                })
              ) : isloading ? null : (
                <Empty className="custom-image" image={emptyIcon} description="暂无数据" />
              )}
            </List>
          ) : null}
        </div>
      </div>
    </ConfigProvider>
  )
}

export default OrderSearchPage
