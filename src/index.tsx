import React, { lazy, Suspense } from 'react'
import loadable from '@loadable/component'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'normalize.css'
import './assets/css/base.css'
import '@/assets/css/base-tmp.less'

const HomePage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/home'))

/**参考行程 */
const TravelRoutePage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/travelRoute'))

/**App交互测试页面 */
const TestPage = loadable(() => import(/* webpackChunkName: 'testPage'*/ './pages/testPage'))
/**测试图标 echart */
const TestChartPage = loadable(() => import(/* webpackChunkName: 'testPage'*/ './pages/testChart'))

/**隐私协议 */
const PrivacyPage = loadable(() => import(/* webpackChunkName: 'PrivacyPage'*/ './pages/protocol/Privacy'))
/**服务协议 */
const ServicePage = loadable(() => import(/* webpackChunkName: 'ServicePage'*/ './pages/protocol/Service'))

/**订单详情 */
const OrderIndexPage = loadable(() => import(/* webpackChunkName: 'OrderDetailPage'*/ './pages/orderDetail'))
/**团小店 */
const AbulkShopPage = loadable(() => import(/* webpackChunkName: 'AbulkShopPage'*/ './pages/abulkShop'))
/**提交订单 */
const PurchaseOrderPage = loadable(() => import(/* webpackChunkName: 'PurchaseOrderPage'*/ './pages/purchaseOrder'))
/**售后服务 */
const ApplySalePage = loadable(() => import(/* webpackChunkName: 'PurchaseOrderPage'*/ './pages/applySaleService'))

/**订单管理 */
const ManageOrderPage = loadable(() => import(/* webpackChunkName: 'ManageOrderPage'*/ './pages/manageOrder'))
/**订单管理详情 */
const ManageDetailPage = loadable(() => import(/* webpackChunkName: 'ManageOrderPage'*/ './pages/manageOrder/manageDetail'))

/**激励目标 */
const GoalsMotivationPage = loadable(() => import(/* webpackChunkName: 'ManageOrderPage'*/ './pages/goalsMotivation'))

const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Route path="/" exact component={HomePage}></Route>

      <Route path="/travel/route" exact component={TravelRoutePage}></Route>

      <Route path="/protocol/privacy" exact component={PrivacyPage}></Route>
      <Route path="/protocol/service" exact component={ServicePage}></Route>

      <Route path="/test/page" exact component={TestPage}></Route>
      <Route path="/test/chart" exact component={TestChartPage}></Route>

        <Route path="/orderdetail" exact component={OrderIndexPage}></Route>
        <Route path="/abulkshop" exact component={AbulkShopPage}></Route>

        <Route path="/puorder" exact component={PurchaseOrderPage}></Route>
        <Route path="/applysale" exact component={ApplySalePage}></Route>

        <Route path="/manageorder" exact component={ManageOrderPage}></Route>
        <Route path="/managedetail" exact component={ManageDetailPage}></Route>

        <Route path="/goalsmotivation" exact component={GoalsMotivationPage}></Route>
      </BrowserRouter>
    </Suspense>
)

ReactDOM.render(<App />, document.getElementById('root'))
