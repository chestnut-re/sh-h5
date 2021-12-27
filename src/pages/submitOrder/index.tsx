import React, { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import GoodsCard from '@/components/orderDetail/goodsCard'
import StepperCard from '@/components/orderDetail/stepperCard'
import qs from 'query-string'
import PayTypeCard from '@/components/orderDetail/payTypeCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import ProtocolCard from '@/components/orderDetail/protocolCard'
import KnownCalendarCard from '@/components/orderDetail/knownCalendarCard'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { OrderApi } from '@/service/OrderDetailApi'
import './index.less'

/**
 * 提交订单页面
 */

const RMB_CON = 100
//mock数据
const GoodsPrice = [
  {
    goodsPriceId: 1473837416123000,
    startDate: '2021-12-29',
    endDate: '2022-12-29',
    personCurrentPrice: 180000,
    personCostPrice: 180000,
    personMarkPrice: 1999,
    childCurrentPrice: 1999,
    childCostPrice: 180000,
    childMarkPrice: 180000,
    stock: 99,
    days: 7,
  },
  {
    goodsPriceId: 1473837486123000,
    startDate: '2021-12-31',
    endDate: '2022-12-29',
    personCurrentPrice: 180000,
    personCostPrice: 180000,
    personMarkPrice: 6700,
    childCurrentPrice: 199,
    childCostPrice: 180000,
    childMarkPrice: 180000,
    stock: 99,
    days: 7,
  },
  {
    goodsPriceId: 1473837487616100,
    startDate: '2022-01-02',
    endDate: '2022-12-29',
    personCurrentPrice: 180000,
    personCostPrice: 180000,
    personMarkPrice: 1800,
    childCurrentPrice: 180,
    childCostPrice: 180000,
    childMarkPrice: 180000,
    stock: 199,
    days: 7,
  },
]

const SubmitOrderPage: FC = () => {
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))
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
      insuranceAmount: 0, //保险金额
      originPrice: 0, //商品原总价
      payAmount: 0, //支付金额
      payType: 3, //支付方式:1 微信小程序支付、2 微信APP支付、3 支付宝APP支付
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
    canDeductionNum: 0, //当前可用金豆抵扣数量
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
        priceNum: personpriceNum + childpriceNum - stepperData['intNum'],
        preferPrice: personPreferPriceNum + childPreferPriceNum,
      }
    })
  }, [selectTime, stepperData])

  useEffect(() => {
    //计算每一天金豆可用数量
    const { personCurrentPrice } = selectTime
    const { deductionScale, tokenAmountNum } = submitinfo
    const deductions = personCurrentPrice * (deductionScale / 100)
    // if (condition) {

    // }
    setSubmitinfo((v) => {
      return {
        ...v,
        deductionNum: deductions, //当前可用数量
        canDeductionNum: parseInt(deductions + ''), //当前可用金豆抵扣数量
      }
    })
  }, [selectTime])

  const getGoodsDetail = (id) => {
    return new Promise((resolve, reject) => {
      OrderApi.detail({
        id,
      })
        .then((res: any) => {
          const { code, data } = res
          if (code === '200' && data) {
            //测试数据
            // data.goodsPrices = [...GoodsPrice]
            // const { id, goodsName, goodsNickName, promotionalImageUrl, goodsNo, isDeduction, goodsPrices } = data
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
          let { code, data } = res
          if (code == '200' && data) {
            resolve(data)
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
    console.log('selectTime已选中 :>> ', selectTime)
    setPriceSet((v) => {
      return {
        ...v,
        ...selectTime,
      }
    })
  }, [selectTime])

  useEffect(() => {
    getGoodsDetail(id)
      .then((res) => {
        const { departureCity, goodsName, id, isDeduction } = res
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
            setSubmitinfo((v) => {
              return {
                ...v,
                tokenAmountNum: amountNum,
              }
            })
            console.log('积分数量es :>> ', res)
          })
        }

        setSubmitData((v) => {
          return {
            ...v,
            departureCity,
            orderDto: {
              ...v.orderDto,
              goodsName,
              goodsId: id,
            },
          }
        })
      })
      .catch((err) => {
        console.log(' :>>接口异常 ')
      })
  }, [])

  //获取成人数量
  const handlechangeStepper = (info) => {
    console.log('成人儿童数量改变 :>> ', info)
    setStepperData(info)
  }
  //处理优惠说明
  const handleDiscountsInfo = () => {
    SHBridge.jump({
      url: generateUrl(`/privilege${search}`),
      newWebView: true,
      title: '优惠说明',
    })
  }

  //处理日历数据
  const selectedCalendHandel = (item) => {
    console.log('item执行 :>> ', item)
    setSelectTime(item)
  }
  //提交订单
  const submitHandle = () => {
    const { childCurrentPrice, childMarkPrice, personCurrentPrice, personMarkPrice, goodsPriceId } = selectTime
    const { adultNum, childNum, intNum } = stepperData
    const { priceNum, preferPrice } = priceSet
    const subInfo = {
      ...submitData,
      childCurrentPrice: childCurrentPrice * RMB_CON,
      childCurrentTotalPrice: childCurrentPrice * childNum * RMB_CON,
      childMarkPrice: childMarkPrice * RMB_CON,
      childMarkTotalPrice: childMarkPrice * childNum * RMB_CON,
      personCurrentPrice: personCurrentPrice * RMB_CON,
      personCurrentTotalPrice: personCurrentPrice * RMB_CON * adultNum,
      personMarkPrice: personMarkPrice * RMB_CON,
      personMarkTotalPrice: personMarkPrice * RMB_CON * adultNum,

      orderDto: {
        ...submitData.orderDto,
        adultNum: adultNum,
        childNum: childNum,
        originPrice: personCurrentPrice * RMB_CON * adultNum + childCurrentPrice * childNum * RMB_CON,
        payAmount: priceNum * RMB_CON,
        payType: 3,
        source: 1,
        state: 1,
        travelId: goodsPriceId,
        discountAmount: preferPrice,
      },
    }

    console.log('subInfo拼接 :>> ', subInfo)
    // return
    // setSubmitData((v)=>{
    //   return subInfo
    // })

    OrderApi.submit(subInfo)
      .then((res) => {
        console.log('res提交订单 :>> ', res)
      })
      .catch((err) => {
        console.log('object订单接口异常:>> ', err)
      })

    console.log('object :>> 提交订单', OrderApi)
    console.log('id', qs.parse(search.slice(1)))
  }
  return (
    <div className="puorder-container">
      <div className="puorder-main">
        <div className="puorder-fluid">
          <div className="puorder-card">
            <GoodsCard {...submitinfo} />
            <KnownCalendarCard
              calendata={submitinfo['goodsPrices']}
              selecttime={selectTime}
              selectedHandelCalend={selectedCalendHandel}
            />
          </div>
          <div className="puorder-stepper">
            <StepperCard
              submitinfo={submitinfo}
              priceSet={priceSet}
              selectTime={selectTime}
              handleStepper={handlechangeStepper}
              handleDiscounts={handleDiscountsInfo}
            />
          </div>
          <PayTypeCard />
          <BackCard />

          <ProtocolCard />
        </div>
      </div>
      <FooterCard priceSetData={priceSet} submitHandleOrder={submitHandle} />
    </div>
  )
}

export default SubmitOrderPage
