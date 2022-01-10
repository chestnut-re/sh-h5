import clsx from 'clsx'
import React, { useState, FC } from 'react'
import StampIng_icon from '@/assets/img/stamp_ing@3x.png'
import Stampcomplete_icon from '@/assets/img/stamp_complete@3x.png'
import './index.less'
/**
 * 我的代币-任务列表
 */
interface ToDoListType{
  onToviewHandle:()=>void;
}

const ToDoListCard: FC<ToDoListType> = ({onToviewHandle}) => {
  const [isMore, setIsMore] = useState(false)
  const [portion, setPortion] = useState(45)

  const onToviewHandleItem = () => {
      onToviewHandle()
  }

  return (
    <div className="Todo-container">
      <div className="todo-box">
        <div className="todo-box-name rv-multi-ellipsis--l2">三亚5日自由行(5钻)·直减300三亚5日自由行(5钻)·直减300三亚5日自由行(5钻)·直减300三亚5日自由行(5钻)·直减300</div>
        <div className="todo-box-ins">
          <div className="todo-box-ins-l ">完成以下权益任务可解锁乐豆</div>
          <div className="todo-box-ins-r" onClick={onToviewHandleItem}>任务说明</div>
        </div>

        {isMore&&(<div className="todo-box-content">
          <ul className="todo-box-content-ul">
            <li className="tbcu-li">
              <div className="tbcu-li-name">
                <div className="tbcu-li-name-t">
                  <p>任</p>
                  <p>务</p>
                  <p>一</p>
                </div>
              </div>
              <div className="tbcu-li-content">
                <div className="tbcu-li-content-top">
                  <div className="tlct-left">
                    <span className="tlct-left-name">已解锁</span>
                    <span className="tlct-left-num">80</span>
                  </div>
                  <div className="tlct-right">核销订单后可用</div>
                </div>
                <div className="tbcu-li-content-bottom">
                  <div className="progress-container">
                    <span className="progress__portion" style={{ width: `${portion}%` }}></span>
                    <span className="progress__header" style={{ left: `${portion - 6}%` }}></span>
                  </div>
                  <div className="progress-text">50/9999</div>
                </div>
              </div>
              <div className="tbcu-li-share">
                <div className="tbcu-li-share-btn">立即分享</div>
              </div>
            </li>
            <li className="tbcu-li">
              <div className="tbcu-li-name">
                <div className="tbcu-li-name-t">
                  <p>任</p>
                  <p>务</p>
                  <p>一</p>
                </div>
              </div>
              <div className="tbcu-li-content">
                <div className="tbcu-li-content-top">
                  <div className="tlct-left">
                    <span className="tlct-left-name">已解锁</span>
                    <span className="tlct-left-num">80</span>
                  </div>
                  <div className="tlct-right">核销订单后可用</div>
                </div>
                <div className="tbcu-li-content-bottom">
                  <div className="progress-container">
                    <span className="progress__portion" style={{ width: `${portion}%` }}></span>
                    <span className="progress__header" style={{ left: `${portion - 6}%` }}></span>
                  </div>
                  <div className="progress-text">50/9999</div>
                </div>
              </div>
              <div className="tbcu-li-share">
                <div className="tbcu-li-share-btn">立即分享</div>
              </div>
            </li>
          </ul>
        </div>)}

        <div
          
          className={clsx('todo-box-more', 'todo-box-more-btn-l', isMore && 'todo-box-more-btn-b')}
          onClick={() => {
            setIsMore(!isMore)
          }}
        >
          <div className="todo-box-more-btn">
            {isMore?"收起任务":"展开任务"}
          </div>
        </div>
        <div className="todo-box-stamp">
          <img className="stamp-icon" src={StampIng_icon} />
        </div>
      </div>
    </div>
  )
}

export default ToDoListCard
