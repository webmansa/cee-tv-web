import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';      // ⬅️ 1 import the module
import 'swiper/css';
import 'swiper/css/autoplay';                  // ⬅️ 2 its CSS (or use /bundle)

interface Gallery {
    item: string;
    title: string;
}

export const Slider = ({ galleries }: { galleries: Gallery[] }) => (
    <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}                       // ⬅️ 3 register it here
    >
        {galleries.map(gallery => (
            <SwiperSlide key={gallery.item}>
                <img className="w-full" src={gallery.item} alt={gallery.title} />
            </SwiperSlide>
        ))}
    </Swiper>
);
