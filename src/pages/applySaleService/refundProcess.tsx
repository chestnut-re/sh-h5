import React, { useState, useEffect, FC } from 'react'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { Toast } from 'react-vant'
import GoodsCard from '@/components/orderDetail/goodsCard'
import RefuIndentCard from '@/components/applySale/refuIndentCard'
import BackCard from '@/components/orderDetail/backthatCard'
import RefundProcessCard from '@/components/applySale/refundProcess'
import CompleteFooter from '@/components/submitBars/completeFooter'
import { RefundApis } from '@/service/RefundApply'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'

import './index.less'
/**
 * 退款失败入口
 * type 3 退款失败（refundFailure）
 */

interface IndexRefundType {
  orderInfo: any
}
const RefundFailure: FC<IndexRefundType> = ({ orderInfo }) => {
  const { search } = useLocation()
  const { orderId, refundId } = qs.parse(search.slice(1))

  const {
    goodsName,
    id,
    goodsId,
    travelStartDate,
    travelEndDate,
    adultNum,
    childNum,
    promotionalImageUrl,
    tokenAmount,
    discountAmount,
    payAmount,
  } = orderInfo

  const [refundList, setRefundList] = useState({
    adultNum: 0,
    amount: 0,
    applyTime: '0000-00-00',
    auditState: 0,
    childNum: 0,
    credentialImageUrl: '',
    id: 0,
    orderId: 0,
    reason: '',
    refundNo: '',
    refundState: 1,
    refundType: 0,
    remarks: '',
    ruleId: 0,
    tokenAmount: 0,
    updateTime: '',
  })

  const BarsConfig = {
    btnGroups: [
      { name: '咨询', key: 'ZX' },
      { name: '再次购买', key: 'ZCGM' },
      { name: '撤销申请', key: 'CXSQ' },
    ],
    leftBtnGroups: [{ text: '修改申请', key: 'XGSQ' }],
    onSelect: (item) => {
      const { key } = item
      switch (key) {
        case 'ZX':
          //再次购买处理
          // SHBridge.jump({
          //   url: generateUrl(`/submit-order?id=${goodsId}`),
          //   newWebView: true,
          //   replace: false,
          //   title: '提交订单',
          // })
          break
        case 'ZCGM':
          //再次购买处理
          SHBridge.jump({
            url: generateUrl(`/submit-order?id=${goodsId}`),
            newWebView: true,
            replace: false,
            title: '提交订单',
          })
          break
        case 'CXSQ':
          // FillTraveHandelfun()
          cancelRefund()
          break
        default:
          break
      }
    },
    onPopoverAction: (item) => {
      SHBridge.jump({
        url: generateUrl(`/apply-sales?id=${id}&type=1&refundId=${refundList.id}`),
        newWebView: false,
        replace: true,
        title: '修改申请',
      })
      console.log('item :>> ', item)
    },
  }

  const cancelRefund = () => {
    RefundApis.cancel({
      id: refundId,
    })
      .then((res) => {
        console.log('res :>> ', res)
        const { code, data } = res
        if (code == '200' && data) {
          Toast('撤销申请成功')
          SHBridge.jump({
            url: generateUrl(`/order-detail?orderId=${orderId}`),
            newWebView: true,
            replace: false,
            title: '订单详情',
          })
        }else{
          Toast('系统异常')
        }
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })
  }

  useEffect(() => {
    if (id) {
      getRefundApis()
    }
  }, [id])

  //获取退款单信息
  const getRefundApis = () => {
    RefundApis.RefundList(id)
      .then((res) => {
        console.log('res :>> ', res)
        const { code, data } = res
        if (code === '200') {
            const itemData = data.find(item => { return item.id == refundId })
          setRefundList(itemData)
        }
      })
      .catch((err) => {
        console.log('err :>> ', err)
      })
  }

  return (
    <div className="refund-container">
      <div className="refund-main">
        <RefundProcessCard {...refundList} />
        <div className="refund-card">
          <GoodsCard
            goodsName={goodsName}
            startDate={travelStartDate}
            endDate={travelEndDate}
            adultNum={adultNum}
            childNum={childNum}
            promotionalImageUrl={promotionalImageUrl}
            discountAmount={discountAmount}
            tokenAmount={tokenAmount}
            goodsId={goodsId}
            payAmount={payAmount}
          />
          <RefuIndentCard {...refundList} />
        </div>
        <BackCard />
      </div>
      <CompleteFooter {...BarsConfig} />
    </div>
  )
}

export default RefundFailure
