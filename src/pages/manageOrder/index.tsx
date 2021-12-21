import React, { useState, useEffect, FC } from 'react'
import { ConfigProvider, Tabs, Empty, List, Toast, Loading } from 'react-vant'
import ManageItem from '@/components/manageOrder/orderIMantem'
import { useHistory, useLocation } from 'react-router-dom'
import { ManageOrder } from '@/service/ManageOrder'

import './index.less'
/**
 * 订单管理入口页面
 * 全部 待付款 待确认 已完成 退款_售后
 */
const themeVars = {
  '--rv-tabs-bottom-bar-color': '#3BD1C4',
  '--rv-tab-font-size': '3.7vw',
}
interface ListItem {
  travelerType: number
  travelerName: string
  travelerPhoneNumber: string
  travelerCertificateNo: string
  emerName: string
  emerPhoneNumber: string
}

const TabsListObj = [
  { tabName: '全部', type: '', id: 0, isTag: false },
  { tabName: '待付款', type: 1, id: 1, isTag: true },
  { tabName: '待确认', type: 3, id: 2, isTag: false },
  { tabName: '已完成', type: 4, id: 3, isTag: false },
  { tabName: '退款/售后', type: '5,6,7', id: 4, isTag: false },
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
  {
    id: '61ada7754e147767542fb6fd',
    orderNo: '1235 8793 1234 9090',
    orderTime: '2021-12-21 12:30:45',
    goodsName: '21天习惯养成游戏最终章：第21天\n     《任天堂2ds透黑开箱&amp;掌机对比》',
    adultNum: 2,
    childNum: 2,
    payAmount: 1998,
    orderUserId: '41590c7e',
    orderUserName: '塞尔达传说',
    state: 4,
  },
  {
    id: '61ae278d4e14774b727fad52',
    orderNo: '1235 8793 1234 9090',
    orderTime: '2021-12-21 12:30:45',
    goodsName: '弹琵琶的女生\n当时我远远的就听到一股悦耳动听的旋律从湖中亭传来。我循声而去，',
    adultNum: 2,
    childNum: 2,
    payAmount: 1998,
    orderUserId: '41590c7e',
    orderUserName: '小小快门工',
    state: 5,
  },
  {
    id: '61ad750c4e14775e2e501738',
    orderNo: '1235 8793 1234 9090',
    orderTime: '2021-12-21 12:30:45',
    goodsName: '2011 年诺基亚推出的 C7 手机，800 万像素，最大光圈 F2.8。',
    adultNum: 2,
    childNum: 2,
    payAmount: 1998,
    orderUserId: '41590c7e',
    orderUserName: '小丸犊治',
    state: 6,
  },
  {
    id: '61ad750c475e2ee147501738',
    orderNo: '1235 8793 1234 9090',
    orderTime: '2021-12-21 12:30:45',
    goodsName: '2011 年诺基亚推出的 C7 手机，800 万像素，最大光圈 F2.8。',
    adultNum: 2,
    childNum: 2,
    payAmount: 1998,
    orderUserId: '490c157e',
    orderUserName: '小丸失败',
    state: 7,
  },
]

const ManageOrderPage: FC = (props: any) => {
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
  const [activeVal, setActive] = useState<any>('')

  const getOrderListData = async () => {
    // return new Promise<any>((resolve, reject) => {
    //   setTimeout(() => {
    //     if (current>=3) {
    //       console.log('object111111111 :>> ',current);
    //       reject(new Error('error'));
    //     }else{
    //       resolve({
    //         code:"200",
    //         msg:"系统异常",
    //         data:{
    //           total:100,
    //           current: current,
    //           records:[...ListData]
    //         }
    //       });
    //       setCurrent((v) => v + 1)
    //     }

    //   }, 1200);
    // }).finally(()=>{
    //   console.log('object :>>请求处理完了 ');
    //   setIsloading(false)
    // });

    return new Promise<any>((resolve, reject) => {
      ManageOrder.list({
        state: activeVal,
        size: 10,
        current: current,
      })
        .then((res: any) => {
          console.log('object接口请求数据 :>> ', res)
          let { code, data } = res
          if (code == '200') {
            setCurrent((v) => v + 1)
            resolve(res)
          } else {
            reject(new Error('error'))
          }
        })
        .catch((err) => {
          console.log('object :>>请求错误')
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
      onLoad()
    }
  }, [current, activeVal])

  const onLoad = async () => {
    // 异步更新数据
    const {
      code,
      data: { total, records },
    }: any = await getOrderListData()

    setListData((v) => [...v, ...records])
    if (listData.length >= total) {
      setFinished(true)
    } else {
      setFinished(false)
    }
  }

  useEffect(() => {
    console.log('object :>>1111 ', activeVal)
    setIsloading(true)
    setCurrent(1)
    setListData([])
  }, [activeVal])

  const tabHandelClick = (info) => {
    const { name } = info
    setActive(name)
  }

  const manageOrderDetail = (item) => {
    props.history.push(`/management-details${search}&id=${item.id}`)
  }
  return (
    <div className="Maorder-container">
      <div className="maorder-nav">
        <ConfigProvider themeVars={themeVars}>
          <Tabs
            active={activeVal}
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
                      <span className="maorder-tag">{`(2)`}</span>
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
          <List finished={finished} errorText="请求失败，点击重新加载" onLoad={onLoad} immediateCheck={false}>
            {listData.map((item, index) => {
              return (
                <div
                  className="morderitem"
                  key={item.id + index}
                  onClick={() => {
                    manageOrderDetail(item)
                  }}
                >
                  <ManageItem {...item} />
                </div>
              )
            })}
          </List>
        ) : isloading ? (
          <Loading className="maorder-loading" vertical color="#3AD2C5">
            加载中...
          </Loading>
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
    </div>
  )
}

export default ManageOrderPage
