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
const travelDetailsPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/travelDetails'))
/**账户资金 */
const userCapitalPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/userCapital'))
/**运营资金 */
const operateCapitalPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/operateCapital'))

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
/**激励管理-列表 */
const IncentivePage = loadable(() => import(/* webpackChunkName: 'IncentivePage' */ './pages/incentiveManagement/list'))
/**激励管理-创建 */
const CreateIncentivePage = loadable(
  () => import(/* webpackChunkName: 'CreateIncentivePage' */ './pages/incentiveManagement/createIncentive')
)
/**激励管理-名单 */
const RosterPage = loadable(() => import(/* webpackChunkName: 'RosterPage' */ './pages/incentiveManagement/roster'))
/**激励管理-添加人员 */
const CreatePersonnel = loadable(
  () => import(/* webpackChunkName: 'RosterPage' */ './pages/incentiveManagement/roster/createRoster')
)

const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Route path="/" exact component={HomePage}></Route>

      <Route path="/travel/route" exact component={TravelRoutePage}></Route>
      <Route path="/myTravel" exact component={MyTravelPage}></Route>
      <Route path="/myTravel/details" exact component={travelDetailsPage}></Route>
      <Route path="/userCapital" exact component={userCapitalPage}></Route>
      <Route path="/operateCapital" exact component={operateCapitalPage}></Route>

      <Route path="/protocol/privacy" exact component={PrivacyPage}></Route>
      <Route path="/protocol/service" exact component={ServicePage}></Route>

      <Route path="/test/page" exact component={TestPage}></Route>
      <Route path="/test/chart" exact component={TestChartPage}></Route>

      <Route path="/orderdetail" exact component={OrderIndexPage}></Route>
      <Route path="/abulkshop" exact component={AbulkShopPage}></Route>

      <Route path="/puorder" exact component={PurchaseOrderPage}></Route>
      <Route path="/applysale" exact component={ApplySalePage}></Route>
      <Route path="/incentive/list" exact component={IncentivePage}></Route>
      <Route path="/incentive/create" exact component={CreateIncentivePage}></Route>
      <Route path="/incentive/roster" exact component={RosterPage}></Route>
      <Route path="/incentive/roster/create" exact component={CreatePersonnel}></Route>
    </BrowserRouter>
  </Suspense>
)

ReactDOM.render(<App />, document.getElementById('root'))
