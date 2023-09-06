import { Swiper, SwiperSlide } from "swiper/react";

import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";

import { EyeIcon } from "../../../../components/icons/EyeIcon";

import { useAccountsController } from "./useAccountsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white h-10 w-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="text-white tracking-[-0.5px] block">
              Saldo total
            </span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValuesVisible && "blur-md"
                )}
              >
                R$ 100.00
              </strong>
              <button
                className="h-8 w-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end mt-10 mb:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg">
                    Minhas contas
                  </strong>
                </div>
                <button className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 p-4 flex flex-col justify-center items-center gap-4 text-white">
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="tracking-[-0.5px] font-medium block w-32 text-center">Cadastre uma nova conta</span>
                </button>
              </>
            )}
            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth <= 500 ? 1.1 : 2.1}
                  onSlideChange={(swiper) =>
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    })
                  }
                >
                  <div
                    className="flex justify-between items-center mb-4"
                    slot="container-start"
                  >
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
            )}
          </div>
        </>
      )}
    </div>
  );
}
