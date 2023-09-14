import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';
import { cn } from '../../app/utils/cn';

interface InputCurrencyProps {
  error?: string
  value?: string
  onChange?(value: string): void
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator=''
        decimalSeparator=','
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          error && 'text-red-900'
          )}
          value={value?.toString()}
          onChange={(e) => onChange?.(e.target.value)}
      />
        {error && (
          <div className="flex items-center mt-2 gap-2 text-red-900 ">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
    </div>
  )
}
