import React, { useState } from 'react'
import { Button, Cell, Dialog, Checkbox, Divider } from 'react-vant'
import Duo from '@/assets/img/active_Icon@3x.png'
import './createRoster.less'
/**
 * 添加人员
 */

const CreatePersonnel: React.FC = () => {
  // const [value, setValue] = useState([])
  // const checked = ['a', 'b']
  // const toggle = (name) => {
  //   console.log(name)
  //   const newValue = cellCheck.includes(name) ? cellCheck.filter((el) => el !== name) : [...cellCheck, name]
  //   setValue(newValue)
  // }
  const showDialog = () => {
    Dialog.confirm({
      message: '您确认将4人加入“激励方案3名称”吗？',
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
    <div className="create__root">
      <div className="create-search">
        <input type="text" placeholder="请输入员工姓名" />
      </div>
      <div className="create-list">
        <Checkbox.Group defaultChecked="checked" checkedColor="#00D2C6">
          <Checkbox className="check-item" name="a">
            张某某
          </Checkbox>
          <Divider />
          <Checkbox className="check-item" name="b">
            张某某
          </Checkbox>
          <Divider />
          <Checkbox className="check-item" name="c">
            张某某
          </Checkbox>
          <Divider />
          <Checkbox className="check-item" name="d">
            张某某
          </Checkbox>
          <Divider />
          <Checkbox className="check-item" name="e">
            张某某
          </Checkbox>
          <Divider />
        </Checkbox.Group>
      </div>
      <div className="create-bottom">
        <Button className="bottom-btn" onClick={showDialog}>
          完成
        </Button>
      </div>
    </div>
  )
}
export default CreatePersonnel
