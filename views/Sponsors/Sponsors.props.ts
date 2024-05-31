import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ISponsor } from "@/types/sponsor.type";

export interface SponsorsViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  sponsors: ISponsor[];
}
