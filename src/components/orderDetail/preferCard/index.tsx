import React, { useState, FC } from 'react'

import { Icon, Popup, Toast } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import Privilege from '@/pages/submitOrder/privilege'
import './index.less'
/**
 * 积分、优惠卡片
 */
// const RMB_CON = 1000
import { RMB_CON } from '@/utils/currency'
interface PreferType {
  tokenAmount: number
  discountAmount: number
  payAmount: number
  travelId: string
  goodsId: string
  adultNum: string
  childNum: string
  travelId: string
}

const PreferCard: FC<PreferType> = (props) => {
  console.log('props :>> ', props)
  const { tokenAmount, discountAmount, payAmount, goodsId, adultNum, childNum, travelId } = props
  const [showPrivilege, setShowPrivilege] = useState(false)
  const openDiscounts = () => {
    setShowPrivilege(true)
  }

  return (
    <div className="Prefer-content">
      {tokenAmount > 0 ? (
        <div className="info-integral rv-hairline--bottom">
          <div className="integral-title hairline--icon">
            <Icon size="4vw" className="integra-icon" name={integralIcon} />
            <span>乐豆</span>
          </div>
          <div className="integral-instruction">
            使用{RMB_CON(tokenAmount)}乐豆<span>-¥{RMB_CON(tokenAmount)}</span>
          </div>
        </div>
      ) : null}

      <div className="info-discounts">
        <div className="discounts-title hairline--icon">
          优惠
          <Icon className="discounts-icon" onClick={openDiscounts} name="question-o" />
        </div>
        <div className="discounts-instruction">
          <div className="instruction-l">
            已优惠<span>¥{RMB_CON(discountAmount)}</span>&nbsp; 共计<span>¥{RMB_CON(payAmount)}</span>
          </div>
        </div>
      </div>
      <Popup
        title="优惠信息"
        visible={showPrivilege}
        position="bottom"
        destroyOnClose={true}
        closeable
        round
        safeAreaInsetBottom={true}
        closeIcon="close"
        onClose={() => setShowPrivilege(false)}
      >
        <div className="privilege-box">
          <Privilege goodsPriceId={travelId} stepperData={{ adultNum, childNum }} id={goodsId} />
        </div>
      </Popup>
    </div>
  )
}

export default PreferCard
