import React from 'react'
import { Popup } from 'react-vant';

import circle from '@/assets/img/share/circle.png'
import weCat from '@/assets/img/share/weCat.png'
import long from '@/assets/img/share/long.png'
import link from '@/assets/img/share/link.png'

import './index.less'

interface Props {
  onClose: () => void
  visible: boolean
  copyLink: '123'
}

/**
 * 分享组件
 */
const ShareView: React.FC<Props> = ({ visible, copyLink, onClose }) => {
  /**
   * 分享微信
   */
  const onShareWeCat = () => {

    window['wx'].ready(function (rew) {   //需在用户可能点击分享按钮前就先调用
      console.log('212', rew)

    });
    console.log('212121', window['wx'].ready())
  }
  /**
   * 分享朋友圈
   */
  const onShareCircle = () => {
    console.log('')
  }

  const onLongImg = () => {
    console.log('')
  }
  const onCopyLink = () => {
    console.log('')
  }
  return (
    <Popup onClose={onClose} safeAreaInsetBottom visible={visible} closeable round position="bottom" >
      <div className='sharePopupView'>
        <div className='shareTitle'>
          分享给TA 一起嗨玩
        </div>
        <div className='shareContents'>
          <div onClick={onShareWeCat} className='item'>
            <img className='img' src={weCat} />
            <div className='txt'>微信</div>
          </div>
          <div onClick={onShareCircle} className='item'>
            <img className='img' src={circle} />
            <div className='txt'>朋友圈</div>
          </div>
          {/* {copyLink && (
            
          )} */}
          <div className='item' onClick={onCopyLink}>
            <img className='img' src={link} />
            <div className='txt'>链接</div>
          </div>

          <div onClick={onLongImg} className='item'>
            <img className='img' src={long} />
            <div className='txt'>长图</div>
          </div>
        </div>
        <div className='shareBtn'>
          <div onClick={onClose} className='btn'>
            取消
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default ShareView
