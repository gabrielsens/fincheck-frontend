import { PropsWithChildren, createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/BankAccount";

interface DashboardContextValue {
  areValuesVisible: boolean
  isNewAccountModalOpen: boolean
  isEditAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  accountBeingEdit: BankAccount | null
  toggleValuesVisibility: () => void
  openNewAccountModal: () => void
  closeNewAccountModal: () => void
  openEditAccountModal: (bankAccount: BankAccount) => void
  closeEditAccountModal: () => void
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void
  closeNewTransactionModal: () => void
}

export const DashboardContext = createContext({} as DashboardContextValue);
DashboardContext.displayName = "DashboardContext";

export function DashboardProvider({ children }: PropsWithChildren) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdit, setAccountBeingEdit] = useState<BankAccount | null>(null);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
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

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdit(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false);
    setAccountBeingEdit(null);
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
    isEditAccountModalOpen,
    accountBeingEdit,
    newTransactionType,
    toggleValuesVisibility,
    openNewAccountModal,
    closeNewAccountModal,
    openEditAccountModal,
    closeEditAccountModal,
    openNewTransactionModal,
    closeNewTransactionModal
  }

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  )
}
