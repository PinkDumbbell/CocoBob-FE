import { Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const noteSwiperOptions: SwiperProps = {
  pagination: { clickable: true },
  modules: [Pagination],
};
export default function NoteImageSwiper({
  images,
}: {
  images: { imageId: number; path: string }[];
}) {
  return (
    <Swiper {...noteSwiperOptions} className="flex items-center h-full">
      {images.map((image) => (
        <SwiperSlide key={image.imageId} className="w-full h-full flex items-center justify-center">
          <img className="bg-primary-light h-full " src={image.path} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
