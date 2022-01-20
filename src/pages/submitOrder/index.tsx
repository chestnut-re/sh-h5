import React, { useState, useEffect, useRef, FC } from 'react'
import { useLocation } from 'react-router-dom'
import GoodsCard from '@/components/orderDetail/goodsCard/submitGoods'
import StepperCard from '@/components/orderDetail/stepperCard'
import qs from 'query-string'
import dayjs from 'dayjs'
import { Toast, Popup } from 'react-vant'
import PayTypeCard from '@/components/orderDetail/payTypeCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import ProtocolCard from '@/components/orderDetail/protocolCard'
import KnownCalendarCard from '@/components/orderDetail/knownCalendarCard'
import Privilege from './privilege'
import { SHBridge } from '@/jsbridge'
import { getCookie } from '@/utils/cookie'
import { generateUrl } from '@/utils'
import { OrderApi } from '@/service/OrderDetailApi'

import './index.less'

/**
 * 提交订单页面
 * activityId：活动id 判断是不是返利商品
 * url 必填入参
 * id : 商品id
 * source：下单途径:1 自然获客、2 分享任务链接、3 分享普通链接、4 线下扫码
 * taskId:任务id来自乐豆分享
 * isRebate 是否返利商品：0否1是 已弃用
 */

const RMB_CON = 1000
//mock数据

const MapbuyType = {
  1: '下单付款',
  2: '订单核销',
}

