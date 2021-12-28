import React, { useState, useEffect, FC } from 'react'
import qs from 'query-string'
import ManageItem from '@/components/manageOrder/orderIMantem'
import { ManageOrder } from '@/service/ManageOrderApi'
import { useLocation } from 'react-router-dom'
import { Empty, Toast, List, Field, Loading, NavBar, ConfigProvider } from 'react-vant'
import emptyIcon from '@/assets/img/empty@3x.png'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './search.less'

/**
 * 工作台订单搜索入口页
 */
const themeVars = {
  '--rv-cell-vertical-padding': '2px',
  '--rv-cell-font-size': '3.2vw',
  '--rv-nav-bar-icon-color': '#242424',
  '--rv-nav-bar-background-color':"#fff"
}
//分页大小
const PAGE_SIZE = 10
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
const OrderSearchPage: FC = () => {
  const { search } = useLocation()
  const { t } = qs.parse(search.slice(1))

  //输入内容
  const [keyWords, setKeyWords] = useState<string>('')
  //请求是否完成
  const [finished, setFinished] = useState<boolean>(false)
  //是否在请求状态
  const [isloading, setIsloading] = useState<boolean>(false)
  //当前请求页码
  const [current, setCurrent] = useState(1)
  //列表数据
  const [listData, setListData] = useState<any[]>([])
  //是否是首次搜索
  const [issearch, setIssearch] = useState<boolean>(false)
  const searchOrderListData = async (keyWords) => {
    return new Promise<any>((resolve, reject) => {
      // resolve({
      //   data:{
      //     total:100,
      //      records:ListData
      //   }
      // })
      ManageOrder.search({
        keyWords,
        current,
        size: PAGE_SIZE,
      })
        .then((res: any) => {
          const { code } = res
          if (code == '200') {
            setCurrent((v) => v + 1)
            resolve(res)
          } else {
            Toast('服务器异常')
            reject(new Error('error'))
          }
        })
        .catch((err) => {
          Toast(err.msg)
          reject(new Error('error'))
        })
        .finally(() => {
          setIsloading(false)
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
    if (keyWords.trim()) {
      setIssearch(true)
      setListData([])
      setCurrent(1)
      setIsloading(true)
      onLoadManageOrderSearch()
    } else {
      Toast('请输入商品名称或订单编号')
      setIssearch(false)
    }
  }

  const manageOrderDetail = (item) => {
    SHBridge.jump({
      url: generateUrl(`/management-details?t=${t}&id=${item.id}`),
      newWebView: true,
      title: '订单管理',
    })
    // history.push(`/management-details${search}&id=${item.id}`)
  }
  const closeSearchPage = () => {
    console.log('object :>> 关闭')
    SHBridge.closePage()
  }

  return (
    <ConfigProvider themeVars={themeVars}>
      <div className="orderSearch-container">
        <NavBar
          zIndex={999}
          fixed={true}
          leftArrow={false}
          safeAreaInsetTop={true}
          title={
            <div className="orderSearch-navbar-center rv-hairline--surround van-hairline-round">
              <Field
                value={keyWords}
                autofocus={true}
                border={false}
                placeholder="请输入商品名称或订单编号"
                onChange={setKeyWords}
              />
            </div>
          }
          rightText={
            <div className="orderSearch-navbar-right" onClick={searchOrderHandeldata}>
              <div className="onr-btn">搜索</div>
            </div>
          }
          onClickLeft={closeSearchPage}
          onClickRight={() => searchOrderHandeldata}
        />

        {/* <div className="orderSearch-navbar rv-hairline--bottom">
          <div className="orderSearch-navbar-content">
            <div className="orderSearch-navbar-left" onClick={closeSearchPage}></div>
            <div className="orderSearch-navbar-center rv-hairline--surround van-hairline-round">
              <Field
                value={keyWords}
                autofocus={true}
                border={false}
                placeholder="请输入商品名称或订单编号"
                onChange={setKeyWords}
              />
            </div>
            <div className="orderSearch-navbar-right" onClick={searchOrderHandeldata}>
              <div className="onr-btn">搜索</div>
            </div>
          </div>
        </div> */}

        <div className="search-content">
          {listData.length ? (
            <List
              finished={finished}
              errorText="请求失败，点击重新加载"
              onLoad={onLoadManageOrderSearch}
              immediateCheck={false}
            >
              {listData.map((item, index) => {
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
              })}
            </List>
          ) : isloading ? (
            <Loading className="maorder-loading" vertical color="#3AD2C5">
              加载中...
            </Loading>
          ) : null}

          {issearch && listData.length == 0 ? (
            <Empty className="custom-image" image={emptyIcon} description="暂无数据" />
          ) : null}
        </div>
      </div>
    </ConfigProvider>
  )
}

export default OrderSearchPage
