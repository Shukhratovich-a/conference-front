import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IAccommodation } from "@/types/accommodation.type";

export interface AccommodationViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  accommodation: IAccommodation;
}
