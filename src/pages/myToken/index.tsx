import React, { useEffect, useState } from 'react'
import { Overlay, ConfigProvider, Empty, Toast } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { MyTokenService } from '../../service/MyTokenService'
import ToDoList from '@/components/myToken/toDoList'
import emptyIcon from '@/assets/img/token/token_empty@3x.png'
import ModalOverlay from './overlay'
import { getCookie } from '@/utils/cookie'
import './index.less'
/**
 * w我的代币
 */
const themeVars = {
  '--rv-empty-description-font-size': '3.46667vw',
  '--rv-empty-description-color': '#666666',
  '--rv-empty-description-padding': 0,
}
const MyTokenPage: React.FC = () => {
  //代币数量
  const [totalAmount, setTotalAmount] = useState(0)
  //显隐任务说明
  const [showEmbedded, setShowEmbedded] = useState(false)
  //任务列表
  const [rebateTaskList, setRebateTaskList] = useState<any[]>([])
  //分享数据
  const [shareData, setShareData] = useState<any>()
  const [isshareCard, setisshareCard] = useState(false)
  const [sharetaskId, setsharetaskId] = useState<any>({})
  useEffect(() => {
    MyTokenService.getMyWallet().then((res: any) => {
      const { code, data } = res
      if (code === '200' && data) {
        setTotalAmount(data.totalAmount)
      }
    })

    getTaskList()
  }, [])

  const getTaskList = () => {
    MyTokenService.rebateTask()
      .then((res: any) => {
        const { code, data } = res
        if (code === '200' && data) {
          setRebateTaskList(data)
        } else {
        }
        console.log('res任务列表 :>> ', res)
      })
      .catch((err) => {
        console.log('请求失败任务列表 :>> ', err)
      })
  }

  //去提现
  const toWithDraw = () => {
    SHBridge.jump({ url: generateUrl('/with-draw'), newWebView: true, title: '申请提现' })
  }
  //打开明细
  const myTokenDetailHandle = () => {
    SHBridge.jump({ url: generateUrl('/detailed'), newWebView: true, title: '收支明细' })
  }
  //显示说明
  const setHandleShowEmbedded = () => {
    setShowEmbedded(true)
  }

  const shareTask = (item) => {
    const { taskId, state } = item
    // SHBridge.shareActivity(specialDetail)
    console.log('taskId :>> ', item)
    MyTokenService.shareParam({ taskId })
      .then((res) => {
        const { code, data } = res
        if (code === '200' && data) {
          setShareData(data)
          setisshareCard(true)
          setsharetaskId(item)
        } else {
          Toast('服务异常')
        }
      })
      .catch((err) => {
        Toast('系统错误')
        console.log('err :>> ', err)
      })
  }
  const openHappyCoins = () => {
    SHBridge.jump({ url: generateUrl('/beans-explain'), newWebView: true, title: '乐豆说明' })
  }

  const onshareChangeHandle = (item) => {
    const { goodsId, userId, goodsName, id, promotionalImageUrl } = item
    oncloseModal()
    if (SHBridge.isLogin()) {
      const litterUrl = `${window.location.origin}/goods-detail?id=${goodsId}&userId=${userId}`
      console.log('litterUrl :>> ', litterUrl)
      SHBridge.shareDetail({
        type: 'goods',
        title: goodsName,
        description: goodsName,
        headUrl: promotionalImageUrl,
        littleUrl: litterUrl,
      })
      oncloseModal()
      const { taskId, state } = sharetaskId
      if (state != 2) {
        MyTokenService.unLockBean({ taskId: taskId }).then((res) => {
          const { code, msg, data } = res
          if (code === '200' && data) {
            Toast('分享成功')
            getTaskList()
          } else {
            Toast(msg)
          }
        })
      }
    } else {
      SHBridge.login()
      // Toast('还未登录，请登录后分享')
    }
    console.log('item :>> ', item)
  }

  const oncloseModal = () => {
    setisshareCard(false)
  }

  return (
    <div className="MyTokenPage__root">
      <div className="mtkon-box">
        <div className="mtkon-box-header">
          <div className="mtkon-header-balance" onClick={openHappyCoins}>
            乐豆余额
          </div>
          <div className="mtkon-header-with">
            <div className="mhw-left">{totalAmount / 100}</div>
            <div className="mhw-right">
              <div className="mhw-right-btn" onClick={toWithDraw}>
                提现
              </div>
            </div>
          </div>
          <div className="mtkon-header-foot">
            <div className="mhf-detail" onClick={myTokenDetailHandle}>
              收支明细
            </div>
          </div>
        </div>
        <div className="task">
          <div className="task-name">
            <div className="task-name-left">
              <span></span>
            </div>
            <div className="task-name-center">我的任务</div>
            <div className="task-name-right">
              <span></span>
            </div>
          </div>
          <ConfigProvider themeVars={themeVars}>
            <div className="task-list">
              {rebateTaskList.length > 0 ? (
                rebateTaskList.map((item, index) => {
                  return (
                    <div className="task-list-item" key={index}>
                      <ToDoList {...item} shareTask={shareTask} onToviewHandle={setHandleShowEmbedded} />
                    </div>
                  )
                })
              ) : (
                <Empty
                  className="custom-image"
                  image={emptyIcon}
                  description="购买返利商品开启更多任务，快去逛逛吧！"
                />
              )}
            </div>
          </ConfigProvider>
        </div>
      </div>

      <Overlay zIndex={999} visible={showEmbedded} onClick={() => setShowEmbedded(false)}>
        <div className="task-wrapper">
          <div className="task-content">
            <div className="task-content-header">任务说明</div>
            <div className="task-content-body">
              <p>1、分享线路给好友可完权益任务； </p>
              <p>2、需累计分享10次，每次分享间隔时间24小时；</p>
              <p>3、每次分享任务需满足10个不同的好友进行访问； </p>
              <p>4、如有问题，请联系专属业务员进行处理。</p>
            </div>
          </div>
          <div className="task-close" onClick={() => setShowEmbedded(false)}></div>
        </div>
      </Overlay>
      <ModalOverlay
        shareData={shareData}
        onclose={oncloseModal}
        onshareChange={onshareChangeHandle}
        isShow={isshareCard}
      />
    </div>
  )
}

export default MyTokenPage
