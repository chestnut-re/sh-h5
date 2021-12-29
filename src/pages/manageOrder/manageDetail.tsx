import React, { useState, useEffect, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import ManageDetail from '@/components/manageOrder/manageDetail'
import PersonalDetails from '@/components/manageOrder/personalDetails'
import { ManageOrder } from '@/service/ManageOrderApi'

import './index.less'
/**
 * 订单管理详情入口页面
 * 全部 待付款 待确认 已完成 退款_售后
 */

//测试数据
// const Des = [
//   {
//     id: '12312312',
//     suborderNo: '1345 99839 0000',
//     state: 1,
//     travelerId: '2131312',
//     travelerName: '李康',
//     travelerType: 0,
//     travelerRelation: 0,
//     travelerPhoneAreaCode: '+86',
//     travelerPhoneNumber: '135675567766',
//     travelerCertificateType: '',
//     travelerCertificateNo: '',
//     emerName: 'asdas',
//   }
// ]

//子订单分类
const CategoryArr = (list)=>{

  let flag = 0;
  const data = [];
  for (let i = 0; i < list.length; i++) {
    let az = 0
    for (let j = 0; j < data.length; j++) {
      if (data[j][0].state == list[i].state) {
        flag = 1
        az = j
        break
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
  console.log("datadatadata",data)
  return data
}



const getMaorderDetail = async (id) => {
  return new Promise<any>((resolve, reject) => {
    ManageOrder.detail({
      id,
    })
      .then((res: any) => {
        let { code, data } = res
        if (code == '200') {
          resolve(data)
        } else {
          reject(data)
        }
      })
      .catch((err) => {
        new Error(err)
      })
  })
}
const MaorderDetailPage: FC = () => {
  const { search } = useLocation()
  const { id } = qs.parse(search.slice(1))

  const [details, setDetails] = useState({
    order: {},
    suborders: [],
  })

  const onLoadMaorderDetail = async () => {
    const data = await getMaorderDetail(id)
    data.suborders = CategoryArr(data.suborders)
    setDetails(data)
  }

  useEffect(() => {
    onLoadMaorderDetail()

  }, [])// eslint-disable-line

  return (
    <div className="MaorderDetail-container">
      <div className="maorderDetail-container-content">
        <ManageDetail {...details.order} />
        {details?.suborders.length ? (
          <div className="maorder-list">
            {details.suborders.map((item,index) => {
              return (
                <div className="maorder-list-item" key={index}>
                  <PersonalDetails subordersitem={item} />
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MaorderDetailPage
