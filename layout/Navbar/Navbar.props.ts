import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface NavbarProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {}
