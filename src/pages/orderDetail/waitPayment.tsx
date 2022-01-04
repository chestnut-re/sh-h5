import React, { useState,useEffect,FC } from 'react'
import dayjs from 'dayjs';
import { CountDown } from 'react-vant';
import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import IndentCard from '@/components/orderDetail/indentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import FooterCard from '@/components/orderDetail/footerCard'
import { OrderApi } from '@/service/OrderDetailApi'
import { SHBridge } from '@/jsbridge'
import { Toast } from 'react-vant'
import { generateUrl } from '@/utils'
import './index.less'

/**
 * 订单待付款入口页
 */
 const COUNT_DOWN = 60 * 30 * 1000


const OrderPaymentPage:FC = (props:any) => {
  const {
    promotionalImageUrl,
    goodsName,
    travelStartDate,
    travelEndDate,
    adultNum,
    childNum,
    tokenAmount,
    discountAmount,
    payAmount,
    orderNo,
    payType,
    orderTime,
    payTime,
    id,
  } = props
  console.log('objectidididid :>> ', props);
  const [countdowntime, setCountdownTime] = useState<number>(COUNT_DOWN)

  useEffect(() => {
    if (orderTime) {
      const restTime = (dayjs().unix() - dayjs(orderTime).unix()) * 1000
      setCountdownTime(COUNT_DOWN - restTime)
    }
  }, [orderTime])

 //支付成功跳转
 const paySuccessLink = (orderId) => {
  SHBridge.jump({
    url: generateUrl(`/pay-success?orderId=${orderId}`),
    newWebView: false,
    replace: true,
    title: '支付成功',
  })
}
  const HandleOrdersubmit = ()=>{
    const toast1 = Toast.loading({
      message: '订单生成中...',
      forbidClick: true,
      duration: 0,
    })
    OrderApi.toPay({
      orderId:id
    }).then((res:any)=>{
      const { code, msg, data } = res
          if (code == '200' && data) {
            if (data.code == '200') {
              const { returnPayInfo,payType, orderId } = data.data
              switch (payType) {
                case 1:
                  toast1 && toast1.clear()
                  // SHBridge.minipay(JSON.stringify(data), 1)
                  SHBridge.minipay(JSON.stringify(returnPayInfo), payAmount,orderId)
                  break
                case 2:
                  SHBridge.wxpay(returnPayInfo, (wxres: any) => {
                    const { errorCode } = wxres
                    if (errorCode == 0) {
                      toast1 && toast1.clear()
                      paySuccessLink(orderId)
                    } else {
                      toast1.clear()
                      Toast('支付失败')
                    }
                    console.log(res)
                  })
                  break
                case 3:
                  SHBridge.alipay(returnPayInfo, (alires: any) => {
                    const {
                      alipay_trade_app_pay_response: { code },
                    } = JSON.parse(alires.result)
                    console.log('支付成功', code, res)
                    if (code == '10000') {
                      toast1 && toast1.clear()
                      paySuccessLink(orderId)
                    }
                  })
                  break
                default:
                  Toast('支付方式有误')
                  break
              }
            }
          } else {
            Toast(msg)
          }
      console.log('res :>> ', res);
    }).catch((err)=>{
      console.log('res :>> ', err);
    })
    console.log('object :>> ', );
  }
  return (
    <div className="Order-container">
        <div className="order-count">
        <CountDown 
          time={countdowntime} 
          format="剩 mm:ss"
        />
        </div>
        <div className="order-main">
            {/* <ContactWcharCard/> */}
          <div className="preview_card">
          <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
          />
             <PreferCard tokenAmount={tokenAmount} discountAmount={discountAmount} payAmount={payAmount} />
      
          </div>
          {/* <PayTypeCard changePayType={changePayType}/> */}
          <IndentCard orderNo={orderNo}  payType={payType} orderTime={orderTime} payTime={payTime} />
          <BackCard/>
         
        </div>
        <FooterCard priceSetData={{priceNum:payAmount,preferPrice:discountAmount}} submitHandleOrder={HandleOrdersubmit}  />
    </div>
  )
}

export default OrderPaymentPage
