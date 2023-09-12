import * as RdxDialog from "@radix-ui/react-dialog";

import { cn } from "../../../app/utils/cn";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ModalProps {
  open: boolean
  title: string
  rightAction?: React.ReactNode
  children: React.ReactNode
  onClose?(): void
}

export function Modal({ open, title, rightAction, children, onClose }: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Trigger />
      <RdxDialog.Portal>
        <RdxDialog.Overlay className={
          cn(
            'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
            'data-[state=open]:animate-overlayShow'
          )
        } />
        <RdxDialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] w-full max-w-[400px] outline-none',
            'shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
            'data-[state=open]:animate-contentShow',
          )}
        >
          <header className="flex justify-between items-center text-gray-800">
            <button className="w-12 h-12 flex items-center justify-center outline-none" onClick={onClose}>
              <Cross2Icon className="w-6 h-6" />
            </button>
            <span className="text-lg tracking-[-1px] font-bold">
              {title}
            </span>
            <div className="w-12 h-12 flex items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>
            {children}
          </div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
