import React, { useState, FC } from 'react'
import wechatPayicon from '@/assets/img/wechatpay_icon@3x.png'
import aliPayicon from '@/assets/img/alipay_icon@3x.png'
import otherPayicon from '@/assets/img/otherpay_icon@3x.png'
import { Icon,ConfigProvider, ActionSheet, Radio, Cell } from 'react-vant'
import './index.less'
/**
 * 支付方式卡片
 */

const PayTypeList = [
  {name:"微信支付",payIcon:wechatPayicon,value:0,alias:'微信'},
  {name:"支付宝支付",payIcon:aliPayicon,value:1,alias:'支付宝'},
  {name:"其他支付方式",payIcon:otherPayicon,value:2,alias:'其他'}
]
const themeVars = {
  '--rv-cell-vertical-padding': '16px',
  "--rv-cell-font-size":"16",
  "--rv-cell-text-color":"#666666",
};
const PayTypeCard: FC = (props) => {
  const [visible, setVisible] = useState(false);
  const [radiovSelectObj, setSelectObj] = useState(PayTypeList[0]);


  return (
    <>
      <div className="Payment-content">
        <div className="payment_card" onClick={() => setVisible(true)}>
          <div className="payment-name">支付方式</div>
          <div className="payment-select" >
            {radiovSelectObj.alias}
            <Icon color="#999999" name="arrow" />
          </div>
        </div>
      </div>
      <ActionSheet title="选择支付方式" visible={visible} onCancel={() => setVisible(false)}>
        <div className="payment-actionsheet">
          <ConfigProvider themeVars={themeVars}>
          <Radio.Group value={radiovSelectObj.value}>
            <Cell.Group>
              {PayTypeList.map(item=>{
                  return (<Cell title={item.name} key={item.value} center onClick={()=>{setSelectObj(item),setVisible(false)}} icon={item.payIcon} rightIcon={<Radio name={item.value} checkedColor="#4DCFC5" />} />)
              })}
              
            </Cell.Group>
          </Radio.Group>
          </ConfigProvider>
        </div>
      </ActionSheet>
    </>
  )
}

export default PayTypeCard
