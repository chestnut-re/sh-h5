import React, { useState, useEffect, FC } from 'react'
import clsx from 'clsx'
import './index.less'
interface StepperRuiType {
  max: number | string
  min: number
  value: number
  changeValue: (val) => void
}
/**
 * 步进器
 * 
 */

const StepperRuiCard: FC<StepperRuiType> = ({ max = 99, min = 0, changeValue, value }) => {
  const [current, setCurrent] = useState(() => value)
  // 操作对值的加减操作
  const handleStep = (value, type) => {
    value = value * 1
    value = type == '+' && value + 1 <= max ? value + 1 : type == '-' && value - 1 >= min ? value - 1 : value
    changeValue(value)
    setCurrent(value)
  }
  useEffect(()=>{
    setCurrent(value)
  },[value])

  // 获取输入值的操作
  const getValue = (e) => {
    console.log('e :>> ', e)
    let value = e.target.value
    value = value.replace(/[^\d]/g, '')
    value = value < min ? min : value > max ? max : value;
    value = value !== null && value !== "" ? value : min
    changeValue(value)
    setCurrent(value)
  }
  const getChangeValue = (event) => {
    console.log('e :>> ', event)
    const input = event.target as HTMLInputElement
    let { value } = input
    // value = value;
    value = value.replace(/[^\d]/g, '')
    setCurrent(value)
    console.log('object :>> ', value)
  }
  return (
    <div className="rui-flex-ac rui-fa" onClick={(e) => e.stopPropagation()}>
      <span
        className={clsx('rui-icon rui-icon-minus', { 'rui-plus-disabled': min >= current })}
        onClick={() => {
          handleStep(current, '-')
        }}
      ></span>
      <input className="rui-stepper-input" type="tel" value={current} onChange={getChangeValue} onBlur={getValue}></input>
      <span
        className={clsx('rui-icon rui-icon-plus', { 'rui-plus-disabled': max <= current })}
        onClick={() => {
          handleStep(current, '+')
        }}
      ></span>
    </div>
  )
}

export default StepperRuiCard
