import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  value?: Date
  onChange?(date: Date): void
  error?: string;
  className?: string;
}

export function DatePickeInput({ value, onChange, error, className }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 transition-all duration-75 focus:border-gray-700 outline-none text-left relative pt-4",
              error && "!border-red-900 border-2",
              className
            )}
          >
            <span className="text-gray-700 text-xs left-[13px] top-2 pointer-events-none absolute">
              Data
            </span>
            <span>
              {formatDate(selectedDate)}
            </span>
          </button>

        </Popover.Trigger>
        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>
      {error && (
        <div className="flex items-center mt-2 gap-2 text-red-900 ">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
