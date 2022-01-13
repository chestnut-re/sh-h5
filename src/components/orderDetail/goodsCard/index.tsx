import React, { useState, useEffect, FC } from 'react'
import { Image,Popup,Icon } from 'react-vant'
import integralIcon from '@/assets/img/integral_icon.png'
import Privilege from '@/pages/submitOrder/privilege'
import './index.less'
/**
 * 商品预览卡片左图 右描述
 */
interface GoodsType {
  promotionalImageUrl?: string;
  goodsName?: string;
  startDate:string;
  endDate:string;
  adultNum:string;
  childNum:string;
  isSubmitOrder?:boolean;
  travelId?:string;
  goodsId:string;
  tokenAmount:number;
  discountAmount:number;
  payAmount:number;
}
const RMB_CON = 100;

const GoodsCard: FC<GoodsType> = (props) => {
  console.log('BBBBBBBpropspropsprops :>> ', props);
  const {promotionalImageUrl,goodsName,startDate,endDate,adultNum,childNum,travelId,goodsId,tokenAmount,discountAmount,payAmount} = props;
  const [showPrivilege, setShowPrivilege] = useState(false)
  const openDiscounts = ()=>{
    setShowPrivilege(true)
  }
  return (
    <div className='goods-container'>
      <div className="goods-content">
        <div className="goods-l">
          <Image width="100%" height="100%" fit="cover" src={promotionalImageUrl} />
        </div>
        <div className="goods-r">
          <div className="goods-rT_name rv-multi-ellipsis--l2">{goodsName}</div>
          {startDate&&endDate?(<div className="goods-rC_name goods-rS">{startDate} 出发 {endDate} 返程</div>):null}
          <div className="goods-rB_name goods-rS">
            <span>成人X{adultNum}</span>
            <span>儿童X{childNum}</span>
          </div>
        </div>
      </div>

      {travelId&&<div className="Prefer-content">
      {tokenAmount>0?<div className="info-integral rv-hairline--bottom">
        <div className="integral-title hairline--icon">
          <Icon size="4vw" className="integra-icon" name={integralIcon} />
          <span>积分</span>
        </div>
        <div className="integral-instruction">
          使用¥{tokenAmount}<span>-¥{tokenAmount}</span>
        </div>
      </div>:null}

      <div className="info-discounts">
        <div className="discounts-title hairline--icon">
          优惠<Icon className="discounts-icon" onClick={openDiscounts} name="question-o" />
        </div>
        <div className="discounts-instruction">
          <div className="instruction-l">
            已优惠<span>¥{discountAmount/RMB_CON}</span>&nbsp;
            共计<span>¥{payAmount/RMB_CON}</span>
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
          <Privilege goodsPriceId={travelId} stepperData={{adultNum,childNum}}   id={goodsId} />
        </div>
      </Popup>
    </div>}

    </div>
  )
}

export default GoodsCard
