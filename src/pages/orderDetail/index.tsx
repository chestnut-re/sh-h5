import { common } from '@/service'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import './index.less'
import { CountDown } from 'react-vant';

const OrderDetailPage = observer(() => {
  const [getResult, setGetResult] = useState('')
  const store = useStore()

  const testGetRequest = async () => {
    const res = await common.getUser()
    setGetResult(JSON.stringify(res))
  }

  const changeUserName = () => {
    console.log(store)
    store.userStore.setUserName('asds')
  }

  return (
    <div className="Order-container">
        <div className="order-count">
        <CountDown 
          time={30 * 60 * 60 * 3000} 
          format="剩 DD 天 HH:mm:ss" 
        />
        </div>
        <div className="order-main">
            <div className="order-call_card">
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
                <img src="https://img01.yzcdn.cn/vant/logo.png" />
                </div>
            </div>

          <div className="order-info_card">
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
          </div>

        </div>
        <div className="order-action">
            <div className="order-action-item"></div>
        </div>
    </div>
  )
})

export default OrderDetailPage
