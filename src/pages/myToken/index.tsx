import React, { useEffect, useState } from 'react'
import { Overlay, ConfigProvider, Empty, PullRefresh, Toast } from 'react-vant'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import { MyTokenService } from '@/service/MyTokenService'
import ToDoList from '@/components/myToken/toDoList'
import emptyIcon from '@/assets/img/token/token_empty@3x.png'
import ModalOverlay from './overlay'
import { isMini } from '@/jsbridge/env'
import './index.less'
/**
 * w我的代币
 */
import { RMB_CON } from '@/utils/currency'
const themeVars = {
  '--rv-empty-description-font-size': '3.46667vw',
  '--rv-empty-description-color': '#666666',
  '--rv-empty-description-padding': 0,
}

const CompleteType = {
  1: '新用户注册',
  2: '订单核销',
}

const MyTokenPage: React.FC = () => {
  //代币数量
  const [totalAmount, setTotalAmount] = useState(0)
  //显隐任务说明
  const [showEmbedded, setShowEmbedded] = useState(false)
  //任务列表
  const [rebateTaskList, setRebateTaskList] = useState<any[]>([])
  //当前查看任务列表
  const [rebateTaskinfo, setRebateTaskinfo] = useState<any>()
  //分享数据
  const [shareData, setShareData] = useState<any>()
  const [isshareCard, setisshareCard] = useState(false)
  const [sharetaskId, setsharetaskId] = useState<any>({})

  const [model, setModel] = useState('app')
  useEffect(() => {
    SHBridge.setTitle('我的乐豆')
    MyTokenService.getMyWallet().then((res: any) => {
      const { code, data } = res
      if (code === '200' && data) {
        setTotalAmount(data.totalAmount)
      }
    })
    getTaskList()
    isMini().then((res) => {
      if (res) {
        setModel('mini')
      }
    })

    document.addEventListener(
      'onResume',
      function (e) {
        const { state } = e
        if (state === 0) {
          getTaskList()
          oncloseModal()
        }
      },
      false
    )
    return () => {
      document.removeEventListener(
        'onResume',
        function (e) {
          console.log('e :>> ', e)
        },
        false
      )
    }
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
    SHBridge.jump({ url: generateUrl('/detailed?type=1'), newWebView: true, title: '收支明细' })
  }
  //显示说明
  const setHandleShowEmbedded = (item) => {
    console.log('item :>> ', item)
    setRebateTaskinfo(item)
    setShowEmbedded(true)
  }

  const shareTask = (item) => {
    if (model === 'mini') {
      setisshareCard(true)
      return
    }

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
          setTimeout(() => {
            onshareChangeHandle(data)
          }, 800)
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
    const { goodsId, userId, goodsName, shareType, id, promotionalImageUrl, rebateType } = item
    console.log('item :>> ', item)
    let shareIp = null
    if (rebateType != 1) {
      shareIp = shareType
    }
    // oncloseModal()
    if (SHBridge.isLogin()) {
      const litterUrl = `${window.location.origin}/goods-detail?id=${goodsId}&userId=${userId}&source=2&taskId=${id}&rebateType=${rebateType}&share_ip=${shareIp}`
      console.log('litterUrl :>> ', litterUrl)
      SHBridge.shareDetail({
        type: 'goods',
        title: goodsName,
        description: goodsName,
        headUrl: promotionalImageUrl,
        littleUrl: litterUrl,
      })
      // oncloseModal()
      const { taskId, state } = sharetaskId
      if (state != 2 && shareIp === 0) {
        MyTokenService.unLockBean({ taskId: id }).then((res) => {
          const { code, msg, data } = res
          if (code === '200' && data) {
            // Toast('分享成功')
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
  const onRefresh = () => {
    MyTokenService.getMyWallet().then((res: any) => {
      const { code, data } = res
      if (code === '200' && data) {
        setTotalAmount(data.totalAmount)
      }
    })
    getTaskList()
  }
  return (
    <div className="MyTokenPage__root">
      <PullRefresh successText="刷新成功" onRefresh={onRefresh}>
        <div className="mtkon-box">
          <div className="mtkon-box-header">
            <div className="mtkon-header-balance" onClick={openHappyCoins}>
              乐豆余额
            </div>
            <div className="mtkon-header-with">
              <div className="mhw-left">{RMB_CON(totalAmount)}</div>
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
                        <ToDoList
                          {...item}
                          shareTask={shareTask}
                          onToviewHandle={() => {
                            setHandleShowEmbedded(item)
                          }}
                        />
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
      </PullRefresh>

      <Overlay zIndex={999} visible={showEmbedded} onClick={() => setShowEmbedded(false)}>
        {showEmbedded ? (
          <div className="task-wrapper">
            <div className="task-content">
              <div className="task-content-header">任务说明</div>
              <div className="task-content-body">
                {rebateTaskinfo.type == 1 && (
                  <>
                    <p>1、分享线路给好友完成指定的权益任务，可解锁相应的乐豆； </p>
                    <p>2、每次分享成功可解锁{RMB_CON(rebateTaskinfo.unlockShareBean)}乐豆；</p>
                    <p>3、如有问题，请联系专属业务员进行处理。</p>
                  </>
                )}
                {rebateTaskinfo.type == 2 && (
                  <>
                    <p>1、分享线路给好友且好友完成{CompleteType[rebateTaskinfo.pullType]}即可解锁相应的乐豆； </p>
                    <p>2、每次可解锁{RMB_CON(rebateTaskinfo.unlockPullBean)}乐豆；</p>
                    <p>3、如有问题，请联系专属业务员进行处理。</p>
                  </>
                )}
                {rebateTaskinfo.type == 3 && (
                  <>
                    <p>
                      1、分享线路给好友完成指定的权益任务，可解锁相应的乐豆，每次分享成功可解锁
                      {RMB_CON(rebateTaskinfo.unlockShareBean)}乐豆；
                    </p>
                    <p>
                      2、也可以分享线路给好友且好友完成{CompleteType[rebateTaskinfo.pullType]}
                      即可解锁相应的乐豆，每次可解锁{RMB_CON(rebateTaskinfo.unlockPullBean)}乐豆；
                    </p>
                    <p>3、如有问题，请联系专属业务员进行处理。</p>
                  </>
                )}
              </div>
            </div>
            <div className="task-close" onClick={() => setShowEmbedded(false)}></div>
          </div>
        ) : null}
      </Overlay>
      {isshareCard && (
        <ModalOverlay
          shareData={shareData}
          onclose={oncloseModal}
          model={model}
          onshareChange={onshareChangeHandle}
          isShow={isshareCard}
        />
      )}
    </div>
  )
}

export default MyTokenPage
