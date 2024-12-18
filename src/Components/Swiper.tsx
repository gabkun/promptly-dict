import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';


const ExampleSlider = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]} // Add modules here
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
    >
      <SwiperSlide>
        <div className="p-4 bg-gray-200 text-center">Slide 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-4 bg-gray-300 text-center">Slide 2</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ExampleSlider;