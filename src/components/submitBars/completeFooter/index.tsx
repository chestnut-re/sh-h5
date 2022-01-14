import React, { useState, FC } from 'react'
import { Icon, Popover } from 'react-vant'
import applyRefundIcon from '@/assets/img/applyrefund_icon@3x.png'
import { FooterProps } from './PropsType'
import './index.less'

/**
 * 底部订单完成卡片包含 左侧申请售后 右侧 再次购买 分享给ta按钮
 */

const CompleteFootCard: FC<FooterProps> = ({leftBtnGroups,btnGroups,onPopoverAction,onSelect}) => {

  const onLinkSelect = (item) => {
    onPopoverAction&&onPopoverAction(item)
  }

  const onClickAction = (item) => {
    onSelect&&onSelect(item)
  }

  return (
    <div className="complete-footer">
      <div className="complete-footmain">
        {leftBtnGroups&&leftBtnGroups.length ? (
          <div className="complete-btnLeft">
            <Popover
              placement="top-start"
              actions={leftBtnGroups}
              onSelect={onLinkSelect}
              reference={<Icon name={applyRefundIcon} size="4.8vw" />}
            />
          </div>
        ):null}
        <div className="complete-btnRight">
        <div className="complete-r">

              {btnGroups?.map((item,index)=>{
                  return (item.name?<div className="btn-pay complete-foot-btn" key={index} onClick={() => onClickAction(item, null)}>
                  {item.name}
                </div>:null)
              })}
            </div>
          {/* {barLeftTitle && (
            <div className="complete-l">
              {barLeftTitle && barLeftTitle && (
                <div className="complete-dis complete-foot-btn" onClick={() => onClickAction('barLeftTitle', null)}>
                  {barLeftTitle}
                </div>
              )}
            </div>
          )}
          {RightLinkTitle && (
            <div className="complete-r">
              {barRightTitle && barRightTitle && (
                <div className="btn-pay complete-foot-btn" onClick={() => onClickAction('barRightTitle', null)}>
                  {barRightTitle}
                </div>
              )}
            </div>
          )}
          {CenterLinkTitle && (
            <div className="complete-r">
              <div className="btn-pay complete-foot-btn" onClick={() => onClickAction('CenterLinkTitle', null)}>
                  {CenterLinkTitle}
                </div>
            </div>
          )}
          {showRightLinkBtn && RightLinkTitle && (
            <div className="complete-r">
              <div
                className="btn-pay complete-foot-btn complete-travel"
                onClick={() => onClickAction('RightLinkTitle', null)}
              >
                {RightLinkTitle}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default CompleteFootCard
