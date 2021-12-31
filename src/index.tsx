import React, { lazy, Suspense } from 'react'
import loadable from '@loadable/component'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'normalize.css'
import './assets/css/base.css'
import '@/assets/css/base-tmp.less'
import 'react-vant/lib/styles/base.less'

const HomePage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/home'))

/**AppPage, App入口页 */
const AppPage = loadable(() => import(/* webpackChunkName: 'AppPage'*/ './pages/app'))
const AppBizPage = loadable(() => import(/* webpackChunkName: 'AppBizPage'*/ './pages/appbiz'))

/**商品详情页 */
const GoodsDetailPage = loadable(() => import(/* webpackChunkName: 'GoodsDetailPage'*/ './pages/goodsDetail'))

/**参考行程 */
const TravelRoutePage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/travelRoute'))
/**我的行程 */
const MyTravelPage = loadable(() => import(/* webpackChunkName: 'MyTravelPage'*/ './pages/myTravel'))
/**行程详情 */
const TravelDetailsPage = loadable(() => import(/* webpackChunkName: 'TravelDetailsPage'*/ './pages/travelDetails'))
/**我的代币 */
const MyTokenPage = loadable(() => import(/* webpackChunkName: 'MyTokenPage'*/ './pages/myToken'))
/**我的代币 提现 */
const WithDrawPage = loadable(() => import(/* webpackChunkName: 'MyTokenPage'*/ './pages/withDraw'))
/**我的代币 审核中 */
const ExaminePage = loadable(() => import(/* webpackChunkName: 'MyTokenPage'*/ './pages/examine'))
/**我的代币 收支明细 */
const DetaildedPage = loadable(() => import(/* webpackChunkName: 'MyTokenPage'*/ './pages/detailed'))

/**账户资金 */
const UserCapitalPage = loadable(() => import(/* webpackChunkName: 'UserCapitalPage'*/ './pages/userCapital'))
/**运营资金 */
const OperateCapitalPage = loadable(() => import(/* webpackChunkName: 'UserCapitalPage'*/ './pages/operateCapital'))
/**转入，转出，提现成功 */
const SuccessMovePage = loadable(() => import(/* webpackChunkName: 'UserCapitalPage'*/ './pages/successMove'))
/**资金明细 */
const FundDetailsPage = loadable(() => import(/* webpackChunkName: 'UserCapitalPage'*/ './pages/fundDetails'))
/**运营资金明细 */
const OperateDetailsPage = loadable(() => import(/* webpackChunkName: 'UserCapitalPage'*/ './pages/operateDetails'))
/**提现记录 */
const MoneyRecordPage = loadable(() => import(/* webpackChunkName: 'UserCapitalPage'*/ './pages/moneyRecord'))

/**App交互测试页面 */
const TestPage = loadable(() => import(/* webpackChunkName: 'testPage'*/ './pages/testPage'))
/**测试图标 echart */
const TestChartPage = loadable(() => import(/* webpackChunkName: 'testPage'*/ './pages/testChart'))

/**隐私协议 */
const PrivacyPage = loadable(() => import(/* webpackChunkName: 'PrivacyPage'*/ './pages/protocol/Privacy'))
/**服务协议 */
const ServicePage = loadable(() => import(/* webpackChunkName: 'ServicePage'*/ './pages/protocol/Service'))
/**用户协议 */
const UserPage = loadable(() => import(/* webpackChunkName: 'UserPage'*/ './pages/protocol/User'))
/**网络信息侵权通知指引 */
const NetWorkInforPage = loadable(
  () => import(/* webpackChunkName: 'NetWorkInforPage'*/ './pages/protocol/NetworkInfor')
)
/**免责协议 */
const ExemptionPage = loadable(() => import(/* webpackChunkName: 'ExemptionPage'*/ './pages/protocol/Exemption'))
/**权利声明 */
const InterestPage = loadable(() => import(/* webpackChunkName: 'InterestPage'*/ './pages/protocol/Interest'))
/**预订出行须知 */
const TravelPage = loadable(() => import(/* webpackChunkName: 'TravelPage'*/ './pages/protocol/Travel'))
/**知识产权声明 */
const PropertyRightPage = loadable(
  () => import(/* webpackChunkName: 'PropertyRightPage'*/ './pages/protocol/PropertyRight')
)
/**平台用户服务协议 */
const PlatformServicesPage = loadable(
  () => import(/* webpackChunkName: 'PlatformServicesPage'*/ './pages/protocol/PlatformServices')
)
/**个人信息保护授权协议 */
const PersonalInformationPage = loadable(
  () => import(/* webpackChunkName: 'PersonalInformationPage'*/ './pages/protocol/PersonalInformation')
)

