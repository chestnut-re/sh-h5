import React, { useState } from 'react'
import { PageTemplateKey } from '../../utils'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller } from 'swiper'
import { Navigation, EffectFade, EffectCoverflow, EffectCards, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cards'
import 'swiper/css/pagination'
import './index.less'

interface Props {
  imgs: string[]
  templateKey: PageTemplateKey
}

/**
 * 轮播
 */
const GSwiper: React.FC<Props> = ({ imgs, templateKey }) => {
  const [controlledSwiper, setControlledSwiper] = useState<any>(null)

  return (
    <div className={`GSwiper__root GSwiper__root__${templateKey}`}>
      {imgs && (
        <Swiper
          // effect={'cards'}
          grabCursor={true}
          pagination={true}
          modules={[Controller, Pagination, Navigation, EffectFade, EffectCoverflow, EffectCards]}
          controller={{ control: controlledSwiper }}
          className="mySwiper"
        >
          {imgs.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}
    </div>
  )
}

export default GSwiper
