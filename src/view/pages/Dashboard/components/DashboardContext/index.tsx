import { PropsWithChildren, createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean
  isNewAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  toggleValuesVisibility: () => void
  openNewAccountModal: () => void
  closeNewAccountModal: () => void
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void
  closeNewTransactionModal: () => void
}

export const DashboardContext = createContext({} as DashboardContextValue);
DashboardContext.displayName = "DashboardContext";

export function DashboardProvider({ children }: PropsWithChildren) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(true);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  const values = {
    areValuesVisible,
    isNewAccountModalOpen,
    isNewTransactionModalOpen,
    newTransactionType,
    toggleValuesVisibility,
    openNewAccountModal,
    closeNewAccountModal,
    openNewTransactionModal,
    closeNewTransactionModal
  }

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  )
}
