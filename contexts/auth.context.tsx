import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { IUser } from "@/types/user.type";

import { logout } from "@/helpers/auth.helper";

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  logout?: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({ user: null, token: null });

export const AuthContextProvider = ({ user, token, children }: React.PropsWithChildren<IAuthContext>): JSX.Element => {
  const { pathname, replace } = useRouter();

  const [userState, setUserState] = React.useState<IUser | null>(user);
  const [tokenState, setTokenState] = React.useState<string | null>(token);

  useEffect(() => {
    if (!user || !token) {
      logout();
    }
  }, [user, token]);

  const handleLogout = () => {
    setTokenState(null);
    setUserState(null);

    if (pathname.startsWith("/profile")) replace("/auth/login");
    logout();
  };

  return (
    <AuthContext.Provider value={{ token: tokenState, user: userState, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
