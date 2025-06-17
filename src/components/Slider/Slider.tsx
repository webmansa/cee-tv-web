import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Gallery {
    item: string
    title: string
}

export const Slider = ({ galleries }: { galleries: Gallery[] }) => {

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
        >
            {
            galleries.map((gallery) => (
                <SwiperSlide key={gallery.item}>
                <img src={gallery.item} alt={gallery.title} />
                </SwiperSlide>
            ))
            }
        </Swiper>
    )
}