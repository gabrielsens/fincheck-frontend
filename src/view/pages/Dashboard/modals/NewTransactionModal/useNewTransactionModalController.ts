import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard"
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/service/transactionsService";
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.string().nonempty('Informe o valor'),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe uma conta'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal
   } = useDashboard();

   const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { mutateAsync, isLoading } = useMutation(transactionsService.create);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { bankAccountId, categoryId, date, name, value } = data;

      await mutateAsync({
        bankAccountId,
        categoryId,
        date: date.toISOString(),
        name,
        value: currencyStringToNumber(value),
        type: newTransactionType!
      })

      toast.success(newTransactionType === 'EXPENSE'
        ? 'Despesa cadastrada com sucesso!'
        : 'Receita cadastrada com sucesso!');

      queryClient.invalidateQueries({ queryKey: ['transactions', 'all'] });
      queryClient.invalidateQueries({ queryKey: ["bank-account", "all"] });
      reset();
      closeNewTransactionModal();
    } catch {
      toast.error("Ocorreu um erro ao criar uma transação!");
    }
  })

  const categories = useMemo(() => (
    categoriesList.filter((category) => category.type === newTransactionType)
  ), [categoriesList, newTransactionType])

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModal,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading
  }
}
