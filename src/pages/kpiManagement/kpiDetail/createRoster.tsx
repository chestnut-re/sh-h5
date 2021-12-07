import React, { useState } from 'react'
import { Button, Cell, Dialog, Checkbox, Divider, IndexBar } from 'react-vant'
import Add from '@/assets/img/add@3x.png'
import './createRoster.less'
/**
 * 添加人员
 */

const KpiPersonnelPage: React.FC = () => {
  const showDialog = () => {
    Dialog.confirm({
      message: '您确认将 4人 加入“奖励方案3名 称”吗？',
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
    <div className="create">
      <div className="create-search">
        <input type="text" placeholder="请输入员工姓名" />
      </div>
      <div className="create-list">
        {/* <IndexBar>
          <IndexBar.Anchor index="A" />
          <div> */}
        <Checkbox.Group defaultChecked="checked" checkedColor="#00D2C6">
          <Checkbox className="check-item" name="a">
            <img src={Add} style={{ width: '39px', marginRight: '22px' }} alt="" />
            张某某
          </Checkbox>
          <Divider />
          {/* <IndexBar.Anchor index="B" /> */}
          <Checkbox className="check-item" name="b">
            <img src={Add} style={{ width: '39px', marginRight: '22px' }} alt="" />
            张某某
          </Checkbox>
          <Divider />
          <Checkbox className="check-item" name="c">
            <img src={Add} style={{ width: '39px', marginRight: '22px' }} alt="" />
            张某某
          </Checkbox>
          <Divider />
          <Checkbox className="check-item" name="d">
            <img src={Add} style={{ width: '39px', marginRight: '22px' }} alt="" />
            张某某
          </Checkbox>
          <Divider />
          <Checkbox className="check-item" name="e">
            <img src={Add} style={{ width: '39px', marginRight: '22px' }} alt="" />
            张某某
          </Checkbox>
          <Divider />
        </Checkbox.Group>
        {/* </div>
        </IndexBar> */}
      </div>
      <div className="create-bottom">
        <Button className="bottom-btn" onClick={showDialog}>
          完成
        </Button>
      </div>
    </div>
  )
}
export default KpiPersonnelPage
