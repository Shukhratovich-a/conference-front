import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface HomeViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {}
