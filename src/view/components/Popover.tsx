import * as RdxPopover from '@radix-ui/react-popover';
import { PropsWithChildren } from 'react';
import { cn } from '../../app/utils/cn';


function PopoverRoot({ children }: PropsWithChildren) {
  return (
    <RdxPopover.Root>
      {children}
    </RdxPopover.Root>
  )
}

interface PopoverTriggerProps {
  asChild?: boolean
}

function PopoverTrigger({ children, asChild }: PropsWithChildren<PopoverTriggerProps>) {
  return (
    <RdxPopover.Trigger asChild={asChild}>
      {children}
    </RdxPopover.Trigger>
  )
}

interface PopoverContentProps {
  className?: string
}

function PopoverContent({ children, className }: PropsWithChildren<PopoverContentProps>) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          'rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[60] p-4',
          'data-[side=top]:animate-slideDownAndFade ',
          'data-[side=right]:animate-slideLeftAndFade',
          'data-[side=bottom]:animate-slideUpAndFade',
          'data-[side=left]:animate-slideRightAndFade',
          className
        )}>
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  )
}


export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
}
