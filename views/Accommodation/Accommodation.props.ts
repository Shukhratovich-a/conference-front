import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface AccommodationViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {}
