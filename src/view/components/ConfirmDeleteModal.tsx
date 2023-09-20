import { TrashIcon } from "@radix-ui/react-icons";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose(): void;
  title: string;
  description?: string;
  onConfirm(): void;
  isLoadingConfirm?: boolean;
}

export function ConfirmDeleteModal({
  open,
  onClose,
  title,
  description,
  onConfirm,
  isLoadingConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex justify-center items-center ">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="w-[180px] font-bold text-gray-800 tracking-[-0.5px]">
          {title}
        </p>
        <p className="tracking-[-0.5px] text-gray-800">{description}</p>
      </div>
      <div className="mt-10 space-y-4">
        <Button
          variant="danger"
          className="w-full"
          isLoading={isLoadingConfirm}
          onClick={onConfirm}
        >
          Sim, desejo excluir
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          disabled={isLoadingConfirm}
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
