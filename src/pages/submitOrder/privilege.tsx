import React, { useState, useEffect, FC } from 'react'
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
interface PrivType{
  id:string|number;
  goodsPriceId:string;
  stepperData:any;
}

const PrivilegePage: FC<PrivType> = (props) => {
  const { goodsPriceId, id,stepperData:{adultNum,childNum,intNum} } = props;
  const [privilegeList, setPrivilegeList] = useState()
  const getDiscountApi = (id, goodsPriceId) => {
    OrderApi.getDiscount({
      id: id, // 商品ID
      goodsPriceId: goodsPriceId, //商品价格ID
    }).then((res:any) => {
      const { code, data } = res
      const privilegeMap = new Map()
      if (code === '200' && data&&data.length>0) {
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
                        <span className="rightli-c">¥{item.personCurrentPrice}</span>
                        <span className="rightli-r">X{adultNum+childNum}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })
        setPrivilegeList(elements)
      }else{
        setPrivilegeList(<div className="privilege-nomore">暂无优惠</div>)
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
        </div>
      </div>
    </div>
  )
}

export default PrivilegePage
