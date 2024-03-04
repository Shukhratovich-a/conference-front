import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface LoginViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {}
