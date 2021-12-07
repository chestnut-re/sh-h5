import React, { useState } from 'react'
import { Button, List, Cell, SwipeCell, Dialog, Checkbox } from 'react-vant'
import './createRoster.less'
/**
 * 添加人员
 */

const CreatePersonnel = () => {
  const [value, setValue] = useState([])
  const toggle = (name) => {
    console.log(name)
    // const newValue = cellCheck.includes(name) ? cellCheck.filter((el) => el !== name) : [...cellCheck, name]
    // setValue(newValue)
  }
  const showDialog = () => {
    Dialog.confirm({
      message: '您确认将 4人 加入“激励方案3名 称”吗？',
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
        <Checkbox.Group value={value}>
          <Cell.Group>
            <Cell
              titleClass="title"
              size="large"
              clickable
              title="张某某"
              onClick={() => toggle('a')}
              icon={<Checkbox name="a" />}
            />
            <Cell
              size="large"
              titleClass="title"
              clickable
              title="张某某"
              onClick={() => toggle('b')}
              // icon={<Checkbox iconRender={()=>{}} name="b" />}
              icon={<Checkbox checked name="b" />}
            />
          </Cell.Group>
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
