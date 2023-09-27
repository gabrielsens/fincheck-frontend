import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/service/transactionsService";
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { Transaction } from '../../../../../app/entities/Transaction';

const schema = z.object({
  value: z.union([
    z.string().nonempty('Informe o valor'),
    z.number()
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe uma conta'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
   const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      date: transaction ? new Date(transaction.date) : undefined,
      name: transaction?.name,
      value: transaction?.value
    }
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { mutateAsync, isLoading } = useMutation(transactionsService.update);

  const {
    isLoading: isLoadingDeleteTransaction,
    mutateAsync: deleteAccount
  } = useMutation(transactionsService.remove);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { bankAccountId, categoryId, date, name, value } = data;

      await mutateAsync({
        id: transaction!.id,
        bankAccountId,
        categoryId,
        date: date.toISOString(),
        name,
        value: currencyStringToNumber(value),
        type: transaction!.type
      })

      toast.success(transaction!.type === 'EXPENSE'
        ? 'Despesa atualizada com sucesso!'
        : 'Receita atualizada com sucesso!');

      queryClient.invalidateQueries({ queryKey: ['transactions', 'all'] });
      queryClient.invalidateQueries({ queryKey: ["bank-account", "all"] });
      onClose();
    } catch {
      toast.error("Ocorreu um erro ao editar uma transação!");
    }
  })

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    try {

      await deleteAccount(transaction!.id);

      toast.success("Transação removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ['transactions', 'all'] });
      queryClient.invalidateQueries({ queryKey: ["bank-account", "all"] });
      handleCloseDeleteModal();
      onClose();
    } catch {
      toast.error("Ocorreu um erro ao remover a transação!");
    }
  }

  const categories = useMemo(() => (
    categoriesList.filter((category) => category.type === transaction?.type)
  ), [categoriesList, transaction])

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isLoadingDeleteTransaction
  }
}
