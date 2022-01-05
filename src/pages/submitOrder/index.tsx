import React, { useState,useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import GoodsCard from '@/components/orderDetail/goodsCard/submitGoods'
import StepperCard from '@/components/orderDetail/stepperCard'
import qs from 'query-string'
import dayjs from 'dayjs';
import { hooks,Toast, Popup } from 'react-vant'
import PayTypeCard from '@/components/orderDetail/payTypeCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import ProtocolCard from '@/components/orderDetail/protocolCard'
import KnownCalendarCard from '@/components/orderDetail/knownCalendarCard'
import Privilege from './privilege'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { OrderApi } from '@/service/OrderDetailApi'

import './index.less'

/**
 * 提交订单页面
 * url 必填入参
 * id : 商品id
 * source：下单途径:1 自然获客、2 分享任务链接、3 分享普通链接、4 线下扫码
 */

const RMB_CON = 100
//mock数据

const SubmitOrderPage: FC = () => {
  let UseToast;
  const { search } = useLocation()
  const { id,source } = qs.parse(search.slice(1))
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
  //支付方式
  const [payType, setpayType] = useState(2)

  //协议是否勾选
  const [isProtocol, setIsProtocol] = useState(false)

  const [tokenAmountNum,setTokenAmountNum] = useState(0);

  const [showPrivilege, setShowPrivilege] = useState(false)
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
    startDate:"",
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

    SHBridge.setTitle("提交订单")

    getGoodsDetail(id)
      .then((res: any) => {
        const { departureCityAdcode, goodsName, promotionalImageUrl, id, isDeduction } = res
        setSubmitinfo(res)
        setSelectTime(res['goodsPrices'][0])
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
          return {
            ...v,
            departureCity: departureCityAdcode,
            orderDto: {
              ...v.orderDto,
              goodsName,
              goodsId: id,
              promotionalImageUrl,
            },
          }
        })
      })
      .catch((err) => {
        console.log(' :>>接口异常 ')
      })
  }, [id])

  //获取成人数量
  const handlechangeStepper = (info) => {
    console.log('成人儿童数量改变 :>> ', info)
    setStepperData(info)
  }
  //处理优惠说明
  const handleDiscountsInfo = () => {
    setShowPrivilege(true)
  }
  //处理支付方式
  const handlePayType = (item) => {
    const { value } = item
    setpayType(value)
    console.log('itemz支付方式 :>> ', item)
  }

  //协议状态处理
  const handleProtocolStatus = (status) => {
    console.log('status :>> ', status)
    setIsProtocol(status)
  }

  //处理日历数据
  const selectedCalendHandel = (item) => {
    console.log('item执行 :>> ', item)
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
  const payErrorLink =  (orderId) => {
    UseToast && UseToast.clear()
    SHBridge.jump({
      url: generateUrl(`/order-detail?orderId=${orderId}`),
      newWebView: false,
      replace: true,
      title: '订单详情',
    })
  }

  //提交订单
  const submitHandle = () => {
    const { childCurrentPrice, childMarkPrice, personCurrentPrice, personMarkPrice, goodsPriceId,startDate,days } = selectTime
    const { adultNum, childNum, intNum } = stepperData
    const { priceNum, preferPrice } = priceSet;

    const endDate = dayjs(startDate).add(days, 'day').format("YYYY-MM-DD")

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
        originPrice: personCurrentPrice * adultNum + childCurrentPrice * childNum * RMB_CON,
        payAmount: priceNum,
        payType: payType,
        source: source?source:1,
        state: 1,
        travelId: goodsPriceId,
        discountAmount: preferPrice,
        tokenAmount: intNum,
        travelStartDate:startDate,
        travelEndDate:endDate
      },
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
              const { returnPayInfo, orderId } = data.data
              switch (payType) {
                case 1:
                  UseToast.clear()
                  SHBridge.minipay(JSON.stringify(returnPayInfo), priceNum,orderId)
                  break
                case 2:
                  SHBridge.wxpay(returnPayInfo, (wxres: any) => {
                    console.log('wxres微信支付回调 :>> ', wxres);
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
                    const {
                      alipay_trade_app_pay_response: { code },
                    } = JSON.parse(alires.result)
                    console.log('支付成功', code, res)
                    if (code == '10000') {
                      paySuccessLink(orderId)
                    }else{
                      UseToast.clear()
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
              submitinfo={submitinfo}
              priceSet={priceSet}
              selectTime={selectTime}
              tokenAmountNum={tokenAmountNum}
              handleStepper={handlechangeStepper}
              handleDiscounts={handleDiscountsInfo}
            />
          </div>
          <PayTypeCard changePayType={handlePayType} />
          <BackCard />

          <ProtocolCard changeProtocolStatus={handleProtocolStatus} />
        </div>
      </div>
      <FooterCard priceSetData={priceSet} submitHandleOrder={submitHandle} />

      <Popup
        title="优惠信息"
        visible={showPrivilege}
        position="bottom"
        destroyOnClose={true}
        closeable
        round
        safeAreaInsetBottom={true}
        closeIcon="close"
        onClose={() => setShowPrivilege(false)}
      >
        <div className="privilege-box">
          <Privilege goodsPriceId={selectTime['goodsPriceId']} stepperData={stepperData}  id={id} />
        </div>
      </Popup>
    </div>
  )
}

export default SubmitOrderPage
