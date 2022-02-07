import React, { useEffect, useState } from 'react'
import { Popover, Field, Toast } from 'react-vant'
import ask from '@/assets/img/token/ask.png'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { MyTokenService } from '@/service/MyTokenService'
import './index.less'
/**
 * 我的代币提现
 */
const WithDrawPage: React.FC = () => {
  const [amounts, setAmounts] = useState('')
  const [visible, setVisible] = useState(false)
  const [dollar, setDollar] = useState()
  useEffect(() => {
    MyTokenService.getCashPage()
      .then((res) => {
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
      })
      .catch((err) => {
        Toast('系统异常')
      })
  }, [])

  const toDetailed = () => {
    SHBridge.jump({ url: generateUrl('/detailed?type=2'), newWebView: false, title: '提现明细' })
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
    } else if (Number(amounts) == 0) {
      Toast('提现金额不能为0')
    } else if (Number(amounts) > Number(dollar)) {
      Toast('已超过单次最大提现金额')
    } else {
      MyTokenService.askForWithDraw({ amount: amounts * 1000 }).then((res) => {
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
    setAmounts(e)
  }

  return (
    <div className="WithDrawPage__root">
      <div className="header">
        <div className="title">提现金额</div>
        <div className="input-num">
          <div className="withdraw-icon">¥</div>
          <Field
            labelWidth="0"
            className="input"
            value={amounts}
            type="number"
            maxlength={9}
            placeholder="请输入提现金额"
            onChange={mywellat}
            label=""
            formatter={money}
            onFocus={onFocus}
            onBlur={() => setVisible(false)}
          />
        </div>
        <div className="text">
          {Number(dollar) > Number(amounts) || Number(dollar) == Number(amounts) ? (
            <div>
              {Number(dollar) == 0 ? '暂时还没有可提现金额' : `最多可提现${dollar ? dollar / 1000 : 0}元`}

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
      <div className="show-hide">
        <div className="card">
          <button onClick={toExamine}>申请提现</button>
        </div>
        <div className="see" onClick={toDetailed}>
          查看明细
        </div>
      </div>
    </div>
  )
}

export default WithDrawPage
