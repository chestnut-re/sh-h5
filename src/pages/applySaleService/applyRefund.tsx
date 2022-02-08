import React, { useState, useEffect, FC } from 'react'
import clsx from 'clsx'
import GoodsCard from '@/components/orderDetail/goodsCard'
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
const RefundFailure: FC<IndexRefundType> = ({
  orderInfo: {
    goodsName,
    goodsId,
    updateType,
    travelStartDate,
    travelEndDate,
    adultNum,
    childNum,
    promotionalImageUrl,
    tokenAmount,
    discountAmount,
    payAmount,
    travelId,
  },
}) => {
  const { search } = useLocation()
  const { orderId, refundId } = qs.parse(search.slice(1))

  const [showEmbedded, setShowEmbedded] = useState(false)
  //可退款数据
  const [suborderInfo, setSuborderInfo] = useState<any>({})
  //编辑默认值
  const [defaultValueInfo, setDefaultValueInfo] = useState<any>({
    isedit: false, //是否编辑
    adultNum: 0, //成人数量
    childNum: 0, //儿童数量
  })
  //退款回显数据
  const [refundInfo, setRefundInfo] = useState<any>()
  const [subData, setSubData] = useState({
    adultNum: 0, //成人数量
    childNum: 0, //儿童数量
    credentialImageUrl: '',
    orderId: orderId,
    reason: '',
    remarks: '',
    ruleId: '',
    suborderIds: [],
  })

  useEffect(() => {
    //非编辑状态下 判断订单是否享受优惠有优惠弹框阻止
    if (discountAmount > 0) {
      setShowEmbedded(true)
    }
  }, [discountAmount])

  useEffect(() => {
    SHBridge.setTitle(`申请退款`)
    if (refundId) {
      //根据退款单Id获取退款人员信息
      RefundApis.detail(refundId)
        .then((res) => {
          console.log('res :>> ', res)
          const { code, data } = res
          if (code === '200' && data) {
            const adultList = data.filter((item) => {
              return item.travelerType == 1
            })
            const childList = data.filter((item) => {
              return item.travelerType == 0
            })
            setSuborderInfo({
              adultNum: adultList.length,
              adultRefundList: [...adultList],
              childNum: childList.length,
              childRefundList: [...childList],
            })

            setDefaultValueInfo({
              isedit: true,
              adultNum: adultList.length,
              childNum: childList.length,
            })

            const refundAmount = data.reduce((sum, w) => {
              return w.payAmount + sum
            }, 0)
            const refundTokenAmount = data.reduce((sum, w) => {
              const { tokenAmount } = w
              if (tokenAmount) {
                return tokenAmount + sum
              }
            }, 0)

            setRefundInfo((v) => {
              return {
                ...v,
                refundAmount: isNaN(refundAmount) ? 0 : refundAmount,
                refundTokenAmount: isNaN(refundTokenAmount) ? 0 : refundTokenAmount,
              }
            })
          }
        })
        .catch((err) => {
          console.log('err :>> ', err)
        })

      //获取退款单信息
      RefundApis.RefundList(orderId)
        .then((res) => {
          console.log('res :>> ', res)
          const { code, data } = res
          if (code === '200') {
            const itemData = data.find((item) => {
              return item.id == refundId
            })
            console.log('itemData<><<<<<<<<<<<<<<<<<<<< :>> ', itemData)
            setSubData((v) => {
              return {
                ...v,
                ...itemData,
              }
            })
            setRefundInfo((v) => {
              return {
                ...v,
                ...itemData,
              }
            })
            // setRefundList(itemData)
          }
        })
        .catch((err) => {
          console.log('err :>> ', err)
        })
    } else {
      RefundApis.suborder(orderId)
        .then((res) => {
          console.log('data满足条件人员 :>> ', res)
          const { code, data } = res
          if (code === '200' && data) {
            setSuborderInfo(data)
          }
        })
        .catch((err) => {
          console.log('err :>> ', err)
        })
    }
  }, [])

  //提交退款申请
  const submitApplyRefund = () => {
    const { reason, remarks, adultNum, credentialImageUrl, childNum } = subData
    if (!reason) {
      Toast('请选择退款原因')
      return
    }
    if (!refundId) {
      if (adultNum <= 0 && childNum <= 0) {
        Toast('请选择退款件数')
        return
      }
    }

    if (!remarks) {
      Toast('请填写退款说明')
      return
    }

    console.log('resubDatasubDatasubData :>> ', subData)
    //refundId存在是编辑状态 否者是新增

    if (refundId) {
      RefundApis.edit({
        credentialImageUrl: credentialImageUrl,
        orderRefundId: refundId,
        reason: reason,
        remarks: remarks,
      })
        .then((res) => {
          const { code, data } = res
          //  return
          if (code === '200' && data) {
            const { id } = data
            SHBridge.jump({
              url: generateUrl(`/apply-sales?orderId=${orderId}&type=2&refundId=${refundId}`),
              newWebView: false,
              replace: true,
              title: '申请退款',
            })
          } else {
            Toast('修改失败')
          }
        })
        .catch((err) => {
          Toast('服务异常')
        })
    } else {
      RefundApis.submit(subData)
        .then((res) => {
          const { code, data } = res
          //  return
          if (code === '200' && data) {
            // const { id } = data
            console.log('res :>> ', res)

            SHBridge.jump({
              url: generateUrl(`/apply-sales?orderId=${orderId}&type=2&refundId=${data.id}`),
              newWebView: false,
              replace: true,
              title: '申请退款',
            })
          }
        })
        .catch((err) => {
          console.log('err :>> ', err)
        })
    }
  }
  //处理人员数据改变
  const changeRefundNumHandle = (val) => {
    console.log('val :>> ', val)
    const { adultRefundList, childRefundList } = suborderInfo
    let adultRefundList_options = []
    let refundAmount = 0
    let refundTokenAmount = 0

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
    console.log('itemitemitemitem已选人员 :>> ', item)
    const { aduList, childList } = item
    const newArr = [...aduList, ...childList]
    const Fh = newArr.map((item) => {
      return item.id
    })

    const refundAmount = newArr.reduce((sum, w) => {
      return w.payAmount + sum
    }, 0)
    const refundTokenAmount = newArr.reduce((sum, w) => {
      return w.tokenAmount + sum
    }, 0)

    console.log('Fh :>> ', Fh)
    // return

    setSubData((v) => {
      return {
        ...v,
        adultNum: aduList.length, //成人数量
        childNum: childList.length, //儿童数量
        suborderIds: Fh,
        refundAmount,
        refundTokenAmount,
      }
    })

    console.log('item :>> ', item)
  }

  //考虑一下
  const backConsider = () => {
    SHBridge.jump({
      url: generateUrl(`/order-detail?orderId=${orderId}`),
      newWebView: false,
      replace: true,
      title: '订单详情',
    })
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
            travelId={travelId}
            goodsId={goodsId}
            payAmount={payAmount}
            tokenAmount={tokenAmount}
            discountAmount={discountAmount}
          />
        </div>
        <RefundReasonCard onchangeReason={onchangeReasonHandle} defaultValue={refundInfo} />
        <div className={clsx(defaultValueInfo.isedit && 'refund-dis')}>
          {updateType === 0 && (
            <RefundPieceCard
              defaultValue={defaultValueInfo}
              suborderInfo={suborderInfo}
              changeRefundNum={changeRefundNumHandle}
            />
          )}
          {updateType === 1 && (
            <CancelTripCard suborderInfo={suborderInfo} onchangeCancelTrip={onchangeCancelTripHandle} />
          )}
        </div>
        <RefundAmountCard {...subData} defaultValue={refundInfo} />
        <RefundInstrucCard refundInsChange={refundInsChangeHandle} defaultValue={refundInfo} />
        <div className="refund-btn">
          <div className="refund-btnitem" onClick={submitApplyRefund}>
            申请退款
          </div>
        </div>
      </div>
      <Overlay visible={showEmbedded && !defaultValueInfo.isedit}>
        <div className="refund-wrapper">
          <div className="refund-block">
            <div className="block-text">当前线路已享优惠购买，申请退款将错过本期优惠</div>
            <div className="block-content">
              <div className="block-left btn-item" onClick={() => setShowEmbedded(false)}>
                放弃优惠
              </div>
              <div className="block-right btn-item" onClick={backConsider}>
                再考虑一下
              </div>
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  )
}

export default RefundFailure
