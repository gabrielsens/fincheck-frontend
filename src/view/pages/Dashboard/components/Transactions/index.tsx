import { Swiper, SwiperSlide } from "swiper/react";

import { FilterIcon } from "../../../../components/icons/FilterIcon";

import { MONTHS } from "../../../../../app/config/constants";

import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "../../../../../assets/empty-state.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";

export default function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="h-10 w-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
          />

          <header className="">
            <div className="flex justify-between items-center">
              <TransactionTypeDropdown />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>
            <div className="mt-6 relative">
              <Swiper centeredSlides slidesPerView={3}>
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={index}>
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

            {isLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner className="h-10 w-10" />
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="flex flex-col items-center h-full justify-center">
                <img src={emptyStateImage} alt="Empty state" />
                <p className="text-gray-700">
                  Não econtramos nenhuma transação
                </p>
              </div>
            )}

            {(hasTransactions && !isLoading) && (
              <>
                <div className="rounded-2xl p-4 bg-white flex justify-between items-center gap-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="expense" />
                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-red-800 tracking-[-0.5px]",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
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
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-green-800 tracking-[-0.5px]",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    + {formatCurrency(1232.23)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