/**订单详情 */
const OrderDetailPage = loadable(() => import(/* webpackChunkName: 'OrderDetailPage'*/ './pages/orderDetail'))
/**团小店 */
const GroupShopPage = loadable(() => import(/* webpackChunkName: 'GroupShopPage'*/ './pages/groupShop'))
/**提交订单 */
const SubmitOrderPage = loadable(() => import(/* webpackChunkName: 'PurchaseOrderPage'*/ './pages/submitOrder'))
/**订单 优惠说明*/
const PrivilegePage = loadable(() => import(/* webpackChunkName: 'PurchaseOrderPage'*/ './pages/submitOrder/privilege'))
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
/**kpi管理-列表 */
const KpiListPage = loadable(() => import(/* webpackChunkName: 'KpiListPage' */ './pages/kpiManagement/kpiList'))
/**激励管理-名单 */
const KpiDetailPage = loadable(() => import(/* webpackChunkName: 'KpiDetailPage' */ './pages/kpiManagement/kpiDetail'))
/**kpi管理-添加人员 */
const KpiPersonnelPage = loadable(
  () => import(/* webpackChunkName: 'KpiPersonnelPage' */ './pages/kpiManagement/kpiDetail/createRoster')
)
/**kpi管理-创建 */
const KpiCreatePage = loadable(() => import(/* webpackChunkName: 'KpiCreatePage' */ './pages/kpiManagement/createKpi'))
/**销售业绩 */
const SalesPerformancePage = loadable(
  () => import(/* webpackChunkName: 'SalesPerformancePage' */ './pages/salesPerformance')
)
/**kpi目标 */
const KpiTargetPage = loadable(() => import(/*webpackChunkName: 'KpiTargetPage' */ './pages/kpiTarget'))

/**商铺二维码页面 */
const ShopsQrPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/shops/shopsQr'))

/**商品二维码页面 */
const GoodsQrPage = loadable(() => import(/* webpackChunkName: 'TravelRoutePage'*/ './pages/shops/goodsQr'))
/**工作台-订单管理 */
const ManageOrderPage = loadable(() => import(/* webpackChunkName: 'ManageOrderPage'*/ './pages/manageOrder'))
/**工作台-订单搜索 */
const OrderSearchPage = loadable(
  () => import(/* webpackChunkName: 'ManageOrderPage'*/ './pages/manageOrder/orderSearch')
)

/**工作台-订单管理详情 */
const ManageDetailPage = loadable(
  () => import(/* webpackChunkName: 'ManageOrderPage'*/ './pages/manageOrder/manageDetail')
)

/**激励目标 */
const IncentiveTarget = loadable(() => import(/* webpackChunkName: 'IncentiveTarget'*/ './pages/incentiveTarget'))
/**市场分析 */
const MarketAnalysisPage = loadable(() => import(/* webpackChunkName: 'MarketAnalysisPage'*/ './pages/marketAnalysis'))
/**商品分析 */
const ProductAnalysisPage = loadable(
  () => import(/* webpackChunkName: 'ProductAnalysisPage'*/ './pages/productAnalysis')
)
/**支付成功 */
const PaymentSuccessPage = loadable(() => import(/* webpackChunkName: 'PaymentSuccessPage'*/ './pages/paymentSuccess'))
/**消息-员工数据板 */
const EmployeeDataPage = loadable(() => import(/* webpackChunkName: 'EmployeeDataPage'*/ './pages/employeeData'))

/**固定出行发团分配-列表 */
const GroupTripPage = loadable(() => import(/* webpackChunkName: 'MassPage' */ './pages/groupAllocation/tripList'))
/**发团分配 团列表-列表 */
const GroupPage = loadable(() => import(/* webpackChunkName: 'MassPage' */ './pages/groupAllocation/list'))
/** 指定发团人 */

