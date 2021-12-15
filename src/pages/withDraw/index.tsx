import React, { useEffect, useState } from 'react'
import { NumberKeyboard, Popover, Toast } from 'react-vant'
import './index.less'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import ask from '@/assets/img/token/ask.png'
import { number } from 'echarts'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
/**
 * 我的代币提现
 */
const WithDrawPage: React.FC = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedIndex2, setSelectedIndex2] = useState(0)
  const [myK, setMyK] = useState('')
  const [visible, setVisible] = useState(false)
  const [dollar, setDollar] = useState(2000)
  // useEffect(() => {
  //   console.log(props.match.params.type)
  //   window.addEventListener('scroll', onScroll)
  //   return () => {
  //     window.removeEventListener('scroll', onScroll)
  //   }
  // }, [])

  // useDebouncedEffect(
  //   () => {
  //    setSelectedIndex2(selectedIndex)
  //   },
  //   [selectedIndex],
  //   200
  // )

  const toDetailed = () => {
    SHBridge.jump({ url: generateUrl('/detailed'), newWebView: true, title: '收支明细' })
    // window.location.href = '/detailed'
  }
  const toExamine = () => {
    SHBridge.jump({ url: generateUrl('/examine'), replace: true, title: '申请提现' })
  }
  const onFocus = () => {
    setVisible(true)
  }
  return (
    <div className="WithDrawPage__root">
      <div className="header">
        <div className="title">提现金额</div>
        <div className="input-num">
          <div>¥</div>
          {/* <input value={myK} type="" placeholder="请输入提现金额" onFocus={onFocus} onBlur={() => setVisible(false)} /> */}
          <div className="input" onClick={onFocus} onBlur={() => setVisible(false)}>
            {myK}
          </div>
        </div>
        <div className="text">
          {Number(myK) < dollar ? (
            <div>
              最多可提现{dollar}元
              <Popover
                className="popover"
                placement="bottom-start"
                theme="dark"
                // eslint-disable-next-line react/no-children-prop
                children="如果有疑问请联系业务员！"
                offset={[-5, 8]}
                reference={<img className="img" src={ask} alt="" />}
              />
            </div>
          ) : (
            <div style={{ color: '#FD7D81' }}>输入金额超过可提现金额</div>
          )}
        </div>
      </div>
      <div className="show-hide" style={visible ? { display: 'none' } : {}}>
        <div className="card">
          <button onClick={toExamine}>申请提现</button>
        </div>
        <div className="see" onClick={toDetailed}>
          查看明细
        </div>
      </div>

      <NumberKeyboard
        theme="custom"
        extraKey="."
        closeButtonText="提现"
        visible={visible}
        hideOnClickOutside
        value={myK}
        onChange={setMyK}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}

export default WithDrawPage
