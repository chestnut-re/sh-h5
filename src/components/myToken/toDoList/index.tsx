import React, { useState, useEffect, FC } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import StampIng_icon from '@/assets/img/stamp_ing@3x.png'
import Stampcomplete_icon from '@/assets/img/stamp_complete@3x.png'
import './index.less'
import { Toast } from 'react-vant'
/**
 * 我的代币-任务列表
 */
interface ToDoListType {
  goodsName: string
  goodsId: string
  rebateId: string
  rebateList: any[]
  shareTask: (id) => void
  onToviewHandle: () => void
}

const NumberMap = {
  0: '一',
  1: '二',
  2: '三',
  3: '四',
  4: '五',
  5: '六',
  6: '七',
  7: '八',
  8: '九',
  9: '十',
}

const ToDoListCard: FC<ToDoListType> = ({ goodsName, goodsId, rebateId, onToviewHandle, rebateList, shareTask }) => {
  //查看更多
  const [isMore, setIsMore] = useState(false)
  //是否完成
  const [taskstate, setTaskstate] = useState(false)

  const onToviewHandleItem = () => {
    onToviewHandle()
  }

  useEffect(() => {
    const state = rebateList.some((item) => {
      return item.state === 2
    })
    setTaskstate(state)
  }, [rebateList])
  //分享任务
  const shareTaskHandle = (item) => {
    const { id, updateTime, shareTime = 1 } = item

    const nextShareTime = dayjs(updateTime).utc().add(shareTime, 'hour').format('YYYY-MM-DD hh:mm:ss')
    const nextTime = dayjs().isBefore(dayjs(nextShareTime))
    //首次分享updateTime可能为null
    if (updateTime && nextTime) {
      Toast('任务未达到分享时间')
      return
    } else {
      shareTask({
        taskId: id,
        ...item,
      })
    }
  }
  const sumProgress = (unLockBean, totalBean) => {
    if (totalBean && unLockBean) {
      const Nums = (unLockBean / totalBean) * 100
      return Nums
    } else {
      return 0
    }
  }

  return (
    <div className="Todo-container">
      <div className="todo-box">
        <div className="todo-box-name rv-multi-ellipsis--l2">{goodsName}</div>
        <div className="todo-box-ins">
          <div className="todo-box-ins-l ">完成以下权益任务可解锁乐豆</div>
          <div className="todo-box-ins-r" onClick={onToviewHandleItem}>
            任务说明
          </div>
        </div>

        {isMore && (
          <div className="todo-box-content">
            <ul className="todo-box-content-ul">
              {rebateList.map(({ id, totalBean, unLockBean, updateTime, state, shareTime, isDestroy }, index) => {
                return (
                  <li className="tbcu-li" key={id}>
                    <div className="tbcu-li-name">
                      <div className="tbcu-li-name-t">
                        <p>任</p>
                        <p>务</p>
                        <p>{NumberMap[index]}</p>
                      </div>
                    </div>
                    <div className="tbcu-li-content">
                      <div className="tbcu-li-content-top">
                        <div className="tlct-left">
                          <span className="tlct-left-name">已解锁</span>
                          <span className="tlct-left-num">{unLockBean ?? 0}</span>
                        </div>
                        {isDestroy != 1 && <div className="tlct-right">核销订单后可用</div>}
                      </div>
                      <div className="tbcu-li-content-bottom">
                        <div className="progress-container">
                          <span
                            className="progress__portion"
                            style={{ width: `${sumProgress(unLockBean, totalBean)}%` }}
                          ></span>
                          <span
                            className="progress__header"
                            style={{
                              left: `${sumProgress(unLockBean, totalBean)}%`,
                              transform: `translate(-${sumProgress(unLockBean, totalBean)}%, -50%)`,
                            }}
                          ></span>
                        </div>
                        <div className="progress-text">
                          {unLockBean / 100 ?? 0}/{totalBean / 100 ?? 0}
                        </div>
                      </div>
                    </div>
                    <div className="tbcu-li-share">
                      <div
                        className="tbcu-li-share-btn"
                        onClick={() => {
                          shareTaskHandle({ id, isDestroy, updateTime, shareTime, state })
                        }}
                      >
                        立即分享
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <div
          className={clsx('todo-box-more', 'todo-box-more-btn-l', isMore && 'todo-box-more-btn-b')}
          onClick={() => {
            setIsMore(!isMore)
          }}
        >
          <div className="todo-box-more-btn">{isMore ? '收起任务' : '展开任务'}</div>
        </div>
        <div className="todo-box-stamp">
          <img className="stamp-icon" src={taskstate ? Stampcomplete_icon : StampIng_icon} />
        </div>
      </div>
    </div>
  )
}

export default ToDoListCard
