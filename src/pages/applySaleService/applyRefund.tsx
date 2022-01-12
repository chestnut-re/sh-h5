import React, { useState, useEffect, FC } from 'react'

import GoodsCard from '@/components/orderDetail/goodsCard'
import PreferCard from '@/components/orderDetail/preferCard'
import RefundReasonCard from '@/components/applySale/refundReasonCard'
import RefundPieceCard from '@/components/applySale/refundPieceCard'
import RefundAmountCard from '@/components/applySale/refundAmount'
import CancelTripCard from '@/components/applySale/cancelTripCard'
import RefundInstrucCard from '@/components/applySale/refundInstrucCard'
import { RefundApis } from '@/service/RefundApply'
import { Overlay, Toast } from 'react-vant'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './index.less'

/**
 * 申请退款入口
 * type 1 申请退款
 * orderId 订单id
 * refundId：退款单id 用于修改
 */

interface IndexRefundType {
  orderInfo: any
}
const RefundFailure: FC<IndexRefundType> = ({ orderInfo }) => {
  const { search } = useLocation()
  const { type, orderId,refundId } = qs.parse(search.slice(1))
  const {
    goodsName,
    id,
    updateType,
    travelStartDate,
    travelEndDate,
    adultNum,
    childNum,
    promotionalImageUrl,
    tokenAmount,
    discountAmount,
    payAmount,
  } = orderInfo

  const [showEmbedded, setShowEmbedded] = useState(false)
  //可退款数据
  const [suborderInfo, setSuborderInfo] = useState<any>({})

  const [subData, setSubData] = useState({
    adultNum: 0, //成人数量
    childNum: 0, //儿童数量
    credentialImageUrl: '',
    orderId: orderId,
    reason: '',
    remarks: '',
    ruleId: '',
    refundTokenAmount: 0,
    refundAmount: 0,
    suborderIds: [],
  })

  useEffect(() => {
    RefundApis.suborder(orderId)
      .then((res) => {
        const { code, data } = res
        if (code === '200' && data) {
          setSuborderInfo(data)
        }
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })

      if (refundId) {
        RefundApis.detail(refundId).then((res)=>{
            console.log('res :>> ', res);
        }).catch((err)=>{
          console.log('err :>> ', err);
        })
      }

  }, [])

  //提交退款申请
  const submitApplyRefund = () => {
    console.log('subData :>> ', subData)
    const { reason, remarks, adultNum,credentialImageUrl } = subData
    if (!reason) {
      Toast('请选择退款原因')
      return
    }

    if (adultNum <= 0&&childNum<=0) {
      Toast('请选择退款件数')
      return
    }

    if (!remarks) {
      Toast('请填写退款说明')
      return
    }

    console.log('resubDatasubDatasubData :>> ', subData);
      //refundId存在是编辑状态 否者是新增

    if (refundId) {
      RefundApis.edit({
        "credentialImageUrl": credentialImageUrl,
        "orderRefundId": refundId,
        "reason": reason,
        "remarks": remarks
      }).then((res)=>{
              console.log('res修改退款说明 :>> ', res);
      }).catch((err)=>{
        console.log('res修改退款说明err :>> ', err);
      })


    }else{
      RefundApis.submit(subData)
      .then((res) => {
        const { code, data } = res

        if (code === '200' && data) {
          SHBridge.jump({
            url: generateUrl(`/apply-sales?orderId=${orderId}&type=2`),
            newWebView: false,
            replace: true,
            title: '申请退款',
          })
        }

        console.log('res 提交申请:>> ', res)
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })

      console.log('object提交 :>> ')
    }

    
  }
  //处理人员数据改变
  const changeRefundNumHandle = (val) => {
    const { adultRefundList, childRefundList } = suborderInfo
    let adultRefundList_options = []
    let refundAmount = 0
    let refundTokenAmount = 0

    console.log('adultRefund>>>>>>>>List :>> ', adultRefundList)

    const adultRefund = adultRefundList ? adultRefundList.slice(0, val.adultNum) : []
    const childRefund = childRefundList ? childRefundList.slice(0, val.childNum) : []
    const aduChilList = [...adultRefund, ...childRefund]

    adultRefundList_options = aduChilList.map((item) => item.id)
    refundAmount = aduChilList.reduce((sum, w) => {
      return w.payAmount + sum
    }, 0)
    refundTokenAmount = aduChilList.reduce((sum, w) => {
      return w.tokenAmount + sum
    }, 0)

    setSubData((v) => {
      return {
        ...v,
        ...val,
        refundAmount,
        refundTokenAmount,
        suborderIds: adultRefundList_options,
      }
    })
  }

  //
  const refundInsChangeHandle = (item) => {
    setSubData((v) => {
      return {
        ...v,
        ...item,
      }
    })
  }
  //退款原因
  const onchangeReasonHandle = (item) => {
    refundInsChangeHandle(item)
  }
  //
  const onchangeCancelTripHandle = (item) => {
    const { aduList, childList } = item;
    const newArr = [...aduList,...childList]
    const Fh = newArr.map((item)=>{
      return item.id
    })

    const refundAmount = newArr.reduce((sum, w) => {
      return w.payAmount + sum
    }, 0)
    const refundTokenAmount = newArr.reduce((sum, w) => {
      return w.tokenAmount + sum
    }, 0)

    console.log('Fh :>> ', Fh);
    // return

    setSubData((v) => {
      return {
        ...v,
        adultNum: aduList.length, //成人数量
        childNum: childList.length, //儿童数量
        suborderIds: Fh,
        refundAmount,
        refundTokenAmount
      }
    })


    console.log('item :>> ', item)
  }

  return (
    <div className="refund-container">
      <div className="refund-main">
        <div className="refund-card">
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
        <RefundReasonCard onchangeReason={onchangeReasonHandle} />

        {updateType === 0 && <RefundPieceCard suborderInfo={suborderInfo} changeRefundNum={changeRefundNumHandle} />}
        {updateType === 1 && (
          <CancelTripCard suborderInfo={suborderInfo} onchangeCancelTrip={onchangeCancelTripHandle} />
        )}
        <RefundAmountCard {...subData} />
        <RefundInstrucCard refundInsChange={refundInsChangeHandle} />
        <div className="refund-btn">
          <div className="refund-btnitem" onClick={submitApplyRefund}>
            申请退款
          </div>
        </div>
      </div>
      <Overlay visible={showEmbedded}>
        <div className="refund-wrapper">
          <div className="refund-block">
            <div className="block-text">当前线路已享优惠购买，申请退款将错过本期优惠</div>
            <div className="block-content">
              <div className="block-left btn-item" onClick={() => setShowEmbedded(false)}>
                放弃优惠
              </div>
              <div className="block-right btn-item">再考虑一下</div>
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  )
}

export default RefundFailure
