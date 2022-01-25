import React, { useState, useEffect, FC } from 'react'
import GoodsPreview from '@/components/goodsPreview'
import { SmallShop } from '@/service/GroupSmallShop'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import clsx from 'clsx'
import { Image, Empty, Toast, List } from 'react-vant'
import emptyIcon from '@/assets/img/empty@3x.png'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { getCookie } from '@/utils/cookie'
import './index.less'
import { isMini, isWeChat } from '@/jsbridge/env'

/**
 * 团小店首页
 */
const PAGE_SIZE = 10

const GroupShopPage: FC = () => {
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))
  const isToken = SHBridge.getToken()
  const [shopInfo, setShopInfo] = useState({
    isDeleted: 0,
    attentionState: 0,
    shopName: '',
    shopDesc: '',
    shopHeadUrl: '',
  })

  //请求是否完成
  const [finished, setFinished] = useState<boolean>(false)
  //当前请求页码
  const [current, setCurrent] = useState(1)
  //商品列表
  const [goodsList, setGoodsList] = useState<any[]>([])

  const [isMiniApp, setIsMiniApp] = useState(false) // miniapp
  const [isWechat, setIsWeChat] = useState(false) // 微信webview

  useEffect(() => {
    isMini().then((res) => {
      if (res) {
        setIsMiniApp(true)
      }
    })
    isWeChat().then((res) => {
      if (res) {
        setIsWeChat(true)
      }
    })
  }, [])

  const getSmallShopInfo = () => {
    SmallShop.detail({
      id,
      token: SHBridge.getToken(),
    })
      .then((res) => {
        const { code, data } = res
        if (code === '200' && data) {
          setShopInfo(data)
        }
        console.log('res :>> ', res)
      })
      .catch((error) => {
        console.log('error :>> ', error)
      })
  }

  const attentionSmaiiShop = () => {
    if (SHBridge.isLogin()) {
      SmallShop.attention({
        attentionState: shopInfo.attentionState ? 0 : 1,
        shopId: id,
      })
        .then((res) => {
          const { code, data } = res
          if (code == '200' && data) {
            Toast('操作成功')
            getSmallShopInfo()
          }
          console.log('object 关注:>> ', res)
        })
        .catch((err) => {
          console.log('err :>> ', err)
        })
    } else {
      SHBridge.login()
      // Toast('还未登录，请登录后分享')
    }
  }

  const getGoodsList = async () => {
    return new Promise<any>((resolve, reject) => {
      SmallShop.list({
        id,
        size: PAGE_SIZE,
        current: current,
      })
        .then((res) => {
          const { code, data } = res
          if (code === '200' && data) {
            setCurrent((v) => v + 1)
            console.log('object :>> ', code, res)
            resolve(res)
          } else {
            Toast('服务器异常,稍后再试')
            reject(new Error('error'))
          }
          console.log('res商品列表 :>> ', res)
        })
        .catch((error) => {
          console.log('error :>> ', error)
          reject(new Error('error'))
        })
        .finally(() => {
          console.log('object :>>请求处理完成')
        })
    })
  }
  const onLoadGoodsList = async () => {
    const {
      data: { records },
    }: any = await getGoodsList()
    setGoodsList((v) => [...v, ...records])
    if (PAGE_SIZE > records.length) {
      setFinished(true)
    }
  }

  //打开小店商品详情
  const openDoodsDetailLink = (item) => {
    const { goodsPriceId } = item
    console.log('item :>> ', item)
    SHBridge.jump({
      url: generateUrl(
        `/goods-detail?id=${item.id}&goodsPriceId=${goodsPriceId}&shopId=${id}&userId=${shopInfo.userId}`
      ),
      newWebView: true,
      title: '商品详情',
    })
  }
  //分享团小店
  const shareGroupShop = () => {
    if (SHBridge.isLogin()) {
      const litterUrl = `${window.location.origin}${window.location.pathname}?id=${id}&userId=${getCookie('userId')}`
      console.log('litterUrl :>> ', litterUrl)
      const { shopName, shopDesc, shopHeadUrl } = shopInfo
      SHBridge.shareDetail({
        type: 'shop',
        title: shopName,
        description: shopDesc,
        headUrl: shopHeadUrl,
        littleUrl: litterUrl,
      })
    } else {
      SHBridge.login()
      // Toast('还未登录，请登录后分享')
    }
  }

  useEffect(() => {
    getSmallShopInfo()
  }, [])

  return (
    <div className="Smallshop-container">
      {shopInfo?.isDeleted == 0 ? (
        <>
          <div className="smallshop-personal">
            <div className="smallshop-avatar">
              <Image width="100%" height="100%" fit="cover" src={shopInfo.shopHeadUrl} />
            </div>
            <div className="smallshop-content">
              <div className="smallshop-name">{shopInfo.shopName}</div>
              <div className="smallshop-title">如有疑问 可联系我</div>
              <div className="smallshop-action">
                {!isMiniApp && !isWechat && (
                  <div
                    onClick={attentionSmaiiShop}
                    className={clsx('smallshop-abtn', { 'smallshop-abtn-on': shopInfo.attentionState != 0 })}
                  >
                    {shopInfo.attentionState == 0 ? '关注' : '已关注'}
                  </div>
                )}

                {!isMiniApp && !isWechat && (
                  <div className="smallshop-abtn" onClick={shareGroupShop}>
                    分享
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="smallshop-introduce">
            <div className="wrapper">
              <div className="text">简介：{shopInfo.shopDesc ?? '暂无简介内容'}</div>

              {/* <input id="exp1" className="exp" type="checkbox" />
              <div className="text">
                <label className="btn" htmlFor="exp1"></label>
                简介：{shopInfo.shopDesc ?? '暂无简介内容'}
              </div> */}
            </div>
          </div>
          <div className="smallshop-main">
            <List
              errorText="请求失败，点击重新加载"
              immediateCheck
              finishedText=""
              finished={finished}
              onLoad={onLoadGoodsList}
            >
              {goodsList.length > 0 ? (
                <ul className="smallshop-main-ul">
                  {goodsList.map((item, index) => {
                    return (
                      <li
                        className="smallshop-main-li"
                        key={index}
                        onClick={() => {
                          openDoodsDetailLink(item)
                        }}
                      >
                        <GoodsPreview {...item} />
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <Empty className="custom-image" image={emptyIcon} description="暂无数据" />
              )}
            </List>
          </div>
        </>
      ) : (
        <Empty image="search" description="店铺信息不存在" />
      )}
    </div>
  )
}

export default GroupShopPage
