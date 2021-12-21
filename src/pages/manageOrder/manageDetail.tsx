import React, { useState, useEffect, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'querystring'
import ManageDetail from '@/components/manageOrder/manageDetail'
import PersonalDetails from '@/components/manageOrder/personalDetails'
import { ManageOrder } from '@/service/ManageOrder'

import './index.less'
/**
 * 订单管理详情入口页面
 * 全部 待付款 待确认 已完成 退款_售后
 */
const getMaorderDetail = async (id) => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: '200',
        msg: '系统异常',
        data: {
          order: {
            id: '61ada7754e147767542fb6fd',
            orderNo: '2356 2163 6734 9045',
            orderTime: '2021-12-21 15:45:30',
            state: 1,
            orderUserId: '2349283949',
            orderUserName: '康姆士',
            goodsId: '12233234223',
            goodsName: '北京环球影城一日游（7大玩乐主题北环球影游…',
            adultNum: 2,
            childNum: 2,
            payAmount: 1998,
          },
          suborders: [
            {
              id: '61ae278d4e14774b727fad52',
              suborderNo: '3523 8982 9048 9999',
              state: 1,
              travelerId: 'q88ew9r9',
              travelerName: '张某某',
              travelerType: 1,
              travelerRelation: '1',
              travelerPhoneAreaCode: '+86',
              travelerPhoneNumber: '13693080115',
              travelerCertificateType: 1,
              travelerCertificateNo: '411528199212173057',
              emerName: '李紧急',
              emerTravelerRelation: 3,
              emerPhoneAreaCode: '+86',
              emerPhoneNumber: '13693000123',
            },
            {
              id: '61ad750c4e14775e2e501738',
              suborderNo: '3523 8982 9048 9999',
              state: 1,
              travelerId: 'q88ew9r9',
              travelerName: '张订单',
              travelerType: 0,
              travelerRelation: '1',
              travelerPhoneAreaCode: '+86',
              travelerPhoneNumber: '13693080115',
              travelerCertificateType: 1,
              travelerCertificateNo: '411528199212173057',
              emerName: '王紧急',
              emerTravelerRelation: 3,
              emerPhoneAreaCode: '+86',
              emerPhoneNumber: '13693000123',
            },
          ],
        },
      })
    }, 1200)
  }).finally(() => {
    console.log('object :>>请求处理完了 ')
  })

  // ManageOrder.detail({
  //     id
  // })
  //   .then((res: any) => {
  //     console.log('object接口请求数据 :>> ', res)
  //     let { code, data } = res
  //     if (code == '200') {
  //       return data
  //     } else {
  //       new Error(res)
  //     }
  //   })
  //   .catch((err) => {
  //     new Error(err)
  //   })
}
const MaorderDetailPage: FC = () => {
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))

  const [details, setDetails] = useState({
    order: {},
    suborders: [],
  })

  console.log('object :>> ', search)

  useEffect(async () => {
    const { data } = await getMaorderDetail(id)
    console.log('abs :>> ', data)
    setDetails(data)
  }, [])

  return (
    <div className="MaorderDetail-container">
      <ManageDetail order={{ ...details.order }} />
      <div className="maorder-list">
        {details.suborders.map((item) => {
          return (
            <div className="maorder-list-item" key={item.id}>
              <PersonalDetails subordersitem={item} />
            </div>
          )
        })}
      </div>
      <div className="contact-btn">
        <div className="contact-bitem">联系</div>
      </div>
    </div>
  )
}

export default MaorderDetailPage
