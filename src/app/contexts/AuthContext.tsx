import { PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../service/userServices";
import { toast } from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";

interface AuthContextValue {
  signedIn: boolean
  signin: (acessToken: string) => void
  signout: () => void
}

export const AuthContext = createContext({} as AuthContextValue);
AuthContext.displayName = "AuthContext";


export function AuthContextProvider({ children }: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!accessToken;
  });

  const { isError, isFetching, isSuccess, remove } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: userService.me,
    enabled: signedIn,
    staleTime: Infinity
  })

  const signin = useCallback((acessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, acessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    remove();

    setSignedIn(false);
  }, [remove])

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');

      signout();
    }
  }, [isError, signout]);

    const value = {
      signedIn: isSuccess && signedIn,
      signin,
      signout
    }


  return (
    <AuthContext.Provider value={value}>
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  )
}
