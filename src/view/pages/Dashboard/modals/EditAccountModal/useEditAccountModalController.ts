import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService } from "../../../../../app/service/bankAccountService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdit } =
    useDashboard();

  const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdit?.color,
      name: accountBeingEdit?.name,
      type: accountBeingEdit?.type,
      initialBalance: accountBeingEdit?.initialBalance.toString(),
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountService.update
  );
  const {
    isLoading: isLoadingDeleteAccount,
    mutateAsync: deleteAccount
  } = useMutation(bankAccountService.remove);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const initialBalanceNumber = currencyStringToNumber(data.initialBalance);

      await updateAccount({
        ...data,
        initialBalance: initialBalanceNumber,
        id: accountBeingEdit!.id,
      });

      toast.success("Conta editada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["bank-account", "all"] });
      reset();
      closeEditAccountModal();
    } catch {
      toast.error("Ocorreu um erro ao editar a conta!");
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {

      await deleteAccount(accountBeingEdit!.id);

      toast.success("Conta removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["bank-account", "all"] });
      reset();
      closeEditAccountModal();
      handleCloseDeleteModal();
    } catch {
      toast.error("Ocorreu um erro ao remover a conta!");
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    accountBeingEdit,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDeleteAccount
  };
}
