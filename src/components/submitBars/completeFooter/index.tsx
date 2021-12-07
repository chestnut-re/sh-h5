import React, { useState,FC } from 'react'
import {withRouter} from "react-router-dom";
import { Icon,Toast, Popover } from 'react-vant'
import applyRefundIcon from '@/assets/img/applyrefund_icon@3x.png'
import './index.less'
/**
 * 底部订单完成卡片包含 左侧申请售后 右侧 再次购买 分享给ta按钮
 */
 const actions = [{ text: '申请售后' }];

const CompleteFootCard:FC= (props:any) =>{

  const onLinkSelect = (item) => {
    console.log('props :>> ', item);
    onClickAction("LeftLinkTitle",item)
  };

  const onClickAction = (type,item={}) => {
   
    props.onSelect?.(type,item);

  };
  const {showLeftLinkBtn,LeftLinkActions,barLeftTitle,barRightTitle,showRightLinkBtn,RightLinkTitle} = props;


  return (
    <div className="complete-footer">
      <div className="complete-footmain">
        {showLeftLinkBtn&&<div className="complete-btnLeft">
          <Popover
          placement="top-start"
          actions={LeftLinkActions}
          onSelect={onLinkSelect}
          reference={<Icon name={applyRefundIcon} size="4.8vw" />}
        />   
        </div>}
        <div className="complete-btnRight">
          <div className="complete-l">
            {barLeftTitle&&barLeftTitle&&<div className="complete-dis complete-foot-btn" onClick={() => onClickAction("barLeftTitle")}>{barLeftTitle}</div>}
          </div>
          <div className="complete-r">
            {barRightTitle&&barRightTitle&&<div className="btn-pay complete-foot-btn" onClick={() => onClickAction("barRightTitle")}>{barRightTitle}</div>}
          </div>
          {showRightLinkBtn&&RightLinkTitle&&<div className="complete-r">
            <div className="btn-pay complete-foot-btn complete-travel" onClick={() => onClickAction("RightLinkTitle")}>{RightLinkTitle}</div>
          </div>}
        </div>
      </div>
      
    </div>
  )
}
CompleteFootCard.defaultProps = {
  barLeftTitle: 'xxxx',  //左侧按钮文案
  barRightTitle: 'xxxx', //右侧按钮文案
  showLeftLinkBtn:false,  //是否显示最左侧按钮
  LeftLinkActions:[{ text: '申请售后' }], //左侧按钮文案
  showRightLinkBtn:false, //是否显示最右侧按钮
  RightLinkTitle:"xxx"
};
export default withRouter(CompleteFootCard)
