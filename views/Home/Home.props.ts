import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IHomepage } from "@/types/homepage.type";
import { ISection } from "@/types/section.type";

export interface HomeViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  homepage: IHomepage;
  sections?: ISection[];
}
