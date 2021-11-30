import { common } from '@/service'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import './index.less'
import { CountDown,Icon } from 'react-vant';
import integralIcon from '@/assets/img/integral_icon.png'
import wecharIcon from '@/assets/img/wechar_icon@3x.png'

const OrderDetailPage = observer(() => {
 
  return (
    <div className="Order-container">
        <div className="order-count">
        <CountDown 
          time={30 * 60 * 60 * 2000} 
          format="剩 DD 天 HH:mm:ss" 
        />
        </div>
        <div className="order-main">
            <div className="contact_card">
                <div className="card-l">
                    <img src="https://img01.yzcdn.cn/vant/logo.png" />
                </div>
                <div className="card-c">
                    <div className="card-ct">
                    五星团长 赵大白
                    </div>
                    <div className="card-cb">
                    如有疑问 可联系我
                    </div>
                </div>
                <div className="card-r">
                    <img src={wecharIcon} />
                </div>
            </div>

          <div className="preview_card">
              <div className="info-content">
                  <div className="info-l">
                    <img src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00264-2075.jpg" />
                  </div>
                  <div className="info-r">
                      <div className="info-rT_name rv-multi-ellipsis--l2">
                        三亚5日自由行(5钻)·直减300『高星4晚 连住』
                      </div>
                      <div className="info-rC_name info-rS">
                        10/22 周五出发 10/26 周二返程
                      </div>
                      <div className="info-rB_name info-rS">
                        <span>成人X2</span>
                        <span>儿童X2</span>
                      </div>
                  </div>
              </div>
              <div className="info-integral rv-hairline--bottom">
                  <div className="integral-title hairline--icon">
                    <Icon size="4vw" className="integra-icon"  name={integralIcon} />
                    <span>积分</span>
                    </div>
                  <div className="integral-instruction">
                  使用¥340<span>-¥340</span>
                  </div>
              </div>

              <div className="info-discounts">
                  <div className="discounts-title hairline--icon" >优惠<Icon className="discounts-icon" name="question-o" /></div>
                  <div className="discounts-instruction">
                    <div className="instruction-l">
                    已优惠<span>¥200</span>
                    </div>
                    <div className="instruction-r">
                    共计¥<span>5798</span>
                    </div>
                  </div>
              </div>
          </div>


          <div className="payment_card">
                <div className="payment-name">支付方式</div>
                <div className="payment-select">微信<Icon color="#999999" name="arrow" /></div>
          </div>

          <div className="indent_card">
              <ul className="indent-ul">
                <li className="indent-li">
                    <div className="indent-li_l">
                      订单编号
                    </div>
                    <div className="indent-li_r">1234 1234 1234 1234</div>
                    <div className="indent-li_copy">复制</div>
                </li>
                <li className="indent-li">
                  <div className="indent-li_l">下单时间</div>
                  <div className="indent-li_r">2021/10/19 18:43:20</div>
                </li>
              </ul>
          </div>

          <div className="backthat_card">
                <div className="backthat-name">退改说明</div>
                <div className="backthat-select">
                  <Icon color="#999999" name="arrow" />
                </div>
          </div>
        </div>
        <div className="order-action">
            <div className="action-main">
                <div className="action-l">
                  <div className="action-total"><span>¥</span> 8596</div>
                  <div className="action-dis">已优惠2198</div>
                </div>
                <div className="action-r">
                  <div className="btn-pay">立即付款</div>
                </div>
            </div>
        </div>
    </div>
  )
})

export default OrderDetailPage
