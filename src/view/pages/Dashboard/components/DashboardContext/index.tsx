import { PropsWithChildren, createContext, useCallback, useState } from "react";

interface DashboardContextValue {
  areValuesVisible: boolean
  toggleValuesVisibility: () => void
}

export const DashboardContext = createContext({} as DashboardContextValue);
DashboardContext.displayName = "DashboardContext";

export function DashboardProvider({ children }: PropsWithChildren) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, [])

  const values = {
    areValuesVisible,
    toggleValuesVisibility
  }

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  )
}
