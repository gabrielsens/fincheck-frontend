import { useContext } from "react"
import { DashboardContext } from "."

export function useDashboard() {
  const context = useContext(DashboardContext);

  return context;
}
