import React, { useState } from 'react'
import Down from '@/assets/img/down_icon@3x.png'
import Up from '@/assets/img/up_icon@3x.png'
import { Checkbox } from 'react-vant'
interface Props {
  treeData: Array<any>
  // defaultExpandedKeys: Array<any>
}
const Tree: React.FC<Props> = ({ treeData }) => {
  const [isRefresh, setIsRefresh] = useState(false)
  const onTrigger = (e, item) => {
    e.stopPropagation()
    item.isOpenChild = !item.isOpenChild
    setIsRefresh(!isRefresh)
  }
  const changeBox = (e) => {
    console.log(e, '-----')
  }
  const loopTree = (arr) => {
    return arr.map((item, index) => {
      return (
        <div key={index} style={{width:'100%'}}>
          {item.children ? (
            <div className="check-item" key={item.key}>
              <Checkbox
                defaultChecked={false}
                checkedColor="#00D2C6"
                className="groupSend-checkbox"
                onChange={(e) => changeBox(e)}
                name={index}
              ></Checkbox>
              <div className="groupSend-list" onClick={(e) => onTrigger(e, item)}>
                <img src="" className="groupSend-img" alt="" />
                <div className="groupSend-con">
                  <div className="groupSend-name">张某某 职级名称</div>
                  <div className="groupSend-desc">当前订单量：</div>
                </div>
                <img src={item.isOpenChild ? Down : Up} className="groupSend-r-img" alt="" />
              </div>
            </div>
          ) : (
            <div className="check-item check-item-c" key={item.key}>
              <div className="groupSend-list">
                <img src="" className="groupSend-img" alt="" />
                <div className="groupSend-con">
                  <div className="groupSend-name">张某某 职级名称</div>
                  <div className="groupSend-desc">当前订单量：</div>
                </div>
                <img src={''} className="groupSend-r-img" alt="" />
              </div>
            </div>
          )}

          {item.children && item.children.length && item.isOpenChild ? <>{loopTree(item.children)}</> : null}
        </div>
      )
    })
  }

  return <>{loopTree(treeData)}</>
}

export default Tree
