import "swiper/css";

import { Logo } from "../../components/Logo";
import Accounts from "./components/Accounts";
import { UserMenu } from "../../components/UserMenu";
import Transactions from "./components/Transactions";
import { DashboardProvider } from "./components/DashboardContext";

export function Dashboard() {

  return (
    <DashboardProvider>
      <div className="w-full h-full p-4 md:p-8 md:pt-6 flex flex-col gap-4">
        <header className="h-12 flex items-center justify-between">
          <Logo className="h-6 text-teal-900" />
          <UserMenu />
        </header>
        <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
          <div className="w-full md:w-1/2">
            <Accounts />
          </div>
          <div className="w-full md:w-1/2">
            <Transactions />
          </div>
        </main>
      </div>
    </DashboardProvider>
  )
}