const SendPeople = loadable(() => import(/* webpackChunkName: 'MassPage' */ './pages/groupAllocation/sendPeople'))
//新增、编辑出行人信息
const PersonalDetails = loadable(() => import(/* webpackChunkName: 'MassPage' */ './pages/personalDetails'))
//绑定订单出行人
const PersonalBind = loadable(() => import(/* webpackChunkName: 'MassPage' */ './pages/personalBind'))
//订单详情-出行人列表数据
const TravelList = loadable(() => import(/* webpackChunkName: 'MassPage' */ './pages/travelList'))
const env = process.env.NODE_ENV
console.log(env)

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Route path="/" exact component={HomePage}></Route>

      <Route path="/app" exact component={AppPage}></Route>
      <Route path="/appbiz" exact component={AppBizPage}></Route>

      <Route path="/goods-detail" exact component={GoodsDetailPage}></Route>

      <Route path="/travel/route" exact component={TravelRoutePage}></Route>
      <Route path="/my-travel" exact component={MyTravelPage}></Route>
      <Route path="/my-travel/details" exact component={TravelDetailsPage}></Route>
      <Route path="/my-token" exact component={MyTokenPage}></Route>
      <Route path="/with-draw" exact component={WithDrawPage}></Route>
      <Route path="/examine" exact component={ExaminePage}></Route>
      <Route path="/detailed" exact component={DetaildedPage}></Route>
      <Route path="/mine-capital" exact component={UserCapitalPage}></Route>
      <Route path="/operate-capital" exact component={OperateCapitalPage}></Route>
      <Route path="/success-move" exact component={SuccessMovePage}></Route>
      <Route path="/fund-details" exact component={FundDetailsPage}></Route>
      <Route path="/operate-details" exact component={OperateDetailsPage}></Route>
      <Route path="/money-record" exact component={MoneyRecordPage}></Route>

      <Route path="/protocol/privacy" exact component={PrivacyPage}></Route>
      <Route path="/protocol/service" exact component={ServicePage}></Route>
      <Route path="/protocol/user" exact component={UserPage}></Route>
      <Route path="/protocol/network" exact component={NetWorkInforPage}></Route>
      <Route path="/protocol/exemption" exact component={ExemptionPage}></Route>
      <Route path="/protocol/interest" exact component={InterestPage}></Route>
      <Route path="/protocol/travel" exact component={TravelPage}></Route>
      <Route path="/protocol/property-right" exact component={PropertyRightPage}></Route>
      <Route path="/protocol/platform-service" exact component={PlatformServicesPage}></Route>
      <Route path="/protocol/personal-information" exact component={PersonalInformationPage}></Route>

      <Route path="/test/page" exact component={TestPage}></Route>
      <Route path="/test/chart" exact component={TestChartPage}></Route>

      <Route path="/order-detail" exact component={OrderDetailPage}></Route>
      <Route path="/group-shop" exact component={GroupShopPage}></Route>

      <Route path="/incentive/list" exact component={IncentivePage}></Route>
      <Route path="/incentive/create" exact component={CreateIncentivePage}></Route>
      <Route path="/incentive/roster" exact component={RosterPage}></Route>
      <Route path="/incentive/roster/create" exact component={CreatePersonnel}></Route>
      <Route path="/kpi-list" exact component={KpiListPage}></Route>
      <Route path="/kpi-detail" exact component={KpiDetailPage}></Route>
      <Route path="/kpi-create" exact component={KpiCreatePage}></Route>
      <Route path="/kpi-detail/add" exact component={KpiPersonnelPage}></Route>
      <Route path="/performance" exact component={SalesPerformancePage}></Route>
      <Route path="/kpi-target" exact component={KpiTargetPage}></Route>
      <Route path="/shops/shop-qr" exact component={ShopsQrPage}></Route>
      <Route path="/shops/good-qr" exact component={GoodsQrPage}></Route>

      <Route path="/submit-order" exact component={SubmitOrderPage}></Route>
      <Route path="/privilege" exact component={PrivilegePage}></Route>

      <Route path="/apply-sales" exact component={ApplySalePage}></Route>

      <Route path="/order-management" exact component={ManageOrderPage}></Route>
      <Route path="/management-details" exact component={ManageDetailPage}></Route>

      <Route path="/incentive-target" exact component={IncentiveTarget}></Route>
      <Route path="/market-analysis" exact component={MarketAnalysisPage}></Route>
      <Route path="/product-analysis" exact component={ProductAnalysisPage}></Route>
      <Route path="/order-search" exact component={OrderSearchPage}></Route>
      <Route path="/pay-success" exact component={PaymentSuccessPage}></Route>
      <Route path="/employee-data" exact component={EmployeeDataPage}></Route>
      <Route path="/group/trip-list" exact component={GroupTripPage}></Route>
      <Route path="/group/list" exact component={GroupPage}></Route>
      <Route path="/group/send-people" exact component={SendPeople}></Route>
      <Route path="/personal-details" exact component={PersonalDetails}></Route>
      <Route path="/personal-bind" exact component={PersonalBind}></Route>
      <Route path="/order-travel" exact component={TravelList}></Route>
    </BrowserRouter>
  </Suspense>
)

ReactDOM.render(<App />, document.getElementById('root'))
