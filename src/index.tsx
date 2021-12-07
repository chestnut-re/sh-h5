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
/**我的行程 */
const MyTravelPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/myTravel'))
/**行程详情 */
const TravelDetailsPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/travelDetails'))
/**账户资金 */
const UserCapitalPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/userCapital'))
/**运营资金 */
const OperateCapitalPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/operateCapital'))
/**转入，转出，提现成功 */
const SuccessMovePage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/successMove'))
/**资金明细 */
const FundDetailsPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/fundDetails'))

/**App交互测试页面 */
const TestPage = loadable(() => import(/* webpackChunkName: 'testPage'*/ './pages/testPage'))
/**测试图标 echart */
const TestChartPage = loadable(() => import(/* webpackChunkName: 'testPage'*/ './pages/testChart'))

/**隐私协议 */
const PrivacyPage = loadable(() => import(/* webpackChunkName: 'PrivacyPage'*/ './pages/protocol/Privacy'))
/**服务协议 */
const ServicePage = loadable(() => import(/* webpackChunkName: 'ServicePage'*/ './pages/protocol/Service'))

/**订单详情 */
const OrderDetailPage = loadable(() => import(/* webpackChunkName: 'OrderDetailPage'*/ './pages/orderDetail'))
/**团小店 */
const AbulkShopPage = loadable(() => import(/* webpackChunkName: 'AbulkShopPage'*/ './pages/abulkShop'))
/**提交订单 */
const PurchaseOrderPage = loadable(() => import(/* webpackChunkName: 'PurchaseOrderPage'*/ './pages/purchaseOrder'))
/**售后服务 */
const ApplySalePage = loadable(() => import(/* webpackChunkName: 'PurchaseOrderPage'*/ './pages/applySaleService'))

const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Route path="/" exact component={HomePage}></Route>

      <Route path="/travel/route" exact component={TravelRoutePage}></Route>
      <Route path="/myTravel" exact component={MyTravelPage}></Route>
      <Route path="/myTravel/details" exact component={TravelDetailsPage}></Route>
      <Route path="/user-capital" exact component={UserCapitalPage}></Route>
      <Route path="/operate-capital" exact component={OperateCapitalPage}></Route>
      <Route path="/success-move" exact component={SuccessMovePage}></Route>
      <Route path="/fund-details" exact component={FundDetailsPage}></Route>

      <Route path="/protocol/privacy" exact component={PrivacyPage}></Route>
      <Route path="/protocol/service" exact component={ServicePage}></Route>

      <Route path="/test/page" exact component={TestPage}></Route>
      <Route path="/test/chart" exact component={TestChartPage}></Route>

      <Route path="/order-detail" exact component={OrderDetailPage}></Route>
      <Route path="/abulkshop" exact component={AbulkShopPage}></Route>

      <Route path="/puorder" exact component={PurchaseOrderPage}></Route>
      <Route path="/applysale" exact component={ApplySalePage}></Route>
    </BrowserRouter>
  </Suspense>
)

ReactDOM.render(<App />, document.getElementById('root'))
