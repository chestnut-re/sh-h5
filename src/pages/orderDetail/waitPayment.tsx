import React, { useState, useEffect, FC } from 'react'
import dayjs from 'dayjs'
import { CountDown } from 'react-vant'
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
let reloadNum = 0
interface OrderPaymentType {
  promotionalImageUrl: string
  goodsName: string
  travelStartDate: string
  travelEndDate: string
  adultNum: number
  childNum: number
  tokenAmount: number
  discountAmount: number
  payAmount: number
  orderNo: string
  payType: string
  orderTime: string
  payTime: string
  id: string
  goodsId: string
  travelId: string
  residueTime:number
  reloadOrder: () => void
}
const OrderPaymentPage: FC<OrderPaymentType> = ({
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
  goodsId,
  travelId,
  residueTime,
  reloadOrder,
}) => {
  

  const [isorderId,setisorderId] = useState()


  const countDownStops = () => {
    if (reloadNum <= 1) {
      console.log('object 倒计时结束:>> ')
      reloadNum++
      reloadOrder()
    }
  }

  //支付成功跳转
  const paySuccessLink = (orderId) => {
    SHBridge.jump({
      url: generateUrl(`/pay-success?orderId=${orderId}`),
      newWebView: false,
      replace: true,
      title: '支付成功',
    })
  }
  useEffect(()=>{
    //0是前台 1切换中 2后台
    /**
     * 
     * @param type 0是前台 1切换中 2后台
     * 监听来自APP的回调支付成功并且回到当前页面跳转到订单确认页
     */
    window.changeAppLifecycleState = (type)=>{
        console.log('objectypetypet :>> ', type);
        if(type === 0&&isorderId){
          paySuccessLink(isorderId)
        }
    }
  },[])

  const HandleOrdersubmit = () => {
    const toast1 = Toast.loading({
      message: '订单生成中...',
      forbidClick: true,
      duration: 0,
    })
    OrderApi.toPay({
      orderId: id,
    })
      .then((res: any) => {
        const { code, msg, data } = res
        if (code == '200' && data) {
          if (data.code == '200') {
            const { returnPayInfo, payType, orderId } = data.data;
            setisorderId(orderId)
            switch (payType) {
              case 1:
                toast1 && toast1.clear()
                // SHBridge.minipay(JSON.stringify(data), 1)
                SHBridge.minipay(JSON.stringify(returnPayInfo), payAmount, orderId)
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
                  console.log('支付宝回调', alires)
                  const { memo, result, resultStatus } = alires
                  if (result || resultStatus == '9000') {
                    const {
                      alipay_trade_app_pay_response: { code },
                    } = JSON.parse(result)
                    console.log('支付成功', code, res)
                    if (code == '10000') {
                      toast1 && toast1.clear()
                      paySuccessLink(orderId)
                    }
                  } else {
                    Toast(memo)
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
        console.log('res :>> ', res)
      })
      .catch((err) => {
        console.log('res :>> ', err)
      })
    console.log('object :>> ')
  }
  return (
    <div className="Order-container">
      <div className="order-count">
        <CountDown
          time={residueTime}
          onFinish={() => {
            countDownStops()
          }}
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
            goodsId={goodsId}
            discountAmount={discountAmount}
            payAmount={payAmount}
            travelId={travelId}
            tokenAmount={tokenAmount}
          />
          {/* <PreferCard tokenAmount={tokenAmount}
            adultNum={adultNum}
            goodsId={goodsId}
            childNum={childNum}
            travelId={travelId}
            discountAmount={discountAmount}
            payAmount={payAmount} /> */}
        </div>
        <IndentCard orderNo={orderNo} payType={payType} orderTime={orderTime} payTime={payTime} />
        <BackCard />
      </div>
      <FooterCard
        priceSetData={{ priceNum: payAmount, preferPrice: discountAmount }}
        submitHandleOrder={HandleOrdersubmit}
      />
    </div>
  )
}

export default OrderPaymentPage
