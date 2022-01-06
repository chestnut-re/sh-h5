import React, { useState,useEffect, FC } from 'react'

import './index.less'
interface StepperRuiType {
    max:number|string,
    min:number,
    value:number,
    changeValue:(val)=>void
}

const StepperRuiCard: FC<StepperRuiType> = ({max = 1000, min = 1,changeValue,value}) => {

  // 操作对值的加减操作
  const handleStep = (value, type) => {
    value = type == '+' && value + 1 <= max ? value + 1 : type == '-' && value - 1 > min ? value - 1 : value
    changeValue(value)
  }
  // 获取输入值的操作
  const getValue = (e) => {
      console.log('e :>> ', e);
    let value = e.detail
    value = value.replace(/[^\d]/g, '')
    value = value < min ? min : value > max ? max : value
    changeValue(value)
  }
  const getChangeValue = (e)=>{
    console.log('e :>> ', e);
    value = e.target.value;
  }
  return (
    <div className="rui-flex-ac rui-fa" onClick={(e) => e.stopPropagation()}>
      <span className="rui-icon rui-icon-minus " onClick={()=>{handleStep(value, '-')}}></span>
      <input className="rui-stepper-input" value={value} onChange={getChangeValue} onBlur={getValue}></input>
      <span className="rui-icon rui-icon-plus" onClick={()=>{handleStep(value, '+')}}></span>
    </div>
  )
}

export default StepperRuiCard