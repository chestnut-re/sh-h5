import clsx from 'clsx'
import React, { useState,useEffect, FC } from 'react'
import './index.less'

/**
 * 取消出行人
 *
 */
interface CancelTripType{
  suborderInfo:any;
  onchangeCancelTrip:(val)=>void
}

const CancelTripCard: FC<CancelTripType> = ({suborderInfo,onchangeCancelTrip}) => {
  const [adultRefundList,setadultRefundList] = useState([])
  const [childRefundList,setchildRefundList] = useState([])
  useEffect(()=>{
    const {adultRefundList,childRefundList} = suborderInfo;
    console.log('[...adultRefundList,...childRefundList] :>> ', adultRefundList,childRefundList);
    if (adultRefundList) {
      setadultRefundList(adultRefundList)
    }
    if (childRefundList) {
      setchildRefundList(childRefundList)
    }
    
  },[suborderInfo])

  const selectTraveler = (index,type)=>{
    console.log('index :>> ', index);
    if (type===0) {
      setadultRefundList((v)=>{
        const nv = [...v]
        nv[index].isactive = !nv[index]["isactive"]
        return nv
      })
    }else{
      setchildRefundList((v)=>{
        
        const nv = [...v];
        const itemNv = nv[index];
        itemNv.isactive = !itemNv["isactive"]
        return nv
      })
    }
  }

  const mapActiveTrue = (arr)=>{
    console.log('arr :>> ', arr);
    return arr.filter((item)=>{
      return item.isactive
    })
  }

  useEffect(()=>{
    const aduList = mapActiveTrue(adultRefundList);
    const childList = mapActiveTrue(childRefundList);
    onchangeCancelTrip({
      aduList,
      childList
    })
  },[adultRefundList,childRefundList])

  return (
    <div className="canceltrip-card rv-hairline--top-bottom">
      <div className="canceltrip-name">取消出行人</div>
      <div className="canceltrip-select">
        {adultRefundList.map((item,index)=>{
          return (<span className={clsx("canceltrip-item",item.isactive&&'canceltrip-action')} key={item.id} onClick={()=>{selectTraveler(index,0)}} >{item.travelerName}</span>)
        })}
       {childRefundList.map((item,index)=>{
          return (<span className={clsx("canceltrip-item",item.isactive&&'canceltrip-action')} key={item.id} onClick={()=>{selectTraveler(index,1)}} >{item.travelerName}</span>)
        })}
      </div>
    </div>
  )
}

export default CancelTripCard
