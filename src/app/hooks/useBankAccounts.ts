import { useQuery } from "@tanstack/react-query";
import { bankAccountService } from "../service/bankAccountService";

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['bank-account', 'all'],
    queryFn: bankAccountService.getAll,
    staleTime: Infinity
  });
  return {
    accounts: data ?? [],
    isFetching
  }
}
