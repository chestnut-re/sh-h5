import React, { useState, useEffect, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import ManageDetail from '@/components/manageOrder/manageDetail'
import PersonalDetails from '@/components/manageOrder/personalDetails'
import { ManageOrder } from '@/service/ManageOrderApi'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './index.less'
import { Toast } from 'react-vant'
/**
 * 订单管理详情入口页面
 * 全部 待付款 待确认 已完成 退款_售后
 */

//子订单分类
const CategoryArr = (list) => {
  let flag = 0
  const data = []
  for (let i = 0; i < list.length; i++) {
    let az = 0
    for (let j = 0; j < data.length; j++) {
      const stateS = data[j][0].state
      //退款中 退款成功 退款失败 卡片拼接
      if (stateS == 5 || stateS == 6 || stateS == 7) {
        if (data[j][0].state == list[i].state) {
          flag = 1
          az = j
          break
        }
      }
    }
    if (flag == 1) {
      data[az].push(list[i])
      flag = 0
    } else if (flag == 0) {
      const wdy = []
      wdy.push(list[i])
      data.push(wdy)
    }
  }
  console.log('datadatadata', data)
  return data
}

//跳转退款性情
const manageOrderDetail = (item) => {
  console.log('item :>> ', item)
  const {orderRefundList} = item;
  if (orderRefundList) {
    SHBridge.jump({
      url: generateUrl(`/reimburse-detail?id=${orderRefundList.id}`),
      newWebView: true,
      title: '退款详情',
    })
  }
  
}
const getMaorderDetail = async (id) => {
  return new Promise<any>((resolve, reject) => {
    ManageOrder.detail({
      id,
    })
      .then((res: any) => {
        res = {
          "code": "200",
          "msg": "成功",
          "data": {
              "order": {
                  "id": 1484865057903685633,
                  "orderNo": "1484865057870499840",
                  "orderUserId": 1478560846413266944,
                  "orderUserName": "山海_952221",
                  "orderUserAvatar": null,
                  "goodsId": 1484150418656428032,
                  "goodsName": "禅意无锡三日游",
                  "travelId": null,
                  "promotionalImageUrl": "https://test-travel-cdn.mountainseas.cn/img/user/pic/93bcbb7be554472b91e7fb5dc158aebd.png?e=1642843988&token=IMUMeSLOscxaU8BzDOQtuJQ5yyqEsOdDI_Ma5CQi:UrnTDwfC61BE3YqdLqshgZAbRLQ=",
                  "adultNum": 1,
                  "childNum": 0,
                  "payAmount": 2240000,
                  "orderTime": "2022-01-22 20:26:32",
                  "payTime": "2022-01-22 20:26:44",
                  "state": 3,
                  "refundAmount": null,
                  "refundAdultNum": null,
                  "refundChildNum": null,
                  "countDownTimes": null,
                  "endTime": "2022-01-22 20:31:32"
              },
              "suborders": [
                  {
                      "id": 1484865058012737537,
                      "orderId": null,
                      "suborderNo": "1484865057975357440",
                      "originPrice": null,
                      "discountAmount": null,
                      "insuranceAmount": null,
                      "tokenAmount": null,
                      "activityTotalAmount": null,
                      "payAmount": 2240000,
                      "state": 4,
                      "refundState": null,
                      "travelerId": 1484458955995578368,
                      "travelerType": 1,
                      "travelerName": "胡罡云",
                      "travelerRelation": null,
                      "travelerPhoneAreaCode": null,
                      "travelerPhoneNumber": null,
                      "travelerCertificateType": null,
                      "travelerCertificateNo": null,
                      "habitualResidence": null,
                      "address": null,
                      "emerName": null,
                      "emerTravelerRelation": null,
                      "emerPhoneAreaCode": null,
                      "emerPhoneNumber": null,
                      "createTime": "2022-01-22 20:26:32",
                      "updateTime": "2022-01-22 20:26:32",
                      "isVerified": null,
                      "verifyUserId": null,
                      "verifyTime": null,
                      "payTime": null,
                      "refundTime": null,
                      "orderRefundList": {
                          "id": 10,
                          "refundNo": "1481556141795409920",
                          "orderId": 1484865058012737537,
                          "refundType": 2,
                          "refundState": 1,
                          "auditState": 0,
                          "amount": 10,
                          "tokenAmount": 0,
                          "reason": "七天无理由退款",
                          "remarks": "也吧",
                          "adultNum": 1,
                          "childNum": 0,
                          "ruleId": null,
                          "credentialImageUrl": "",
                          "applyTime": "2022-01-13T09:18:05.000+00:00",
                          "updateTime": "2022-01-13T09:18:05.000+00:00"
                      }
                  },
                  {
                    "id": 1484865058012737537,
                    "orderId": null,
                    "suborderNo": "1484865057975357440",
                    "originPrice": null,
                    "discountAmount": null,
                    "insuranceAmount": null,
                    "tokenAmount": null,
                    "activityTotalAmount": null,
                    "payAmount": 2240000,
                    "state": 6,
                    "refundState": null,
                    "travelerId": 1484458955995578368,
                    "travelerType": 1,
                    "travelerName": "胡罡云",
                    "travelerRelation": null,
                    "travelerPhoneAreaCode": null,
                    "travelerPhoneNumber": null,
                    "travelerCertificateType": null,
                    "travelerCertificateNo": null,
                    "habitualResidence": null,
                    "address": null,
                    "emerName": null,
                    "emerTravelerRelation": null,
                    "emerPhoneAreaCode": null,
                    "emerPhoneNumber": null,
                    "createTime": "2022-01-22 20:26:32",
                    "updateTime": "2022-01-22 20:26:32",
                    "isVerified": null,
                    "verifyUserId": null,
                    "verifyTime": null,
                    "payTime": null,
                    "refundTime": null,
                    "orderRefundList": {
                        "id": 10,
                        "refundNo": "1481556141795409920",
                        "orderId": 1484865058012737537,
                        "refundType": 2,
                        "refundState": 1,
                        "auditState": 0,
                        "amount": 10,
                        "tokenAmount": 0,
                        "reason": "七天无理由退款",
                        "remarks": "也吧",
                        "adultNum": 1,
                        "childNum": 0,
                        "ruleId": null,
                        "credentialImageUrl": "",
                        "applyTime": "2022-01-13T09:18:05.000+00:00",
                        "updateTime": "2022-01-13T09:18:05.000+00:00"
                    }
                }
              ]
          },
          "success": true
      }
        let { code, data } = res
        if (code == '200') {
          resolve(data)
        } else {
          reject(data)
          Toast('系统异常')
        }
      })
      .catch((err) => {
        new Error(err)
        Toast('系统异常')
      })
  })
}
const MaorderDetailPage: FC = () => {
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))

  const [isinclude, setisinclude] = useState(true)

  const [details, setDetails] = useState({
    order: {},
    suborders: [],
  })

  const onLoadMaorderDetail = async () => {
    const data = await getMaorderDetail(id)
    //是不是都没有填写出行人信息
    const isclude = data.suborders.every((item) => {
      return !item.travelerName
    })
    setisinclude(isclude)

    data.suborders = CategoryArr(data.suborders)
    setDetails(data)
  }

  const maoRderToChart = () => {
    const { orderUserId } = details.order
    if (SHBridge.isLogin()) {
      if (orderUserId) {
        SHBridge.toChat(orderUserId)
      } else {
        Toast('信息有误，请稍后再试')
        return
      }
    } else {
      SHBridge.login()
    }
  }

  useEffect(() => {
    onLoadMaorderDetail()
    SHBridge.setNavBgColor('#7495ee')
    SHBridge.setTitleColor('#fff')
  }, []) // eslint-disable-line

  return (
    <div className="MaorderDetail-container">
      <div className="maorderDetail-container-content">
        <ManageDetail {...details.order} />
        {details?.suborders.length && !isinclude ? (
          <div className="maorder-list">
            {details.suborders.map((item, index) => {
              return (
                <div className="maorder-list-item" key={index}>
                  <PersonalDetails subordersitem={item} changeOrderDetail={manageOrderDetail} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="maorder-text">未填写出行人信息，请及时联系用户填写</div>
        )}
      </div>
      <div className="maorderDetail-box">
        <div className="maorderDetail-btn" onClick={maoRderToChart}>
          联系
        </div>
      </div>
    </div>
  )
}

export default MaorderDetailPage
