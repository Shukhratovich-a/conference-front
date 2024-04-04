import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ISection } from "@/types/section.type";

export interface MainTextProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  mainText: string;
  sections?: ISection[];
}
