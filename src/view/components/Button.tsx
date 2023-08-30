import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  disabled?: boolean
}

export function Button({ isLoading, disabled, className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl text-white font-medium transition-all flex items-center justify-center',
        className
      )}
    >
      {isLoading && <Spinner className="w-6 h-6" />}
      {children}
    </button>
  )
}
