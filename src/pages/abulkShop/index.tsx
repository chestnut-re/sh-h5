import { common } from '@/service'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import './index.less'

const HomePage = observer(() => {
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
    <div className="Abulkshop-container">
        <div className="abulk-personal">
              <div className="abulk-avatar">
                <img src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
              </div>
              <div className="abulk-content">
                    <div className="abulk-name">五星团长 赵大白</div>
                    <div className="abulk-title">如有疑问 可联系我</div>
                    <div className="abulk-action">
                        <div className="abulk-abtn">关注</div>
                        <div className="abulk-abtn">分享</div>
                    </div>
              </div>
        </div>
        <div className="abulk-introduce">
              <div className="introduce-content">
                简介：简介：天空分外晴朗,白云也绽露笑容天空分外晴朗
              </div>
              <div className="packup-btn">
                <span>展开</span><i>^</i>
              </div>
        </div>
        <div className="abulk-main">
              <ul className="abulk-main-ul">
                {
                  [1,2,3,4,5,7,8].map((item,index)=>{
                    return (
                      <li className="abulk-main-li" key={item}>
                          <div className="card-main">
                              <div className="card-image">
                                <img src="https://img0.baidu.com/it/u=3858909962,2305759360&fm=26&fmt=auto" />
                              </div>
                              <div className="card-content">
                                    <div className="card-name">
                                    三亚5日跟团游「5星4晚连 住」三亚5日跟团游「5星4晚连 住」三亚5日跟团游「5星4晚连 住」
                                    </div>
                                    <div className="card-price">
                                    ¥2899
                                    </div>
                                    <div className="card-info">
                                        <div className="info-s">
                                          3456已付款
                                        </div>
                                        <div className="info-s">
                                          2356
                                        </div>
                                    </div>

                              </div>
                          </div>
                      </li>
                    )
                  })
                }
              </ul>
        </div>
    </div>
  )
})

export default HomePage
