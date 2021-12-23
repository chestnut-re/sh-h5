import React, { useState, useEffect, FC } from 'react'
import ManageItem from '@/components/manageOrder/orderIMantem'
import { ManageOrder } from '@/service/ManageOrder'
import { useLocation } from 'react-router-dom'
import { Empty, Toast, List, Field, Loading, NavBar, ConfigProvider, Icon } from 'react-vant'
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
}
//分页大小
const PAGE_SIZE = 10

const OrderSearchPage: FC = () => {
  const { search } = useLocation()
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
      ManageOrder.search({
        keyWords,
        current,
        size: PAGE_SIZE,
      })
        .then((res: any) => {
          const { code, msg } = res
          if (code == '200') {
            setCurrent((v) => v + 1)
            resolve(res)
          } else {
            Toast(msg)
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
      url: generateUrl(`/management-details${search}&id=${item.id}`),
      newWebView: true,
      title: '订单管理',
    })
    // history.push(`/management-details${search}&id=${item.id}`)
  }
  const closeSearchPage = () => {
    SHBridge.closePage()
  }

  return (
    <ConfigProvider themeVars={themeVars}>
      <div className="orderSearch-container">
        <NavBar
          zIndex={999}
          fixed={true}
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
          leftArrow
          rightText={
            <div className="orderSearch-navbar-right" onClick={searchOrderHandeldata}>
              <div className="onr-btn">搜索</div>
            </div>
          }
          onClickLeft={() => closeSearchPage}
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
