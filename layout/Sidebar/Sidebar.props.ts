import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SidebarProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {}
