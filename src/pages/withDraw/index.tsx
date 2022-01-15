import React, { useEffect, useState } from 'react'
import { NumberKeyboard, Popover, Toast } from 'react-vant'
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect'
import ask from '@/assets/img/token/ask.png'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { MyTokenService } from '@/service/MyTokenService'
import './index.less'
/**
 * 我的代币提现
 */
const WithDrawPage: React.FC = () => {
  const [myK, setMyK] = useState(0)
  const [visible, setVisible] = useState(false)
  const [dollar, setDollar] = useState()
  useEffect(() => {
    MyTokenService.getCashPage().then((res) => {
      console.log(res)
      if (res['code'] == '200') {
        if (res.data.maxCashAmount > res.data.cashableAmount) {
          setDollar(res.data.cashableAmount)
        } else {
          setDollar(res.data.maxCashAmount)
        }
      } else {
        Toast({
          message: res['msg'],
        })
      }
    }).catch((err)=>{
       Toast("系统异常")
    })
  }, [])

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
    askFor()
  }
  const onFocus = () => {
    setVisible(true)
  }
  const askFor = () => {
    if (Number(dollar) == 0) {
      Toast('没有可提现金额')
    } else if (Number(myK) == 0) {
      Toast('提现金额不能为0')
    } else if (Number(myK) > Number(dollar)) {
      Toast('已超过单次最大提现金额')
    } else {
      MyTokenService.askForWithDraw({ amount: myK*100 }).then((res) => {
        console.log(res)
        if (res['code'] == '200') {
          Toast({
            message: res['msg'],
          })
          SHBridge.jump({ url: generateUrl('/examine'), replace: true, title: '申请提现' })
        } else {
          Toast({
            message: res['msg'],
          })
        }
      })
    }
  }
  /**
   * 金额输入限制
   * @params: val接收number值
   */
  const money = (val) => {
    let num = val.toString() //先转换成字符串类型
    if (num.indexOf('.') == 0) {
      //第一位就是 .
      num = '0' + num
    }
    num = num.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
    num = num.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
    num = num.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
    if (num.indexOf('.') < 0 && num != '') {
      num = parseFloat(num)
    }
    return num
  }
  const mywellat = (e) => {
    // console.log('e', e)
    // const a = money(e)
    // console.log('e2', a)
    setMyK(e)
    // console.log(e)
  }

  return (
    <div className="WithDrawPage__root">
      <div className="header">
        <div className="title">提现金额</div>
        <div className="input-num">
          <div>¥</div>
          <input className="input" value={myK} readOnly onFocus={onFocus} onBlur={() => setVisible(false)} />
          {/* <div className="input" onClick={onFocus} onBlur={() => setVisible(false)}>
            {myK}
          </div> */}
        </div>
        <div className="text">
          {Number(dollar) > Number(myK) || Number(dollar) == Number(myK) ? (
            <div>
              {Number(dollar) == 0 ? '暂时还没有可提现金额' : `最多可提现${dollar}元`}

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
        closeButtonText="提现"
        visible={visible}
        value={myK}
        onChange={mywellat}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}

export default WithDrawPage
