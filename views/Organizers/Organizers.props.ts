import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IOrganizerType } from "@/types/organizer.type";

export interface OrganizersViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  organizerTypes: IOrganizerType[];
}
