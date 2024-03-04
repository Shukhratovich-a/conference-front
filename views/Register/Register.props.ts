import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface RegisterViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {}
