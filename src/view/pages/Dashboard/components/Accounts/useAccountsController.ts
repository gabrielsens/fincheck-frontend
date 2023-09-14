import { useMemo, useState } from "react"
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/service/bankAccountService";

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    openNewAccountModal,
    toggleValuesVisibility,
  } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { data, isFetching } = useQuery({
    queryKey: ['bank-account', 'all'],
    queryFn: bankAccountService.getAll
  });

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((prev, curr) => prev + curr.currencyBalance, 0)
  }, [data]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    openNewAccountModal,
    currentBalance,
  }
}
