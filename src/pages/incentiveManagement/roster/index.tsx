import React, { useState, FC } from 'react'
import { Button, List, Cell, SwipeCell, Dialog } from 'react-vant'
import CreatePersonnel from './createRoster'
import './index.less'

/**
 * 激励管理-名单页面
 */

const RosterPage = (props: any) => {
  const createRoster = () => {
    props.history.push({ pathname: '/incentive/roster/create' })
  }
  const showDialog = () => {
    Dialog.confirm({
      title: '确认删除激励方案吗？',
      message: '激励名单里的员工，将自动取消关联该方案',
      width: '272px',
      confirmButtonText: '确认删除',
      confirmButtonColor: '#333333',
      messageAlign: 'left',
      cancelButtonColor: '#9e9e9e',
      className: 'dialog',
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      })
  }
  return (
    <div className="roster">
      <div className="roster-header">
        <div className="header-time">
          <span>2021-01-01</span>
          <span>至</span>
          <span>2021-01-01</span>
          <Button className="time-btn">未开始</Button>
        </div>
        <div className="header-target">目标 ¥100,000</div>
        <div className="header-amount">激励金额 ¥3,000</div>
      </div>
      <div className="roster-list">
        <List>
          {/* {list.length
            ? list.map((item) => {
                return <Cell key={item} title={item} />
              })
            : null} */}
          <Cell>激励方案名单</Cell>
          <SwipeCell
            rightAction={
              <>
                <Button square type="danger">
                  移除
                </Button>
              </>
            }
          >
            <Cell size="large">张某某</Cell>
          </SwipeCell>
          <SwipeCell
            rightAction={
              <>
                <Button square type="danger">
                  移除
                </Button>
              </>
            }
          >
            <Cell size="large">张某某</Cell>
          </SwipeCell>
          <SwipeCell
            rightAction={
              <>
                <Button square type="danger" onClick={showDialog}>
                  移除
                </Button>
              </>
            }
          >
            <Cell size="large">张某某</Cell>
          </SwipeCell>
        </List>
      </div>
      <div className="roster-create">
        <div onClick={createRoster}>添加人员</div>
      </div>
    </div>
  )
}
export default RosterPage
