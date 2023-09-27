import { useQuery } from "@tanstack/react-query"
import { transactionsService } from "../service/transactionsService"
import { TransactionFilters } from "../service/transactionsService/getAll"

export function useTransactions(filters: TransactionFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions', 'all', filters.month, filters.year, filters.bankAccountId, filters.type],
    queryFn: () => transactionsService.getAll(filters),
  })

  return {
    transactions: data ?? [],
    isFetching,
    isInitialLoading,
    refetch
  }
}
