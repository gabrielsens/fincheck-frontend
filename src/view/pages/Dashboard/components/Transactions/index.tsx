import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

import { MONTHS } from "../../../../../app/config/constants";

import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export default function Transactions() {
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <header className="">
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
              Transações
            </span>
            <ChevronDownIcon className="text-gray-900" />
          </button>
          <button>
            <FilterIcon />
          </button>
        </div>
        <div className="mt-6 relative">
          <Swiper
            centeredSlides
            slidesPerView={3}
          >
            <SliderNavigation />
            {MONTHS.map((month, index) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <SliderOption
                    index={index}
                    isActive={isActive}
                    month={month}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>
      <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
        <div className="rounded-2xl p-4 bg-white flex justify-between items-center gap-4">
          <div className="flex flex-1 items-center gap-3">
            <CategoryIcon type="expense" />
            <div>
              <strong className="font-bold tracking-[-0.5px] block">
                Almoço
              </strong>
              <span className="text-sm text-gray-600">
                04/06/2023
              </span>
            </div>
          </div>
          <span className="text-red-800 tracking-[-0.5px]">
            - {formatCurrency(1232.23)}
          </span>
        </div>
        <div className="rounded-2xl p-4 bg-white flex justify-between items-center gap-4">
          <div className="flex flex-1 items-center gap-3">
            <CategoryIcon type="income" />
            <div>
              <strong className="font-bold tracking-[-0.5px] block">
                Almoço
              </strong>
              <span className="text-sm text-gray-600">
                04/06/2023
              </span>
            </div>
          </div>
          <span className="text-red-800 tracking-[-0.5px]">
            + {formatCurrency(1232.23)}
          </span>
        </div>
      </div>
    </div>
  );
}
