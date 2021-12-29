import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PageTemplateKey } from '../../utils'
import './index.less'

interface Props {
  imgs: string[]
  templateKey: PageTemplateKey
}

/**
 * 轮播
 */
const GSwiper: React.FC<Props> = ({ imgs }) => {
  return (
    <div className="GSwiper__root">
      {imgs && (
        <Swiper effect={'cards'} grabCursor={true} className="mySwiper">
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