let orderIdInfo
const SubmitOrderPage: FC = () => {
  const activeRef = useRef(null)
  let UseToast

  const { search } = useLocation()
  const { id, source, userId, taskId } = qs.parse(search.slice(1))
  //是否是限购商品
  const [isPurchase, setisPurchase] = useState(false)
  //是否开启增加限购按钮
  const [isPurchaseAdd, setIsPurchaseAdd] = useState(false)
  //支付方式
  const [payType, setpayType] = useState(2)
  //协议是否勾选
  const [isProtocol, setIsProtocol] = useState(false)

  //协议是否勾选
  const [popvermode, setPopvermode] = useState(1)

  const [tokenAmountNum, setTokenAmountNum] = useState(0)
  //优惠弹窗显隐
  const [showPrivilege, setShowPrivilege] = useState(false)
  //最近推荐人
  const [referees, setReferees] = useState('')
  //限购数据
  const [purchaseConfigInfo, setPurchaseConfigInfo] = useState({})

  //提交数据
  const [submitData, setSubmitData] = useState({
    childCurrentPrice: 0, //儿童现售价单价
    childCurrentTotalPrice: 0, //儿童现售价总额
    childMarkPrice: 0, //儿童市场标价单价
    childMarkTotalPrice: 0, //儿童市场标价总额
    departureCity: '', //商品始发地
    personCurrentPrice: 0, //成人现售价单价
    personCurrentTotalPrice: 0, //成人现售价总额
    personMarkPrice: 0, //成人市场标价单价
    personMarkTotalPrice: 0, //成人市场标价总额
    salesmanId: '', //专属业务员ID
    orderDto: {
      //订单信息
      activityTotalAmount: 0, //活动总价
      adultNum: 0, //成人数量
      childNum: 0, //儿童数量
      discountAmount: 0, //优惠总金额
      goodsId: '', //商品id
      goodsName: '', //商品名称
      promotionalImageUrl: '', //商品预览图
      insuranceAmount: 0, //保险金额
      originPrice: 0, //商品原总价
      payAmount: 0, //支付金额
      payType: 2, //支付方式:1 微信小程序支付、2 微信APP支付、3 支付宝APP支付
      source: '', //下单途径:1 自然获客、2 分享任务链接、3 分享普通链接、4 线下扫码
      state: '1', //订单状态 1-待付款 2-已失效 3-待确认 4-已完成 5-退款中 6-退款成功 7-退款失败
      tokenAmount: '0', //代币/积分使用金额
      // travelEndDate: '2021-12-30', //返程日期
      travelId: '', //行程id
      // travelStartDate: '2021-12-30', //出发日期
    },
  })

  const [submitinfo, setSubmitinfo] = useState({
    id: '', //商品id
    goodsName: '', //商品标题
    goodsNickName: '', //商品副标题
    promotionalImageUrl: '', //商品预览图
    goodsNo: '', //商品编号
    isDeduction: 1, //是否开启代币抵扣 1不开启 0开启
    goodsPrices: [],
    travelMode: 0, //0是固定时间出行，1是约定时间出行
    tokenAmountNum: 0, //金豆数
    deductionNum: 0, //当前可用数量
  })

  const [stepperData, setStepperData] = useState({
    adultNum: 1, //成人数量
    childNum: 0, //儿童数量
    intNum: 0, //金币数量
  })

  const [selectTime, setSelectTime] = useState({
    goodsPriceId: '',
    personCurrentPrice: 0,
    personCostPrice: 0,
    personMarkPrice: 0,
    childCurrentPrice: 0,
    childCostPrice: 0,
    childMarkPrice: 0,
    stock: 0,
    days: 0,
    startDate: '',
  })
  const [priceSet, setPriceSet] = useState({
    priceNum: 0, //总价格
    preferPrice: 0, //优惠价格
  })
  useEffect(() => {
    setPriceSet((v) => {
      const { personMarkPrice, personCurrentPrice, childCurrentPrice, childMarkPrice } = selectTime
      const { adultNum, childNum, intNum } = stepperData

      const personpriceNum = personCurrentPrice * adultNum
      const childpriceNum = childCurrentPrice * childNum
      const personPreferPriceNum = (personMarkPrice - personCurrentPrice) * adultNum //成人优惠总价
      const childPreferPriceNum = (childMarkPrice - childCurrentPrice) * childNum //儿童优惠总价
      return {
        ...v,
        priceNum: personpriceNum + childpriceNum - intNum,
        preferPrice: personPreferPriceNum + childPreferPriceNum > 0 ? personPreferPriceNum + childPreferPriceNum : 0,
      }
    })
  }, [selectTime, stepperData])
  //获取最近推荐人
  const getRefereesApi = () => {
    OrderApi.getReferees()
      .then((res) => {
        const { code, data } = res
        if (code === '200' && data) {
          setReferees(data)
        }
        console.log('res推荐人 :>> ', res)
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })
  }
  //获取商品详情
  const getGoodsDetail = (id) => {
    return new Promise((resolve, reject) => {
      OrderApi.detail({
        id,
      })
        .then((res: any) => {
          const { code, data } = res
          if (code === '200' && data) {
            resolve(data)
          } else {
            reject()
          }
        })
        .catch((err) => {
          reject(err)
          console.log('res :>> ', err)
        })
        .finally(() => {
          console.log('object :>>请求处理完成')
        })
    })
  }

  const getIntegralApi = () => {
    return new Promise<any>((resolve, reject) => {
      OrderApi.getIntegral()
        .then((res: any) => {
          const { code, data } = res
          if (code == '200') {
            resolve(data ?? 0)
          } else {
            reject(new Error('error'))
          }
        })
        .catch((err) => {
          reject(new Error('error'))
        })
    })
  }

  useEffect(() => {
    setPriceSet((v) => {
      return {
        ...v,
        ...selectTime,
      }
    })
  }, [selectTime])

  useEffect(() => {
    document.addEventListener(
      'onResume',
      function (e) {
        const { state } = e
        if (state === 0 && orderIdInfo) {
          paySuccessLink(orderIdInfo)
        }
      },
      false
    )
    return () => {
      document.removeEventListener(
        'onResume',
        function (e) {
          console.log('e :>> ', e)
        },
        false
      )
    }
  }, [])

  useEffect(() => {
    SHBridge.setTitle('提交订单')

    getGoodsDetail(id)
      .then(async (res: any) => {
        const {
          departureCityAdcode,
          goodsName,
          goodsPrices,
          promotionalImageUrl,
          id,
          isDeduction,
          isPurchase,
          isPurchaseAdd,
          purchaseConfig,
          activityId,
        } = res
        setSubmitinfo(res)
        if (goodsPrices.length === 0) {
          Toast('当前商品，无可出行日期')
          return
        }

        setSelectTime(res['goodsPrices'][0])
        // setPurchaseConfigInfo(purchaseConfig)
        setPriceSet((v) => {
          return {
            ...v,
            ...res['goodsPrices'][0],
          }
        })
        //判断是否开启积分抵扣开启0 不开启1
        if (isDeduction === 0) {
          getIntegralApi().then((amountNum) => {
            setTokenAmountNum(amountNum)
          })
        }

        setSubmitData((v) => {
          const neworderDto = { ...v.orderDto }
          return {
            ...v,
            departureCity: departureCityAdcode,
            salesmanId: userId ? userId : '',
            orderDto: {
              ...neworderDto,
              goodsName,
              goodsId: id,
              activityId: activityId,
              isRebate: activityId != '1' ? 0 : 1,
              promotionalImageUrl,
            },
          }
        })
        //是否是限购商品是限购
        if (isPurchase > 0) {
          setisPurchase(true)

          const { code, data } = await purchaseNumber()
          if (code === '200' && data) {
            setPurchaseConfigInfo({
              ...data,
              addType: purchaseConfig.addType,
              purchaseDay: purchaseConfig.purchaseDay,
            })
          }
        }
        //是否显示增加限购按钮
        if (isPurchaseAdd === 1) {
          setIsPurchaseAdd(true)
        }
        getRefereesApi()
        console.log('purchaseConfigpurchaseConfigpurchaseConfigpurchaseConfig :>> ', purchaseConfig)
      })
      .catch((err) => {
        console.log(' :>>接口异常 ')
      })
  }, [id])

  //获取限购数量
  const purchaseNumber = async () => {
    return await OrderApi.purchase({ goodsId: id })
  }

  //获取成人数量
  const handlechangeStepper = async (info) => {
    setStepperData(info)
  }
  //获取最大限购数据
  const getPurchase = async () => {
    //购买数量改变请求限购校验接口
    if (!isPurchase) {
      return
    }
    const { code, data } = await purchaseNumber()
    if (code === '200' && data) {
      setPurchaseConfigInfo((v) => {
        return {
          ...v,
          ...data,
        }
      })
    }
  }

  //处理优惠说明
  const handleDiscountsInfo = () => {
    setPopvermode(1)
    setShowPrivilege(true)
  }
  //处理支付方式
  const handlePayType = (item) => {
    const { value } = item
    setpayType(value)
  }

  //协议状态处理
  const handleProtocolStatus = (status) => {
    setIsProtocol(status)
  }

  //处理日历数据
  const selectedCalendHandel = (item) => {
    setSelectTime(item)
  }
  //支付成功跳转
  const paySuccessLink = (orderId) => {
    UseToast && UseToast.clear()
    SHBridge.jump({
      url: generateUrl(`/pay-success?t=${search}&id=${id}&orderId=${orderId}`),
      newWebView: false,
      replace: true,
      title: '支付成功',
    })
  }
  const payErrorLink = (orderId) => {
    UseToast && UseToast.clear()
    SHBridge.jump({
      url: generateUrl(`/order-detail?orderId=${orderId}`),
      newWebView: false,
      replace: true,
      title: '订单详情',
    })
  }

  //提交订单
  const submitHandle = async () => {
    const { childCurrentPrice, childMarkPrice, personCurrentPrice, personMarkPrice, goodsPriceId, startDate, days } =
      selectTime
    const { adultNum, childNum, intNum } = stepperData
    const { priceNum, preferPrice } = priceSet

    const endDate = dayjs(startDate)
      .add(days - 1, 'day')
      .format('YYYY-MM-DD')

    const subInfo = {
      ...submitData,
      childCurrentPrice: childCurrentPrice,
      childCurrentTotalPrice: childCurrentPrice * childNum,
      childMarkPrice: childMarkPrice,
      childMarkTotalPrice: childMarkPrice * childNum,
      personCurrentPrice: personCurrentPrice,
      personCurrentTotalPrice: personCurrentPrice * adultNum,
      personMarkPrice: personMarkPrice,
      personMarkTotalPrice: personMarkPrice * adultNum,

      orderDto: {
        ...submitData.orderDto,
        adultNum: adultNum,
        childNum: childNum,
        originPrice: personMarkPrice * adultNum + childMarkPrice * childNum,
        payAmount: priceNum,
        payType: payType,
        source: source && source != 'undefined' && source != 'null' ? source : 1,
        taskId: taskId && taskId != 'undefined' && taskId != 'null' ? taskId : '',
        state: 1,
        travelId: goodsPriceId,
        discountAmount: preferPrice,
        tokenAmount: intNum,
        travelStartDate: startDate,
        travelEndDate: endDate,
        referrerUserId: referees ? referees : '',
      },
    }
    if (isPurchase) {
      try {
        const { code, data } = await OrderApi.purchase({ goodsId: id })
        if (code === '200' && data) {
          const { maxNum } = data
          if (adultNum > maxNum) {
            Toast('超出最大限购量，请修改订单！')
            return
          }
        }
      } catch (error) {}
    }

    if (isProtocol) {
      UseToast = Toast.loading({
        message: '订单生成中...',
        forbidClick: true,
        duration: 0,
      })

      OrderApi.submit(subInfo)
        .then((res: any) => {
          console.log('res提交订单 :>> ', res)
          const { code, msg, data } = res
          if (code == '200' && data) {
            if (data.code == '200') {
              console.log('data.data :>> ', data.data)
              const { returnPayInfo, orderId } = data.data
              orderIdInfo = orderId
              switch (payType) {
                case 1:
                  UseToast.clear()
                  SHBridge.minipay(JSON.stringify(returnPayInfo), priceNum, orderId)
                  break
                case 2:
                  SHBridge.wxpay(returnPayInfo, (wxres: any) => {
                    console.log('wxres微信支付回调 :>> ', wxres)
                    const { errorCode } = wxres
                    if (errorCode == 0) {
                      paySuccessLink(orderId)
                    } else {
                      UseToast.clear()
                      Toast('支付失败')
                      payErrorLink(orderId)
                    }
                    console.log(res)
                  })
                  break
                case 3:
                  SHBridge.alipay(returnPayInfo, (alires: any) => {
                    console.log('支付宝回调', alires)
                    const { memo, result, resultStatus } = alires
                    if (result || resultStatus == '9000') {
                      const {
                        alipay_trade_app_pay_response: { code },
                      } = JSON.parse(result)
                      console.log('支付成功', code, res)
                      if (code == '10000') {
                        paySuccessLink(orderId)
                      } else {
                        UseToast.clear()
                        payErrorLink(orderId)
                      }
                    } else {
                      Toast(memo)
                      payErrorLink(orderId)
                    }
                  })
                  break
                default:
                  Toast('支付方式有误')
                  break
              }
            }
          } else {
            UseToast.clear()
            Toast(msg)
          }
        })
        .catch((err) => {
          UseToast.clear()
          console.log('object订单接口异常:>> ', err)
        })
    } else {
      Toast('请勾选相关协议')
    }
  }

  //增加限购数
  const addPurchasingNum = () => {
    setPopvermode(2)
    setShowPrivilege(true)
  }
  //分享商品
  const sharePurchase = () => {
    const { id, goodsName, goodsNickName, promotionalImageUrl } = submitinfo
    const litterUrl = `${window.location.origin}/goods-detail?id=${id}&userId=${getCookie('userId')}&source=2`
    console.log('litterUrl :>> ', litterUrl)
    SHBridge.shareDetail({
      type: 'goods',
      title: goodsName,
      description: goodsNickName,
      headUrl: promotionalImageUrl,
      littleUrl: litterUrl,
    })
    setShowPrivilege(false)
  }
  return (
    <div className="puorder-container">
      <div className="puorder-main">
        <div className="puorder-fluid">
          <div className="puorder-card">
            <GoodsCard
              promotionalImageUrl={submitinfo.promotionalImageUrl}
              startDate={selectTime.startDate}
              endDate={selectTime.endDate}
              adultNum="0"
              childNum="0"
              goodsName={submitinfo.goodsName}
              travelMode={submitinfo.travelMode}
              stock={selectTime.stock}
            />
            {submitinfo.travelMode === 0 ? (
              <KnownCalendarCard
                calendata={submitinfo['goodsPrices']}
                selecttime={selectTime}
                selectedHandelCalend={selectedCalendHandel}
              />
            ) : null}
          </div>
          <div className="puorder-stepper">
            <StepperCard
              priceSet={priceSet}
              selectTime={selectTime}
              tokenAmountNum={tokenAmountNum}
              handleStepper={handlechangeStepper}
              handleDiscounts={handleDiscountsInfo}
              purchaseConfigInfo={purchaseConfigInfo}
              onChangeClickAdultNum={getPurchase}
              isPurchase={isPurchase}
            />
          </div>
          <PayTypeCard changePayType={handlePayType} />
          <BackCard />

          <ProtocolCard changeProtocolStatus={handleProtocolStatus} />
        </div>
      </div>
      <div className="puorder-submit" ref={activeRef}>
        {isPurchase && purchaseConfigInfo ? (
          <div className="puorder-purchasing">
            <div className="puorder-purchasing-left">
              限{purchaseConfigInfo.purchaseDay}天内，成人{purchaseConfigInfo.countNum}，剩余{purchaseConfigInfo.maxNum}
              份
            </div>
            {isPurchaseAdd ? (
              <div className="puorder-purchasing-right" onClick={addPurchasingNum}>
                增加份额
              </div>
            ) : null}
          </div>
        ) : null}
        <FooterCard priceSetData={priceSet} submitHandleOrder={submitHandle} />
      </div>
      <Popup
        title={popvermode === 1 ? '优惠信息' : '限购说明'}
        visible={showPrivilege}
        position="bottom"
        destroyOnClose={true}
        closeable
        round
        safeAreaInsetBottom={true}
        closeIcon="close"
        onClose={() => setShowPrivilege(false)}
      >
        {popvermode === 2 && purchaseConfigInfo ? (
          <div className="purch-ins">
            <div className="purch-ins-content">
              当前商品同一账号{purchaseConfigInfo.purchaseDay}天内最多可购买
              {purchaseConfigInfo.countNum}张成人票，分享商品，好友{MapbuyType[purchaseConfigInfo.addType]}后可提升
              {purchaseConfigInfo.addNum}个限购名额。
            </div>
            <div className="purch-ins-btn" onClick={sharePurchase}>
              分享好友
            </div>
          </div>
        ) : (
          <div className="privilege-box">
            <Privilege goodsPriceId={selectTime['goodsPriceId']} stepperData={stepperData} id={id} />
          </div>
        )}
      </Popup>
    </div>
  )
}

export default SubmitOrderPage
