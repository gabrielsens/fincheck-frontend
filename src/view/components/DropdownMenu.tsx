import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { PropsWithChildren } from 'react';
import { cn } from '../../app/utils/cn';

function DropdownMenuRoot({ children }: PropsWithChildren) {
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  )
}

function DropdownMenuTrigger({ children }: PropsWithChildren) {
  return (
    <RdxDropdownMenu.Trigger className='outline-none'>
      {children}
    </RdxDropdownMenu.Trigger>
  )
}

interface DropdownMenuContentProps {
  className?: string
}

function DropdownMenuContent({ children, className }: PropsWithChildren<DropdownMenuContentProps>) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          'p-2 rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade',
          className
        )}>
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  )
}

interface DropdownMenuItemProps {
  className?: string
  onSelect?: ((event: Event) => void) | undefined
}

function DropdownMenuItem({ children, className, onSelect }: PropsWithChildren<DropdownMenuItemProps>) {
  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'min-h-[48px] outline-none flex items-center p-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer',
        className
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  )
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem
}
