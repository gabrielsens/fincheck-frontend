import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

import { useDashboard } from "../../components/DashboardContext/useDashboard"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/service/bankAccountService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdit } = useDashboard();

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

  const { isLoading, mutateAsync } = useMutation(bankAccountService.create)

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const initialBalanceNumber = currencyStringToNumber(data.initialBalance);

      await mutateAsync({
        ...data,
        initialBalance: initialBalanceNumber
      });

      toast.success('Conta editada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bank-account', 'all'] })
      reset();
      closeEditAccountModal();
    } catch {
      toast.error('Ocorreu um erro ao editar a conta!');
    }
  });


  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    accountBeingEdit
  }
}
