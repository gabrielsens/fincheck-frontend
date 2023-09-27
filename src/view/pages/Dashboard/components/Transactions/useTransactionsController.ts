import { useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransaction";
import { TransactionFilters } from "../../../../../app/service/transactionsService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null)

  const {
    transactions,
    isFetching,
    isInitialLoading,
  } = useTransactions(filters);

  function handleApplyFilters({
    bankAcountId,
    year
  }: { bankAcountId?: string, year: number}) {
    handleChangeFilters('bankAccountId')(bankAcountId);
    handleChangeFilters('year')(year);
    handleCloseFiltersModal();
  }

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(
    filter: TFilter
  ) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters(prevState => ({
        ...prevState,
        [filter]: value
      }))
    }
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditTransactionModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditModalOpen(true);
  }

  function handleCloseEditTransactionModal() {
    setTransactionBeingEdited(null);
    setIsEditModalOpen(false);
  }

  return {
    areValuesVisible,
    transactions,
    isInitialLoading: isInitialLoading,
    isLoading: isFetching,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal
  }
}
