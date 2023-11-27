'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Room from '@/images/test/room.png'
import Room2 from '@/images/test/room2.png'

interface ImgSwiperProps {
  reviewimg: string[]
}

const ImgSwiper : React.FC<{reviewimg: string[]}> = ({ reviewimg }) => {
  // 만약 리뷰 이미지가 없다면 종료
  if (!reviewimg || reviewimg.length === 0) {
    return null;
  }
return (
  <div className='rounded-2xl overflow-hidden'>
  <Swiper
    modules={[Navigation, Pagination]}
    spaceBetween={1}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
  >
    {reviewimg?.map((item, index) => (
      <SwiperSlide key = {index}>
        <Image 
        src={item} 
        alt={`Image${index + 1}`}
        width = {1000}
        height = {1000}
        />
      </SwiperSlide>
    ))}
    </Swiper>
  </div>
);
};
export default ImgSwiper;
