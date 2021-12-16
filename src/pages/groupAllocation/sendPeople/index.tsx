/*
 * @Description: 添加人员
 * @LastEditTime: 2021-12-16 17:57:40
 */

import React from 'react'
import Tree from '@/components/group/tree'
import './index.less'

import { Button, Dialog } from 'react-vant'
const SendPeople: React.FC = () => {
  const treeData = [
    {
      title: 'parent 1-0',
      key: '0-0-0',
      children: [
        {
          title: 'leaf',
          key: '0-0-0-0',
        },
        {
          title: 'leaf',
          key: '0-0-0-1',
        },
        {
          title: 'leaf',
          key: '0-0-0-2',
        },
      ],
    },
    {
      title: 'parent 1-1',
      key: '0-0-1',
      children: [
        {
          title: 'leaf',
          key: '0-0-1-0',
        },
      ],
    },
    {
      title: 'parent 1-2',
      key: '0-0-2',
      children: [
        {
          title: 'leaf',
          key: '0-0-2-0',
        },
        {
          title: 'leaf',
          key: '0-0-2-1',
        },
      ],
    },
  ]
  const showDialog = () => {
    Dialog.confirm({
      message: '您确认将""加入""吗？',
      width: '272px',
      confirmButtonText: '确认加入',
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
    <div className="groupSend__root">
      <div className="groupSend-search">
        <input type="text" placeholder="请输入员工姓名" />
      </div>
      <div className="groupSend-list">
        <Tree treeData={treeData} />
      </div>
      <div className="groupSend-bottom">
        <Button className="bottom-btn" onClick={showDialog}>
          完成
        </Button>
      </div>
    </div>
  )
}
export default SendPeople
