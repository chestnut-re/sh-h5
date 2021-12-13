import React, { useState,useEffect, FC } from 'react'
import ManageItem from '@/components/manageOrder/orderIMantem'

import { Empty } from 'react-vant'
import './search.less'

/**
 * 工作台订单搜索入口页
 */

const ListData = [
  {
    _id: '61ada88d4e147741543c7efd',
    title: '',
    summary: '之前就对杜伽Fusion念念不忘\n复古的外观\n手感确实不错\n这次就可以将鼠标、手绘板、键盘三个都...',
    username: '大头君有点困',
    avatar_path: 'http://inews.gtimg.com/newsapp_bt/0/14270603665/641',
    type: 1,
    order: 1,
    price: 1998,
  },
  {
    _id: '61ada4ce4e147739d542a96b',
    title: '',
    summary: '合肥包公园  冬游变春游（二）\n两个多小时的拍摄，整理出了两组十二张照片，等下个季节下次再去里面...',
    username: '既白',
    cover: null,
    type: 2,
    order: 1,
    price: 1908,
  },
  {
    _id: '61ada8464e14774472198507',
    title: '',
    summary: '富士与古风\n上个周末，带着朋友拍了一组古风，第二次尝试古风的拍摄，害我很多需要改进的地方，这次拍...',
    cover: null,
    type: 2,
    username: '毛彬彬',
    order: 1,
    price: 1908,
  },
  {
    _id: '61ada5684e1477454e3498d3',
    title: '',
    summary: '趁着换了iPhone 13 Pro Max的机会，试了试不少壳，从8块包邮到300块的都有，快速...',
    cover: null,
    type: 4,
    order: 1,
    username: '罗莱尔特',
    price: 1908,
  },
  {
    _id: '61ada7754e147767542fb6fd',
    title: '',
    summary: '21天习惯养成游戏最终章：第21天\n     《任天堂2ds透黑开箱&amp;掌机对比》\n       ...',
    cover: null,
    type: 4,
    order: 1,
    username: '塞尔达传说',
    price: 1908,
  },
  {
    _id: '61ae278d4e14774b727fad52',
    title: '',
    summary: '弹琵琶的女生\n当时我远远的就听到一股悦耳动听的旋律从湖中亭传来。我循声而去，拿着相机，慢慢地走进...',
    cover: null,
    type: 4,
    order: 1,
    username: '小小快门工',
    price: 1908,
  },
  {
    _id: '61ad750c4e14775e2e501738',
    title: '【第一人称扫街】10 年前的诺基亚 C7 扫街',
    summary: '2011 年诺基亚推出的 C7 手机，800 万像素，最大光圈 F2.8。',
    cover:
      'http://s1.dgtle.com/dgtle_img/article/2021/12/05/d84542021120518043965_1800_500.jpeg?imageView2/2/w/960/q/100/format/jpg',
    type: 1,
    order: 1,
    username: '小丸犊治',
    price: 1908,
  },
  {
    _id: '61ada4624e147727ac0b1cc0',
    title: '',
    summary: '苏州咖啡｜ 以24节气做特调的咖啡店\n Roaster Q咖啡店\n一家藏在狮林巷里面的咖啡店\n店...',
    cover: null,
    type: 2,
    order: 1,
    username: '九二哥_Yue',
    price: 1908,
  },
  {
    _id: '61af00eb4e147772f32827fe',
    title: '',
    summary: '2021年12月7日，天气晴，温度适中。\n\n今日与各位分享一款魅族的智能感应灯，已经使用了两个半...',
    cover: null,
    type: 6,
    order: 1,
    username: '石鸽',
    price: 1908,
  },
  {
    _id: '61ada4f24e14772e864706f5',
    title: '',
    summary: '「此刻念旧」黑莓Classic，够经典，也好像只有经典了。\n第一次上手黑莓，感想颇多，作为7年前...',
    cover: null,
    type: 4,
    order: 1,
    username: 'long50017',
    price: 1908,
  },
  {
    _id: '61ada3c14e147710197a7482',
    title: '',
    summary: '欣赏云朵是永不厌倦的浪漫小事｜摄影日记\n\n☁️要说什么画面是我永远看不厌也不拍不的，那一定是天空...',
    cover: null,
    type: 5,
    order: 1,
    username: '米奥Meo',
    price: 1908,
  },
  {
    _id: '61ada4bc4e1477677f76b5ae',
    title: '',
    summary: 'Day 15\n扫街南京城 2021.10.19 \nShot by Sony a7m2',
    cover: null,
    type: 4,
    order: 1,
    username: 'RonnieZ',
    price: 1908,
  },
  {
    _id: '61ada6d84e147768b9795988',
    title: '',
    summary: '《我爱中国风》第七期\n器材：Nikon D750\n镜头：50mm 1.8G',
    cover: null,
    type: 6,
    order: 1,
    username: '木未二十六',
    price: 1908,
  },
  {
    _id: '61aef7ff4e14775edb28d1a0',
    title: '淘宝“2021 十大年度商品”评选：这几款商品居然...',
    summary: '今日淘宝启动“年度十大商品”征集活动，消费者可登录淘宝 App 搜索“2021 年度十大商品”就...',
    cover:
      'http://s1.dgtle.com/dgtle_img/news/2021/12/07/5c11120211207135754160.jpeg?imageView2/2/w/960/q/100/format/jpg',
    type: 4,
    order: 1,
    username: '飞越彩虹',
    price: 1908,
  },
]
const OrderSearchPage: FC = (props:any) => {
    const [listData, setListData] = useState<any[]>([])
    useEffect(() => {
        setListData([...ListData])
      }, [])
  const manageOrderDetail = (item) => {
    props.history.push(`/management-details?id=${item._id}`)
  }
  return (
    <div className="orderSearch-container">
      <div className="search-content">
        {listData.length?listData.map((item) => {
          return (
            <div
              className="search-item"
              key={item._id}
              onClick={() => {
                manageOrderDetail(item)
              }}
            >
              <ManageItem {...item} />
            </div>
          )
        }):<Empty description="暂无数据"/>}
      </div>
    </div>
  )
}

export default OrderSearchPage
