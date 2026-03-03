import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <section className="mt-5 mb-5 md:mb-20 w-full max-w-350 mx-auto font-text px-4 md:px-2">
      <Swiper
        className="rounded-3xl overflow-hidden h-112.5 md:h-150"
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        autoplay
        navigation
        pagination
      >
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-full object-cover" src={banner1} alt="art" />
            <div className="absolute inset-0 bg-black/50"></div>
           <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
             <h1 className="text-3xl md:text-5xl font-heading font-bold">
          Design Your <span className="text-primary">
            <Typewriter 
              words={['Dream', 'Canvas', 'Future']} 
              loop={true}
              cursor
            />
          </span>
        </h1>
        <p className="mt-4 opacity-80">Explore the best artists around the globe</p>
           </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-full object-cover" src={banner2} alt="art" />
              <div className="absolute inset-0 bg-black/50"></div>
           <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
             <h1 className="text-3xl md:text-5xl font-heading font-bold">
          Design Your <span className="text-primary">
            <Typewriter 
              words={['Dream', 'Canvas', 'Future']} 
              loop={true}
              cursor
            />
          </span>
        </h1>
        <p className="mt-4 opacity-80">Explore the best artists around the globe</p>
           </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-full object-cover" src={banner3} alt="art" />
              <div className="absolute inset-0 bg-black/50"></div>
           <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
             <h1 className="text-3xl md:text-5xl font-heading font-bold">
          Design Your <span className="text-primary">
            <Typewriter 
              words={['Dream', 'Canvas', 'Future']} 
              loop={true}
              cursor
            />
          </span>
        </h1>
        <p className="mt-4 opacity-80">Explore the best artists around the globe</p>
           </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
