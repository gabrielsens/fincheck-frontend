import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading
  } = useNewAccountModalController();
  return (
    <Modal
      title="Editar conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo inicial
          </span>
          <div className="flex items-center ">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />
          <Controller
            control={control}
            name="type"
            defaultValue="INVESTMENT"
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Tipo"
                value={value}
                onChange={onChange}
                options={[
                  {
                    value: "INVESTMENT",
                    label: "Investimentos",
                  },
                  {
                    value: "CHECKING",
                    label: "Conta Corrente",
                  },
                  {
                    value: "CASH",
                    label: "Dinheiro Físico",
                  },
                ]}
                error={errors.type?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />


        </div>
        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
