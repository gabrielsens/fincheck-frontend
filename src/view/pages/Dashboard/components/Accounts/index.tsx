import { Swiper, SwiperSlide } from "swiper/react";

import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";

import { EyeIcon } from "../../../../components/icons/EyeIcon";

import { useAccountsController } from "./useAccountsController";

export default function Accounts() {
  const { sliderState, setSliderState, windowWidth } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="text-white tracking-[-0.5px] block">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 100.00
          </strong>
          <button className="h-8 w-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end mt-10 mb:mt-0">
        <div>

          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth <= 500 ? 1.1 : 2.1}
            onSlideChange={swiper => setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd
            })}
          >
            <div className="flex justify-between items-center mb-4" slot="container-start">
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas contas
              </strong>
              <SliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>
              <SwiperSlide>
                <AccountCard
                  name="NuBank"
                  color="#f0c"
                  balance={1000}
                  type="CHECKING"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  name="NuBank"
                  color="#f0c"
                  balance={1000}
                  type="CHECKING"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <AccountCard
                  name="NuBank"
                  color="#f0c"
                  balance={1000}
                  type="CHECKING"
                />
              </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
