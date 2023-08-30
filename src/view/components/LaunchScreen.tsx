import { Transition } from "@headlessui/react";
import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

interface LaunchScreenProps {
  isLoading: boolean
}

export function LaunchScreen({ isLoading}: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-teal-900 fixed w-full h-full top-0 left-0 grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Logo className="h-10 text-white animate-bounce" />
          <Spinner />
        </div>
      </div>
    </Transition>
  )
}
