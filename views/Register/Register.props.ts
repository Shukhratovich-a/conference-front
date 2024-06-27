import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ISection } from "@/types/section.type";

export interface RegisterViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  sections: ISection[];
}
