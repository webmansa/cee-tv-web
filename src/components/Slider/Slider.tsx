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
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                galleries.map((gallery) => <SwiperSlide>
                    <img src={gallery.item} alt={gallery.title} />
                </SwiperSlide>)
            }
        </Swiper>
    )
}