import React, { useState, useEffect, FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import ManageDetail from '@/components/manageOrder/manageDetail'
import PersonalDetails from '@/components/manageOrder/personalDetails'
import { ManageOrder } from '@/service/ManageOrderApi'
import { SHBridge } from '@/jsbridge'
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
      const stateS = data[j][0].state;
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
    SHBridge.setNavBgColor('#7495ee')
    SHBridge.setTitleColor('#fff')
  }, []) // eslint-disable-line

  return (
    <div className="MaorderDetail-container">
      <div className="maorderDetail-container-content">
        <ManageDetail {...details.order} />
        {details?.suborders.length ? (
          <div className="maorder-list">
            {details.suborders.map((item, index) => {
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
