import React, { useState, useEffect, FC } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'
import SubmitIntegralFooterCard from '@/components/submitBars/submitIntegralFooter'
import { OrderApi } from '@/service/OrderDetailApi'

import './privilege.less'
/**
 * 提交订单页面
 */
const PRIVI_Map = {
     1:"酒店",
     2:"交通",
     3:"餐饮",
     4:"景点",
     5:"其他"
}

const PrivilegePage: FC = (props) => {
  const { search } = useLocation()
  const { goodsPriceId, id } = qs.parse(search.slice(1))
  const [privilegeList, setPrivilegeList] = useState()
  const getDiscountApi = (id, goodsPriceId) => {
    OrderApi.getDiscount({
      id: id, // 商品ID
      goodsPriceId: goodsPriceId, //商品价格ID
    }).then((res) => {
      res.data = [
        {
          longitude: '经度',
          latitude: '纬度',
          personCurrentPrice: 2000,
          personCostPrice: 2500,
          personMarkPrice: 2300,
          childCurrentPrice: 1800,
          childCostPrice: 2300,
          childMarkPrice: 2100,
          remark: '飞不动11',
          travelType: 2,
          travelTitle: '机票',
          personDiscountAmount: 300,
          childDiscountAmount: 300,
        },
        {
          longitude: '经度',
          latitude: '纬度',
          personCurrentPrice: 2000,
          personCostPrice: 2500,
          personMarkPrice: 2300,
          childCurrentPrice: 1800,
          childCostPrice: 2300,
          childMarkPrice: 2100,
          remark: '飞不动222',
          travelType: 2,
          travelTitle: '机票',
          personDiscountAmount: 300,
          childDiscountAmount: 300,
        },
        {
          longitude: '经度',
          latitude: '纬度',
          personCurrentPrice: 2000,
          personCostPrice: 2500,
          personMarkPrice: 2300,
          childCurrentPrice: 1800,
          childCostPrice: 2300,
          childMarkPrice: 2100,
          remark: '飞不动333',
          travelType: 3,
          travelTitle: '机票',
          personDiscountAmount: 300,
          childDiscountAmount: 300,
        },
      ]
      const { code, data } = res
      const privilegeMap = new Map()
      if (code === '200' && data) {
        data.forEach((element) => {
          const isHas = privilegeMap.has(element.travelType)
          if (isHas) {
            const mapVal = privilegeMap.get(element.travelType)
            mapVal.push(element)
            privilegeMap.set(element.travelType, mapVal)
          } else {
            privilegeMap.set(element.travelType, [element])
          }
        })
        const elements:Array<any> = []

        privilegeMap.forEach((value, key) => {
          elements.push(
            <div className="privilege-item" key={key}>
              <div className="privilege-title">{PRIVI_Map[key]}</div>
              <ul className="privilege-ul">
                {value.map((item, index) => {
                  return (
                    <li className="privilege-li" key={index}>
                      <div className="li-left">{item.remark}</div>
                      <div className="li-right">
                        <span className="rightli-l">¥{item.childMarkPrice}</span>
                        <span className="rightli-c">0</span>
                        <span className="rightli-r">X2</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })
        setPrivilegeList(elements)
      }

      // obj.set("hello", 'Hello ES6!')
      // obj.has('hello')  // true
      // obj.has('word')  // false
      console.log('res优惠信息 :>> ', res)
    })
  }

  useEffect(() => {
    getDiscountApi(id, goodsPriceId)
  }, [])

  return (
    <div className="privilege-container">
      <div className="privilege-main">
        <div className="privilege-fluid">
          {privilegeList}
          <div className="privilege-nomore">没有了</div>
        </div>
      </div>
      <div className="privilege-box">
        <SubmitIntegralFooterCard />
      </div>
    </div>
  )
}

export default PrivilegePage
