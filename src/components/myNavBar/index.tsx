import { isApp } from '@/jsbridge/env'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import { NavBar } from 'react-vant'
import { NavBarProps } from 'react-vant/es/nav-bar'
import './index.less'
import Cookies from 'js-cookie'
import { AppBridge } from '@/jsbridge/app'
const MyNavBar: FC<NavBarProps> = (props: NavBarProps) => {
  let status = 0 // 0:还没数据，-1:不支持，1:支持
  const [safaArea, setSafeArea] = useState(true)
  const [safeAreaTopValue, setSafeAreaTopValue] = useState(0)
  /**
   * 判断当前设置是否支持constant(safe-area-inset-top)或env(safe-area-inset-top)；
   * 部分Android设备，可以认识safa-area-inset-top，但会将其识别为0
   * @returns {boolean} 当前设备是否支持安全距离
   */

  useEffect(() => {
    if (props.safeAreaInsetTop) {
      if (isApp()) {
        setTimeout(() => {
          getAppAreaTop()
        }, 0)
      } else {
        setTimeout(() => {
          setSafeArea(supportSafeArea())
        }, 0)
      }
    }
  }, [])

  const getAppAreaTop = () => {
    const flutterWidth = Cookies.get('app_clientWidth')
    const safeAreaTop = Cookies.get('safeAreaTop')
    AppBridge.showToast(flutterWidth || '')
    const width = document.body.clientWidth
    setSafeAreaTopValue(Number(safeAreaTop) / (Number(flutterWidth) / width))
  }

  const supportSafeArea = (): boolean => {
    if (status !== 0) {
      // 缓存数据，只向 body 插入一次 dom 即可
      return status === 1
    }
    const div = document.createElement('div')
    const id = 'test-check-safe-area'
    const styles = [
      'position: fixed',
      'z-index: -1',
      'height: constant(safe-area-inset-top)',
      'height: env(safe-area-inset-top)',
    ]
    div.style.cssText = styles.join(';')
    div.id = id
    document.body.appendChild(div)
    const areaDiv = document.getElementById(id)
    if (areaDiv) {
      status = areaDiv.offsetHeight > 0 ? 1 : -1 // 该 div 的高度是否为 0
      areaDiv.parentNode?.removeChild(areaDiv)
    }
    return status === 1
  }
  //合并class
  const classNames = (className: string, MapName: Record<string, boolean>) => {
    let classNames = className
    for (const item in MapName) {
      if (MapName[item]) {
        classNames = classNames + ' ' + item
      }
    }
    return classNames
  }
  return (
    <div
      className={classNames('MyNavBar', {
        'MyNavBar-top': !safaArea, // 不支持时，需要额外设置属性
      })}
      style={safeAreaTopValue > 0 ? { paddingTop: safeAreaTopValue + 'px' } : {}}
    >
      <NavBar
        title={props.title}
        safeAreaInsetTop={isApp() ? false : props.safeAreaInsetTop}
        leftArrow={props.leftArrow}
        border={props.border}
        rightText={props.rightText}
        onClickLeft={props.onClickLeft}
        onClickRight={props.onClickRight}
      />
    </div>
  )
}

export default MyNavBar
