import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickeInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Transaction } from "../../../../../app/entities/Transaction";
import { TrashIcon } from "@radix-ui/react-icons";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";

interface EditTransactionModalProps {
  open: boolean
  onClose(): void
  transaction: Transaction | null
}

export function EditTransactionModal({
  open,
  onClose,
  transaction
}: EditTransactionModalProps) {
  const {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    isLoadingDeleteTransaction
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) return (
    <ConfirmDeleteModal
      open
      title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}?`}
      onConfirm={handleDeleteTransaction}
      onClose={handleCloseDeleteModal}
      isLoadingConfirm={isLoadingDeleteTransaction}
    />
  )

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
      rightAction={(
        <button type="button" onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 w-6 h-6"/>
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>
          <div className="flex items-center ">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Categoria"
                value={value}
                onChange={onChange}
                error={errors.categoryId?.message}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickeInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
