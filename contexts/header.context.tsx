import React from "react";

import { IHeader } from "@/types/header.type";

export interface IHeaderContext {
  header: IHeader;
}

export const HeaderContext = React.createContext<IHeaderContext>({ header: { mainText: "", logo: "" } });

export const HeaderContextProvider = ({ header, children }: React.PropsWithChildren<IHeaderContext>): JSX.Element => {
  return <HeaderContext.Provider value={{ header }}>{children}</HeaderContext.Provider>;
};
